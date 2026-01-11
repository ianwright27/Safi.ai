import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection.jsx";
import OurProcess from "./OurProcess.jsx";
import CaseStudies from "./CaseStudies.jsx";
import SmokeRiskModal from "./SmokeRiskModal.jsx";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [predicted, setPredicted] = useState(false);
  const [activePage, setActivePage] = useState("home"); // 'home', 'process', 'caseStudies'

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setPredicted(false);
  };

  // Handle navbar navigation
  const handleNavClick = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine main content
  let mainContent;
  if (activePage === "home") {
    mainContent = <HeroSection openModal={openModal} />;
  } else if (activePage === "process") {
    mainContent = <OurProcess />;
  } else if (activePage === "caseStudies") {
    mainContent = <CaseStudies />;
  }

  return (
    <div className="page" style={{ backgroundColor: "#f6f7f5", color: "#2f4f44", fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar
        onTry={openModal}
        onNavClick={handleNavClick}
        activePage={activePage}
      />

      {/* Main Content */}
      <main>
        {mainContent}
      </main>

      {/* Footer */}
      <Footer />



    {/* MODAL */}
    <SmokeRiskModal open={modalOpen} onClose={closeModal} />

    {/* MODAL
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
      )} */}

    </div>
  );
}
