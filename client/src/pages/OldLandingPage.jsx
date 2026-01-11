import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx"; 

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [predicted, setPredicted] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setPredicted(false);
  };

  return (
    <div className="page">
      <Navbar onTry={openModal} />

      {/* HERO */}
      <main>
        <section className="hero">
          <h1>Safi AI</h1>
          <p className="tagline">Predicting smoke pollution before it reaches your home.</p>
          <p className="subtitle">
            An early-warning system that helps neighborhoods reduce exposure to harmful smoke by forecasting risk using environmental patterns.
          </p>
          <button className="primary" onClick={openModal}>Check Smoke Risk</button>
        </section>

        {/* PROBLEM */}
        <section className="section">
          <h2>Smoke pollution doesn’t announce itself.</h2>
          <p>
            In many neighborhoods, smoke from burning waste and other activities appears in patterns — often at specific times, days, or weather conditions.
            By the time it’s visible or smells strong, exposure has already begun.
          </p>
        </section>

        {/* SOLUTION */}
        <section className="section card">
          <h2>Safi AI predicts risk before exposure.</h2>
          <ul>
            <li>Learns patterns from time, day, and weather</li>
            <li>Estimates probability of smoke events</li>
            <li>Helps people make safer daily decisions</li>
            <li>Designed for real neighborhoods, not labs</li>
          </ul>
        </section>
      </main>

      <Footer />

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Smoke Risk Prediction</h3>
            <p className="modal-sub">Version 1 — neighborhood-level early warning</p>

            <div className="input-group">
              <label>When are your windows open?</label>
              <div className="time-row">
                <input type="time" />
                <span>to</span>
                <input type="time" />
              </div>
            </div>

            <div className="info">
              <div><strong>Today:</strong> Tuesday</div>
              <div><strong>Weather:</strong> 25°C · Windy</div>
            </div>

            <div className="input-group">
              <label>Is today a special occasion?</label>
              <select>
                <option>No, it’s a normal day</option>
                <option>Yes, it’s a special occasion</option>
              </select>
            </div>

            {!predicted ? (
              <button className="primary full" onClick={() => setPredicted(true)}>
                Predict Smoke Risk
              </button>
            ) : (
              <div className="result">
                <div className="risk-bar"><div className="risk-fill moderate" /></div>
                <span className="risk-label">Moderate Risk</span>
                <p className="risk-text">Moderate smoke risk this evening.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
       
      `}</style>
    </div>
  );
}
