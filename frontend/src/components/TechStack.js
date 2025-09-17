import React from 'react';
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiExpress, SiPostgresql, SiTensorflow, SiCss3, SiHtml5 } from 'react-icons/si';

const technologies = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'TensorFlow Lite', icon: <SiTensorflow /> },
  { name: 'HTML5', icon: <SiHtml5 /> },
  { name: 'CSS3', icon: <SiCss3 /> },
];

const TechItem = ({ name, icon }) => (
  <div className="tech-card">
    <div className="tech-icon">{icon}</div>
    <div className="tech-name">{name}</div>
  </div>
);

function TechStack() {
  return (
    <div className="section">
      <div className="content-card">
        <h2>Technology Stack</h2>
        <p>Built with a modern, robust, and scalable technology stack.</p>
        <div className="tech-grid">
          {technologies.map(tech => (
            <TechItem key={tech.name} name={tech.name} icon={tech.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;