import { useState, useEffect } from "react";
import { predictSmoke } from "../api/predict";
import PredictionResult from "../components/PredictionResult";
import InputField from "../components/InputField";
import TimeField from "../components/TimeField";
import { timeToMinutes } from "../utils/time";
import { getCurrentDay } from "../utils/day";
import { fetchWeather } from "../api/weather";
import { weatherCodeToModel } from "../utils/weatherCodeMapper";
import { getUserLocation } from "../utils/location";
import { formatWeatherDisplay } from "../utils/weatherDisplay";




export default function PredictPage() {
  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    is_special: "no",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [day, setDay] = useState("");
  const [weatherDisplay, setWeatherDisplay] = useState("");

  const [weatherToken, setWeatherToken] = useState("");
  const [locationReady, setLocationReady] = useState(false);

  useEffect(() => {
    async function initContext() {
      try {
        const today = getCurrentDay();
        setDay(today);

        const { lat, lon } = await getUserLocation();
        const weatherRaw = await fetchWeather(lat, lon);

        setWeatherDisplay(formatWeatherDisplay(weatherRaw));

        const modelWeather = weatherCodeToModel(
          weatherRaw.weathercode,
          weatherRaw.windspeed
        );

        console.log({
          lat,
          lon,
          temperature: weatherRaw.temperature,
          time: weatherRaw.time
        });

        setWeatherToken(modelWeather);
        setLocationReady(true);
      } catch (err) {
        console.error("Context init failed:", err);
      }
    }

    initContext();
  }, []);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    
  const handlePredict = async () => {
    if (!locationReady) {
      alert("Still fetching location and weather...");
      return;
    }

    setLoading(true);

    try {
      const startMin = timeToMinutes(form.start_time);
      const endMin = timeToMinutes(form.end_time);

      const payload = {
        window_start_min: startMin,
        window_end_min: endMin,
        window_length_min: endMin - startMin,
        day,
        weather: weatherToken,
        occassion:
          form.is_special === "yes" ? "holiday" : "nothing",
      };

      const res = await predictSmoke(payload);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: "1rem" }}>
      <h1 className="logo">Safi.ai</h1>

      <p>→ <strong>When your windows are...</strong></p>
      <div className="time-fields">
        <div className="time-field">
          <TimeField
            label="opened at"
            name="start_time"
            value={form.start_time || "00:00"}
            onChange={handleChange}
          />
        </div>
        <p>and</p>
        <div className="time-field">
          <TimeField
            label="closed at"
            name="end_time"
            value={form.end_time || "00:00"}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="day-weather-display" style={{ margin: "1.5rem 0" }}>
        {day && (
          <p>
            <strong>Today:</strong> {day}
          </p>
        )}

        {weatherDisplay && (
          <p>
            <strong>Weather:</strong> {weatherDisplay}
          </p>
        )}
      </div>


      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          <strong>→ Is today a special occasion?</strong>
        </label>

        <select
          name="is_special"
          value={form.is_special}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.6rem" }}
        >
          <option value="no">No, it's a normal day</option>
          <option value="yes">Yes, it's a special occasion</option>
        </select>
      </div>


      <button className="predict-btn" onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && <PredictionResult result={result} />}
    </div>
  );
}
