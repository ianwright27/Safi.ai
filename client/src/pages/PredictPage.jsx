import { useState } from "react";
import { predictSmoke } from "../api/predict";
import PredictionResult from "../components/PredictionResult";

export default function PredictPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);

    const input = {
      window_start_min: 1020,
      window_end_min: 1200,
      window_length_min: 180,
      day: "friday",
      weather: "windy",
      occassion: "holiday",
    };

    try {
      const res = await predictSmoke(input);
      setResult(res);
    } catch (err) {
      alert("Prediction error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Safi AI – Smoke Risk</h1>

      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Run Prediction"}
      </button>

      {result && <PredictionResult result={result} />}
    </div>
  );
}
