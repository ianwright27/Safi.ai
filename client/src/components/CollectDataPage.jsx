import React, { useState } from "react";
import { timeToMinutes } from "../utils/time.js";
import { getUserLocation } from "../utils/location.js";
import { formatDate, getDayOfWeek } from "../utils/dateHelpers.js";
import { collectSmokeData } from "../api/collect.js";
import TimeField from "./TimeField.jsx"; // assuming you already have this component
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function CollectSmokeDataPage() {
  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    is_special: "no",
    notes: "",
    weather: "",
    stove_used: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loadPayload, setLoadPayload] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // Format date and day
      const formattedDate = formatDate(form.date); // "YYYY-MM-DD"
      const dayOfWeek = getDayOfWeek(form.date); // "Friday", etc.

      // generate for me lat and long using geolocation api
      const location = await getUserLocation();

      const payload = {
        time_opening_windows: timeToMinutes(form.start_time) || "00:00",
        time_closing_windows: timeToMinutes(form.end_time) || "00:00",
        smoke_detected: false, // default false for data collection 
        time_sensing_smoke: "0000", // default "0000" for data collection 
        duration: timeToMinutes(form.end_time) - timeToMinutes(form.start_time), 
        date: formattedDate,
        day: dayOfWeek,
        occassion: form.is_special,
        weather: form.weather,
        type_of_smoke: form.stove_used, 
        lat: location.lat,
        lon: location.lon,
        // notes: form.notes,
      };
      setLoadPayload(JSON.stringify(payload));
      console.log("Submitting payload:");
      console.log(JSON.stringify(payload));

      await collectSmokeData(payload);
      setSubmitted(true);
      setForm({
        start_time: "",
        end_time: "",
        is_special: "no",
        notes: "",
        weather: "",
        stove_used: "",
        date: "",
      });
    } catch (err) {
        console.log(err);
      setError(err.message || "Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ backgroundColor: "#f6f7f5", color: "#2f4f44", fontFamily: 'system-ui, sans-serif', minHeight: "100vh" }}>
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Collect Smoke Data</h2>
        <p className="modal-sub">Version 1 — Neighborhood-level early warning</p>

        <div className="input-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

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

        <div className="input-group">
          <label>Is today a special occasion?</label>
          <select name="is_special" value={form.is_special} onChange={handleChange}>
            <option value="no">No, it's a normal day</option>
            <option value="yes">Yes, it's a special occasion</option>
          </select>
        </div>

        <div className="input-group">
          <label>Weather</label>
          <input
            type="text"
            name="weather"
            placeholder="e.g., cloudywithoutwind"
            value={form.weather}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Stove used?</label>
          <input
            type="text"
            name="stove_used"
            placeholder="e.g., stove"
            value={form.stove_used}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Notes</label>
          <textarea
            name="notes"
            placeholder="Anything else to note?"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {submitted && <p style={{ color: "green" }}>Data submitted successfully!</p>}

        <button className="primary full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Smoke Data"}
        </button>
      </main>
    </div>
  );
}
