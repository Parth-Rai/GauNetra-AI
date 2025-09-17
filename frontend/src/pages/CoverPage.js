import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function CoverPage() {
  return (
    <div className="cover-hero-section">
      <div className="hero-background-blob"></div>

      <div className="cover-content">
        <h1 className="cover-title">
          GauNetra AI
        </h1>
        <img src="/gaunetra-logo.png" alt="GauNetra AI Logo" className="cover-logo" />
        <p className="cover-subtitle">
          India's Premier AI for Accurate Cattle Breed Recognition
        </p>
        <div className="cover-description">
          <p>
            Empowering the dairy industry with instant, reliable breed identification,
            even in offline rural environments.
          </p>
        </div>
        <Link to="/home" className="cover-cta-button">
          Explore the Project <FaArrowRight className="cta-icon" />
        </Link>
      </div>
    </div>
  );
}

export default CoverPage;