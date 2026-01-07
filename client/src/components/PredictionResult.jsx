export default function PredictionResult({ result }) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <p>
        <strong>Smoke Probability:</strong> {result.smoke_probability}
      </p>
      <p>
        <strong>Alert:</strong> {result.alert ? "🚨 YES" : "✅ NO"}
      </p>
    </div>
  );
}
