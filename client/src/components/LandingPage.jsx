import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import NewNavbar from "./NewNavbar.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection.jsx";
import OurProcess from "./OurProcess.jsx";
import CaseStudies from "./CaseStudies.jsx";
import SmokeRiskModal from "./SmokeRiskModal.jsx";
import CollectDataPage from "./CollectDataPage.jsx"; 


export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);
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
  } else if (activePage === "volunteer") {
    mainContent = <CollectDataPage />;
  }

  return (
    <div className="page" style={{ backgroundColor: "#f6f7f5", color: "#2f4f44", fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Navbar */}
     
      <NewNavbar
        onTry={openModal}
        onNavClick={handleNavClick}
        activePage={activePage}
      />

      {/* Main Content */}
      <main>
        {mainContent}
      </main>

      {/* Footer */}
      <Footer
      onLinkClick={handleNavClick}
      activePage={activePage}
        />

    {/* MODAL */}
    <SmokeRiskModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}
