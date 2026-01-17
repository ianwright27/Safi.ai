import React, { useState, useEffect } from "react";
import TimeField from "./TimeField.jsx";
import PredictionResult from "./PredictionResult.jsx";
import { predictSmoke } from "../api/predict.js";
import { timeToMinutes } from "../utils/time.js";
import { getCurrentDay } from "../utils/day.js";
import { fetchWeather } from "../api/weather.js";
import { weatherCodeToModel } from "../utils/weatherCodeMapper.js";
import { getUserLocation } from "../utils/location.js";
import { formatWeatherDisplay } from "../utils/weatherDisplay.js";
import toast, { Toaster } from "react-hot-toast";

export default function SmokeRisk({ onClose, embedded = false }) {
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
      // alert("Still fetching location and weather...");
      toast.loading('Still fetching location and weather...\nMake sure to switch on Location / GPS\nor grant permission for location access.', {
          duration: 4000,
          position: 'top-center',
          // icon: '⏳', 
          // Styling
          style: { 
            color: '#1f2a26', 
            background: '#fff'
          },
          removeDelay: 1000,
      })
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
        occassion: form.is_special === "yes" ? "holiday" : "nothing",
      };

      const res = await predictSmoke(payload);
      setResult(res);
    } catch (err) {
      // alert("Prediction failed");
      toast.error('Prediction failed. This may be due to inconsistencies in the data you have filled in. Please try again.', {
        duration: 4000,
        position: 'top-center',
        // icon: '👏',
        // Styling
        style: { 
          color: '#1f2a26', 
          background: '#fff'
        },
        // className: '',
        iconTheme: {
          primary: '#d35353ff',
          secondary: '#fff',
        },
      }); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`smoke-risk ${embedded ? "embedded" : ""}`}>
      <Toaster />
      {!embedded && onClose && (
        <button className="modal-close-btn" onClick={onClose}>✕</button>
      )}
    <br></br>
      <h3>Smoke Risk Prediction</h3>
      <p className="modal-sub">Version 1 — neighborhood-level early warning <br></br> Location: <a className="activeLocation" href="https://maps.app.goo.gl/udeBm7oZ2fmie8Fx5">South B, Nairobi, Kenya</a> </p>

      <div className="input-group">
        <label>When are your windows open?</label>
        <div className="time-row">
          <TimeField name="start_time" value={form.start_time || "00:00"} onChange={handleChange} />
          <span>to</span>
          <TimeField name="end_time" value={form.end_time || "00:00"} onChange={handleChange} />
        </div>
      </div>

      <div className="info">
        {day && <div><strong>Today:</strong> {day}</div>}
        {weatherDisplay && <div><strong>Weather:</strong> {weatherDisplay}</div>}
      </div>

      <div className="input-group">
        <label>Is today a special occasion?</label>
        <select name="is_special" value={form.is_special} onChange={handleChange}> 
            <option value="no">No, it's a normal day</option> 
            <option value="yes">Yes, it's a special occasion</option> 
        </select>
      </div>

      {!result ? (
        <button className="primary full" onClick={handlePredict} disabled={loading}>
          {loading ? "Predicting..." : "Predict Smoke Risk"}
        </button>
      ) : (
        <PredictionResult
          result={result}
          onTryAgain={() => {
            setResult(null);
            setForm({ start_time: "", end_time: "", is_special: "no" });
          }}
        />
      )}
    </div>
  );
}
