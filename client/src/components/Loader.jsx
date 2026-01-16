import "../styles/loader.css";

export default function Loader({ progress = 0, message }) {
  return (
    <div className="loader-overlay">
      <div className="loader-card">
        {/* Replace with GIF / Lottie / SVG */}
        <img
          src="/loader.gif"
          alt="Loading"
          className="loader-gif"
        />

        <div className="loader-progress">
          {progress}%
        </div>

        <p className="loader-text">
          {message || "Initializing Safi AI…"}
        </p>
      </div>
    </div>
  );
}
