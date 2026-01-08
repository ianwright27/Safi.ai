export default function InputField({ label, ...props }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.25rem" }}>
        {label}
      </label>
      <input
        {...props}
        style={{
        }}
      />
    </div>
  );
}
