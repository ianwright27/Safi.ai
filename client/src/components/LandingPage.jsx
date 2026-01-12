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
    </div>
  );
}
