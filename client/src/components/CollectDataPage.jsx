import React, { useState, useEffect } from "react";
import { timeToMinutes } from "../utils/time.js";
import { getUserLocation } from "../utils/location.js";
import { formatDate, getDayOfWeek } from "../utils/dateHelpers.js";
import { collectSmokeData } from "../api/collect.js";
import TimeField from "./TimeField.jsx"; // assuming you already have this component
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import toast, { Toaster } from "react-hot-toast";

export default function CollectSmokeDataPage() {
  
  const notify = (success, message) =>{
      if (success) {
        toast.success(message || 'Data submitted successfully! Thank you for your participation.');
      } else {
        toast.error(message || 'Data failed to submit', {
          duration: 2500,
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
      }
  }
  
  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    is_special: "no",
    smoke_detected: "no",
    smoke_detection_time: "",
    notes: "",
    weather: "",
    smoke_source: "",
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

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      date: new Date().toISOString().split("T")[0]
    }));
  }, []);


const handleSubmit = async () => {
  // Always set date to TODAY
  const today = new Date();
  const formattedDate = formatDate(today); // YYYY-MM-DD
  const dayOfWeek = getDayOfWeek(today);

  // Define required fields
  const baseRequiredFields = ["start_time", "end_time", "weather"];

  const conditionalRequiredFields =
    form.smoke_detected === "yes"
      ? ["smoke_detection_time", "smoke_source"]
      : [];

  const requiredFields = [
    ...baseRequiredFields,
    ...conditionalRequiredFields,
  ];

  // Check if form is empty (ignoring auto fields)
  const meaningfulFields = [
    "start_time",
    "end_time",
    "weather",
    "notes",
    "smoke_detection_time",
    "smoke_source",
  ];

  const isFormEmpty = meaningfulFields.every(
    (field) => !form[field] || form[field].trim() === ""
  );

  if (isFormEmpty) {
    toast.error("Please fill in the form before submitting");
    return;
  }

  // Check for missing required fields
  const missingFields = requiredFields.filter(
    (field) => !form[field] || form[field].trim() === ""
  );

  if (missingFields.length > 0) {
    toast.error("Please fill in all required fields (*)");
    return;
  }

    
  // 2. time consistency check
  const startMinutes = timeToMinutes(form.start_time);
  const endMinutes = timeToMinutes(form.end_time);

  if (startMinutes && endMinutes && endMinutes <= startMinutes) {
    toast.error("End time must be later than start time");
    return;
  }

  // Submit
  setLoading(true);
  setError("");

  try {
    const location = await getUserLocation();

    const payload = {
      time_opening_windows: timeToMinutes(form.start_time),
      time_closing_windows: timeToMinutes(form.end_time),
      duration:
        timeToMinutes(form.end_time) -
        timeToMinutes(form.start_time),

      smoke_detected: form.smoke_detected,
      time_sensing_smoke:
        form.smoke_detected === "yes"
          ? timeToMinutes(form.smoke_detection_time)
          : 0,

      type_of_smoke:
        form.smoke_detected === "yes"
          ? form.smoke_source
          : "",

      date: formattedDate,
      day: dayOfWeek,
      occassion: form.is_special,
      weather: form.weather,

      lat: location.lat,
      long: location.lon,

      notes: form.notes,
    };

    console.log("Submitting payload:", payload);

    await collectSmokeData(payload);

    toast.success("Thank you for contributing data to Safi AI 🌱", {
      duration: 4000, 
      style: { 
        color: '#1f2a26', 
        background: '#fff'
      },
    });
    setSubmitted(true);

    // Reset form (date excluded because it's auto)
    setForm({
      start_time: "",
      end_time: "",
      is_special: "no",
      smoke_detected: "no",
      smoke_detection_time: "",
      smoke_source: "",
      weather: "",
      notes: "",
    });
  } catch (err) {
    console.error(err);
    toast.error("Submission failed. Please try again.");
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div className="page" style={{ backgroundColor: "#f6f7f5", color: "#2f4f44", fontFamily: 'system-ui, sans-serif', minHeight: "100vh" }}>
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Collect Smoke Data</h2>
        <p className="modal-sub"><strong>Thank you for contributing to Safi AI’s research.</strong><br></br> By continuing, you consent to the collection of limited data to support environmental research and improve the accuracy of the Safi AI model. <br></br> This may include <strong>your approximate location</strong> and <strong>time of submission</strong> (you may be asked to grant location access).<br></br> Your data is used strictly for <strong>research purposes</strong>, and helps improve air-quality predictions across multiple regions, not just your own.<br></br>Thank you for playing a part in building a healthier environment and a better future.</p>

        <div className="input-group">
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>When were your windows open today? *</label>
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
          <label>Was smoke detected today in your surroundings? *</label>
          <select name="smoke_detected" value={form.smoke_detected} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

       { form.smoke_detected === "yes" && (
        <>
        <div className="input-group">
          <label>If smoke was detected, when? *</label>
          <div className="time-row">
            <TimeField
              label="Time of Detection *"
              name="smoke_detection_time"
              value={form.smoke_detection_time || "00:00"}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="input-group">
            <label>Source of smoke *</label>
            <select name="smoke_source" value={form.smoke_source} onChange={handleChange}>
                <option value="garbage">Garbage</option>
                <option value="stove">Stove</option>
                <option value="other">Other</option>
            </select>
        </div>
        </>
       )} 

        <div className="input-group">
          <label>Is today a special occasion (like a holiday)? *</label>
          <select name="is_special" value={form.is_special} onChange={handleChange}>
            <option value="no">No, it's a normal day</option>
            <option value="yes">Yes, it's a special occasion</option>
          </select>
        </div>

        <div className="input-group">
            <label>Weather *</label>
            <select name="weather" value={form.weather} onChange={handleChange}>
                <option value="">...</option>
                <option value="sunny">Sunny</option>
                <option value="rainy">Rainy</option>
                <option value="windy">Windy</option>
                <option value="cloudy">Cloudy</option>
                <option value="cloudywithoutwind">Cloudy without wind</option>
            </select>
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

        {/* {notify(false, error) && <p style={{ color: "red" }}>{error}</p>} */}
        {/* {submitted && <p style={{ color: "green" }}>Data submitted successfully!</p>} */}

        <button className="primary full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Smoke Data"}
        </button>
      </main>
      <Toaster />
    </div>
  );
}
