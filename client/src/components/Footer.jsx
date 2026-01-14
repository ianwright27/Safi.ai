// export default function Footer() {
//   const Disabled = ({ children }) => <span className="disabled">{children}</span>;
//   return (
//     <footer className="footer">
//       <div className="footer-inner">
//         <div className="footer-brand">
//           <strong>Safi AI</strong>
//           <p>Predicting neighborhood-level smoke pollution before exposure happens.</p>
//         </div>
//         <div className="footer-cols">
//           <div><h4>Product</h4><Disabled>Build</Disabled><Disabled>Pricing</Disabled></div>
//           <div><h4>Solutions</h4><a href="#process">Our Process</a><Disabled>Real Estate</Disabled><Disabled>Medical Facilities</Disabled><Disabled>Office Spaces</Disabled></div>
//           <div><h4>Resources</h4><Disabled>Docs</Disabled><Disabled>Tutorials</Disabled><a href="#cases">Case Studies</a><Disabled>Blog</Disabled></div>
//           <div><h4>Company</h4><Disabled>Careers</Disabled><Disabled>Terms of Service</Disabled><Disabled>Privacy Policy</Disabled></div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f6f7f5',
        padding: '2rem 1.5rem',
        borderTop: '1px solid #dce1dd',
      }}
    >
      <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
        {/* Left Section */}
        <div style={{ flex: '1 1 250px', minWidth: '200px' }}>
          <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#2f4f44' }}>Safi AI</div>
          <p style={{ color: '#4b5f57', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Predicting neighborhood-level smoke pollution before exposure happens.
          </p>
        </div>

        {/* Right Section: Links */}
        <div style={{ display: 'flex', flex: '2 1 400px', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Product */}
          <div>
            <div style={{ fontWeight: 600, color: '#2f4f44', marginBottom: '0.5rem' }}>Product</div>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Build</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Pricing</p>
          </div>
          {/* Solutions */}
          <div>
            <div style={{ fontWeight: 600, color: '#2f4f44', marginBottom: '0.5rem' }}>Solutions</div>
            <p style={{ cursor: 'pointer', color: '#4b5f57' }}>The Process</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Real Estate</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Medical Facilities</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Office Spaces</p>
          </div>
          {/* Resources */}
          <div>
            <div style={{ fontWeight: 600, color: '#2f4f44', marginBottom: '0.5rem' }}>Resources</div>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Docs</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Tutorials</p>
            <p style={{ cursor: 'pointer', color: '#4b5f57' }}>Case Studies</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Blog</p>
          </div>
          {/* Company */}
          <div>
            <div style={{ fontWeight: 600, color: '#2f4f44', marginBottom: '0.5rem' }}>Company</div>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Careers</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Terms of Service</p>
            <p style={{ color: '#a0a0a0', cursor: 'not-allowed' }}>Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
