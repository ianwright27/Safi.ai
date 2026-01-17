import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import NewNavbar from "./NewNavbar.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection.jsx";
import OurProcess from "./OurProcess.jsx";
import CaseStudies from "./CaseStudies.jsx";
import SmokeRiskModal from "./SmokeRiskModal.jsx";
import SmokeRisk from "./SmokeRisk.jsx";
import CollectDataPage from "./CollectDataPage.jsx";

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = window.innerWidth <= 768;

  const [modalOpen, setModalOpen] = useState(false);

  /* -----------------------------
     Smoke Risk entry point
  ------------------------------*/
  const openSmokeRisk = () => {
    if (isMobile) {
      navigate("/smoke-risk");
      window.scrollTo({ top: 0 });
    } else {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  /* -----------------------------
     Navbar navigation
  ------------------------------*/
  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="page"
      style={{
        backgroundColor: "#f6f7f5",
        color: "#2f4f44",
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* NAVBAR */}
      <NewNavbar
        onTry={openSmokeRisk}
        onNavClick={handleNavClick}
        activePath={location.pathname}
      />

      {/* MAIN CONTENT */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<HeroSection openSmokeRisk={openSmokeRisk} />}
          />

          <Route path="/process" element={<OurProcess />} />

          <Route path="/case-studies" element={<CaseStudies />} />

          <Route path="/volunteer" element={<CollectDataPage />} />

          {/* Mobile full-page SmokeRisk */}
          <Route path="/smoke-risk" element={<SmokeRisk embedded />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer
        onLinkClick={handleNavClick}
        activePath={location.pathname}
      />

      {/* DESKTOP MODAL */}
      <SmokeRiskModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}
