import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import NewNavbar from "./NewNavbar.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection.jsx";
import OurProcess from "./OurProcess.jsx";
import CaseStudies from "./CaseStudies.jsx";
import SmokeRiskModal from "./SmokeRiskModal.jsx";
import SmokeRisk from "./SmokeRisk.jsx";
import CollectDataPage from "./CollectDataPage.jsx"; 


export default function LandingPage() {
  const isMobile = window.innerWidth <= 768;

  const [modalOpen, setModalOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [predicted, setPredicted] = useState(false);
  const [activePage, setActivePage] = useState("home"); 
  // 'home' | 'process' | 'caseStudies' | 'volunteer' | 'smokerisk'

  const openSmokeRisk = () => {
    if (window.innerWidth <= 768) {
      setActivePage("smokerisk");
      window.scrollTo({ top: 0 });
    } else {
      setModalOpen(true);
    }
  };

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
    mainContent = <HeroSection openSmokeRisk={openSmokeRisk} />;
  } else if (activePage === "process") {
    mainContent = <OurProcess />;
  } else if (activePage === "caseStudies") {
    mainContent = <CaseStudies />;
  } else if (activePage === "volunteer") {
    mainContent = <CollectDataPage />;
  } else if (activePage === "smokerisk") {
    mainContent = <SmokeRisk embedded />;
  }


  return (
    <div className="page" style={{ backgroundColor: "#f6f7f5", color: "#2f4f44", fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Navbar */}
     
      <NewNavbar
        onTry={openSmokeRisk}
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
