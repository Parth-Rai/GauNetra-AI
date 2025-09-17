import React from 'react';
import { FaBrain } from 'react-icons/fa';
import { FiSmartphone, FiWifiOff } from 'react-icons/fi'; 

const FeatureCard = ({ title, description, icon }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

function Solution() {
  return (
    <div className="section">
      <div className="content-card">
        <h2>Our Solution: AI-Powered Certainty</h2>
        <p>
          We developed a mobile-first, AI-driven application that acts as a powerful decision-support tool, ensuring accurate breed identification every time.
        </p>
        <div className="feature-grid">
          <FeatureCard 
            icon={<FaBrain />}
            title="Instant AI Recognition"
            description="Our lightweight TFLite model identifies breeds from a single photo in seconds."
          />
          <FeatureCard
            icon={<FiWifiOff />} 
            title="Offline First Capability"
            description="Designed for rural India, the app works flawlessly with low or no internet connectivity."
          />
          <FeatureCard
            icon={<FiSmartphone />}
            title="Simple & Intuitive UI"
            description="A user-friendly interface that requires minimal training, allowing FLWs to focus on their work."
          />
        </div>
      </div>
    </div>
  );
}

export default Solution;