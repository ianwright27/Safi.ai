import React from 'react';

export default function OurProcess() {
  return (
    <div className="our-process" id="process" style={{ padding: '3rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2f4f44' }}>What is Safi AI?</h1>
      <p style={{ fontSize: '1rem', color: '#1f2a26', lineHeight: 1.6 }}>
        <strong>Safi AI</strong> is a neighborhood-level predictive air-quality early warning system focused on <strong>smoke pollution events</strong>.
        The system predicts the <em>probability</em> of smoke occurrence <strong>before exposure happens</strong>, allowing residents to make safer decisions such as when to open or close windows.
        This project is intentionally built as a <strong>real-world system</strong>, not a laboratory demo.
      </p>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Core Problem Definition</h2>
        <p style={{ color: '#4b5f57', lineHeight: 1.6 }}>
          Smoke pollution in many neighborhoods does <strong>not occur randomly</strong>. It often follows patterns influenced by time, day, human activity, and weather. Residents currently lack <strong>localized, predictive insight</strong>.
        </p>
        <ul style={{ marginTop: '0.5rem', color: '#4b5f57' }}>
          <li>Time of day</li>
          <li>Day of the week</li>
          <li>Human activity (e.g. holidays)</li>
          <li>Weather conditions</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Safi AI Solution Overview</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Learning patterns from real neighborhood data</li>
          <li>Predicting <strong>probability</strong>, not just yes/no outcomes</li>
          <li>Surfacing risk in a human-understandable way</li>
          <li>Designed to evolve: <em>user-assisted prediction → autonomous sensing & deep learning</em></li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>System Lifecycle Overview</h2>
        <pre style={{ background: '#eef2f0', padding: '1rem', borderRadius: '12px', overflowX: 'auto', color: '#1f2a26' }}>
{`Real-World Observation
        ↓
Manual Data Collection
        ↓
Data Cleaning & Structuring
        ↓
Exploratory Analysis (Jupyter)
        ↓
Feature Engineering
        ↓
Model Training (v1)
        ↓
Probability-Based Prediction
        ↓
Backend API (FastAPI)
        ↓
Frontend Interface (React)
        ↓
User Decision Support`}
        </pre>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Data Collection</h2>
        <p style={{ color: '#4b5f57' }}>Manual observation over time, recording time windows, days, weather, and special occasions.</p>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Data Preprocessing</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Cleaning inconsistent labels</li>
          <li>Normalizing categorical values</li>
          <li>Converting time into <em>minutes since midnight</em></li>
          <li>Handling missing observations conservatively</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Imbalanced Data Challenge</h2>
        <p style={{ color: '#4b5f57' }}>
          Smoke events were rare, non-smoke events dominated. Naive classifiers would predict "no smoke" most of the time, appearing accurate but useless.
        </p>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Modeling Strategy (V1)</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Probabilistic prediction, outputs smoke probability</li>
          <li>Configurable thresholds for alerts</li>
          <li>Preserves uncertainty, supports product-side interpretation</li>
        </ul>
        <pre style={{ background: '#eef2f0', padding: '1rem', borderRadius: '12px', overflowX: 'auto', color: '#1f2a26' }}>
{`{
  "smoke_probability": 0.23,
  "alert": 0
}`}
        </pre>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Backend & Frontend</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Backend: FastAPI, /predict endpoint, validated input</li>
          <li>Frontend: React, collects user inputs, visualizes probability, contextual alerts</li>
        </ul>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#2f4f44' }}>Design Philosophy</h2>
        <p style={{ color: '#4b5f57' }}>
          Built with restraint, clarity, respect for uncertainty. Prioritizes trust, usefulness, and real-world constraints.
        </p>
      </section>
    </div>
  );
}
