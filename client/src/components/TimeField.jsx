export default function TimeField({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.25rem" }}>
        {label}
      </label>
      <input
        type="time"
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "0.3rem",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}
