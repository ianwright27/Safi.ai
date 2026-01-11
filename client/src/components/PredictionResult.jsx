
function getRiskLevel(probability) {
  if (probability < 0.25) {
    return { label: "Low", className: "low", color: "green", message: "Low smoke risk today" };
  }
  if (probability < 0.6) {
    return { label: "Moderate", className: "moderate", color: "orange", message: "Moderate smoke risk today" };
  }
  return { label: "High", className: "high", color: "red", message: "High smoke risk — consider closing windows" };
}


export default function PredictionResult({ result, onTryAgain }){
  let originalProbabilityPercent = Math.round(result.smoke_probability * 100);
  let probabilityPercent = Math.min(Math.max(originalProbabilityPercent, 5), 100); // Clamp between 2 and 100
  const risk = getRiskLevel(result.smoke_probability);

  return (
 
    <div className="result">
      <div className="risk-bar">
        <div className={`risk-fill ${risk.className}`} style={{ width: `${probabilityPercent}%` }} /></div>
        <span className="risk-label">{risk.label} Risk</span>
        <p className="risk-text">{risk.message}, <span className="probability-label">{originalProbabilityPercent}% chance</span> <span className="try-again" 
          onClick={onTryAgain}>Try again</span> </p>
    </div>
  );
}
