// import React, { useState } from "react";

// function Navbar({ onTry }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <nav className="nav">
//       <div className="nav-inner">
//         <div className="brand">Safi AI</div>
//         <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>
//         <div className={`nav-links ${open ? "open" : ""}`}>
//           <a href="#process">Our Process</a>
//           <a href="#cases">Case Studies</a>
//           <button className="cta" onClick={onTry}>Try it now</button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar; 

import React from "react";

export default function Navbar({ onTry, onNavClick, activePage }) {
  const linkStyle = (page) => ({
    fontWeight: activePage === page ? 600 : 400,
    color: activePage === page ? "#2f4f44" : "#4b5f57",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0.5rem 1rem",
  });

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "#f6f7f5", borderBottom: "1px solid #dce1dd", position: "sticky", top: 0, zIndex: 100 }}>
      <div 
      style={{ fontWeight: "bold", fontSize: "1.25rem", cursor: "pointer" }} 
      onClick={() => onNavClick("home")}>Safi AI</div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button style={linkStyle("home")} onClick={() => onNavClick("home")}>Home</button>
        <button style={linkStyle("process")} onClick={() => onNavClick("process")}>Our Process</button>
        <button style={linkStyle("caseStudies")} onClick={() => onNavClick("caseStudies")}>Case Studies</button>
        <button
          onClick={onTry}
          style={{ backgroundColor: "#2f4f44", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer" }}
        >
          Try it now
        </button>
      </div>
    </nav>
  );
}
