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

export default function SmokeRiskModal({ open, onClose }) {
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
    if (!open) return; // Only init when modal opens

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
  }, [open]);

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
        occassion: form.is_special === "yes" ? "holiday" : "nothing",
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

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Smoke Risk Prediction</h3>
        <p className="modal-sub">Version 1 — neighborhood-level early warning</p>

        <div className="input-group">
          <label>When are your windows open?</label>
          <div className="time-row">
            <TimeField
              label="Start"
              name="start_time"
              value={form.start_time || "00:00"}
              onChange={handleChange}
            />
            <span>to</span>
            <TimeField
              label="End"
              name="end_time"
              value={form.end_time || "00:00"}
              onChange={handleChange}
            />
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
          // <PredictionResult result={result} />
          <PredictionResult
            result={result}
            onTryAgain={() => {
              setResult(null);
              setForm({ start_time: "", end_time: "", is_special: "no" });
            }}
          />
        )}
      </div>
    </div>
  );
}
