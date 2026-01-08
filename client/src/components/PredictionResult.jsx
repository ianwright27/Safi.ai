
function getRiskLevel(probability) {
  if (probability < 0.25) {
    return { label: "Low", color: "green", message: "Low smoke risk today" };
  }
  if (probability < 0.6) {
    return { label: "Moderate", color: "orange", message: "Moderate smoke risk today" };
  }
  return { label: "High", color: "red", message: "High smoke risk — consider closing windows" };
}


export default function PredictionResult({ result }) {
  const probabilityPercent = Math.round(result.smoke_probability * 100);
  const risk = getRiskLevel(result.smoke_probability);

  return (
    <div className="prediction-card">
      <h3>Prediction Result</h3>

      <p className={`risk-text ${risk.color}`}>
        {risk.label} Risk
      </p>

      <div className="probability-bar">
        <div
          className={`probability-fill ${risk.color}`}
          style={{ width: `${probabilityPercent}%` }}
        />
      </div>

      <p className="probability-label">
        {probabilityPercent}% chance of smoke
      </p>

      <p className="risk-message">
        {risk.message}
      </p>
    </div>
  );
}
