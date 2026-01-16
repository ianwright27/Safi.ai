import React from "react";

export default function HeroSection({ openSmokeRisk }) {
  return (
    <div className="hero-section" style={{ padding: "2rem 1rem", maxWidth: "100%", margin: "0 auto" }}>
      {/* HERO */}
      <section className="hero" style={{ textAlign: "left", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem", color: "#2f4f44" }}>Safi AI</h1>
        <p className="tagline" style={{ fontSize: "1.25rem", marginBottom: "0.75rem", color: "#3a4f48" }}>
          Predicting smoke pollution before it reaches your home.
        </p>
        <p className="subtitle" style={{ fontSize: "1rem", marginBottom: "1.5rem", lineHeight: 1.6, color: "#3a4f48" }}>
          An early-warning system that helps neighborhoods reduce exposure to harmful smoke by forecasting risk using environmental patterns.
        </p>
        <button
          className="primary"
          onClick={openSmokeRisk}
          style={{
            backgroundColor: "#2f4f44",
            color: "#fff",
            border: "none",
            borderRadius: "0.375rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#3a5a4f")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2f4f44")}
        >
          Check Smoke Risk
        </button>
      </section>

      {/* PROBLEM */}
      <section className="section" style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: "600", marginBottom: "1rem", color: "#2f4f44" }}>
          Smoke pollution doesn’t announce itself.
        </h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#3a4f48" }}>
          In many neighborhoods, smoke from burning waste and other activities appears in patterns — often at specific times, days, or weather conditions. By the time it’s visible or smells strong, exposure has already begun.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="section card" style={{ padding: "1.5rem", borderRadius: "0.5rem", backgroundColor: "#f0f2ef", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#2f4f44" }}>
          Safi AI predicts risk before exposure.
        </h2>
        <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "#3a4f48", lineHeight: 1.6 }}>
          <li>Learns patterns from time, day, and weather</li>
          <li>Estimates probability of smoke events</li>
          <li>Helps people make safer daily decisions</li>
          <li>Designed for real neighborhoods, not labs</li>
        </ul>
      </section>
    </div>
  );
}
