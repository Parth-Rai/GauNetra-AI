import React from 'react';

function Hero() {
  const heroStyle = {
    backgroundImage: 'url(/images/hero-background.jpg)',
  };

  return (
    <div className="hero-section" style={heroStyle}>
      <div className="hero-overlay">
        <div className="hero-container">
          <h1 className="hero-title">AI-Powered Breed Recognition for India's Livestock</h1>
          <p className="hero-subtitle">
            Empowering field workers with accurate, instant cattle breed identification to strengthen India's National Dairy Program.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;