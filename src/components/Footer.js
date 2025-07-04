import React from 'react';

const Footer = () => (
  <footer className="about-section">
    <div className="about-content">
      <h2>About the Developer</h2>
      <div className="developer-info">
        <div className="developer-details">
          <p><strong>Name:</strong> Abid Hasan</p>
          <p><strong>University:</strong> Southeast University</p>
          <p><strong>Department:</strong> Computer Science & Engineering</p>
          <p><strong>Semester:</strong> 6th Trimester</p>
          <p><strong>Current CGPA:</strong> 4.00</p>
          <p><strong>Project:</strong> Course Resource Hub</p>
        </div>
        <div className="university-logo">
          <div className="logo-placeholder">SEU</div>
          <p>Southeast University</p>
        </div>
      </div>
      <p className="project-description">
        This platform was developed to help students share course resources efficiently.
        All resources are shared by students for educational purposes only.
      </p>
      <div className="footer-bottom">
        <p>© 2025 Course Resource Hub | All Rights Reserved</p>
        <p>Data stored in your browser using localStorage</p>
      </div>
    </div>
  </footer>
);

export default Footer;
