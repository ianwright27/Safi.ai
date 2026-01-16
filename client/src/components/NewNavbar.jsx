import React, { useState } from "react";

export default function NewNavbar({ onTry, onNavClick, activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = (page) => ({
    fontWeight: activePage === page ? 600 : 400,
    color: activePage === page ? "#2f4f44" : "#4b5f57",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0.75rem 0",
    textAlign: "left",
    fontSize: "0.85rem",
  });

  const desktopLinkStyle = (page) => ({
    ...linkStyle(page),
    padding: "0.5rem 1rem",
  });

  return (
    <>
      {/* NAV BAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          backgroundColor: "#f6f7f5",
          borderBottom: "1px solid #dce1dd",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* BRAND */}
        <div
          style={{ fontWeight: "bold", fontSize: "1.25rem", cursor: "pointer" }}
          onClick={() => onNavClick("home")}
        >
          Safi AI
        </div>

        {/* DESKTOP LINKS */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <button style={desktopLinkStyle("home")} onClick={() => onNavClick("home")}>Home</button>
          {/* <button style={desktopLinkStyle("process")} onClick={() => onNavClick("process")}>The Process</button> */}
          {/* <button style={desktopLinkStyle("caseStudies")} onClick={() => onNavClick("caseStudies")}>Case Studies</button> */}
          <button style={desktopLinkStyle("volunteer")} onClick={() => onNavClick("volunteer")}>Volunteer</button>

          <button
            onClick={onTry}
            style={{
              backgroundColor: "#2f4f44",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Try it now
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: "1.75rem",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </nav>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 199,
          }}
        />
      )}

      {/* SLIDE-IN MENU */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "75%",
          maxWidth: "320px",
          backgroundColor: "#f6f7f5",
          padding: "2rem 1.5rem",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            alignSelf: "flex-end",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <button style={linkStyle("home")} onClick={() => { onNavClick("home"); setMenuOpen(false); }}>
          Home
        </button>
        {/* <button style={linkStyle("process")} onClick={() => { onNavClick("process"); setMenuOpen(false); }}>
          The Process
        </button>
        <button style={linkStyle("caseStudies")} onClick={() => { onNavClick("caseStudies"); setMenuOpen(false); }}>
          Case Studies
        </button> */}
        <button style={linkStyle("volunteer")} onClick={() => { onNavClick("volunteer"); setMenuOpen(false); }}>
          Volunteer
        </button>

        <button
          onClick={() => {
            onTry();
            setMenuOpen(false);
          }}
          style={{
            marginTop: "1rem",
            backgroundColor: "#2f4f44",
            color: "#fff",
            border: "none",
            padding: "0.75rem",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Try it now
        </button>
      </aside>

      {/* RESPONSIVE RULES */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
          }
        `}
      </style>
    </>
  );
}
