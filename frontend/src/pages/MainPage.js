import React from 'react';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import LiveDemo from '../components/LiveDemo';
import TechStack from '../components/TechStack';


const Placeholder = ({ title }) => (
  <div style={{ padding: '40px', textAlign: 'center', border: '1px solid #eee', margin: '20px 0' }}>
    <h2>{title} Component</h2>
  </div>
);


const HeroComponent = Hero || (() => <Placeholder title="Hero" />);
const ProblemComponent = Problem || (() => <Placeholder title="Problem Statement" />);
const SolutionComponent = Solution || (() => <Placeholder title="Our Solution" />);
const TechStackComponent = TechStack || (() => <Placeholder title="Tech Stack" />);

function Showcase() {
  return (
    <div className="showcase-page">
      <Hero />
      <Problem />
      <Solution />
      <LiveDemo /> 
      <TechStack />
    </div>
  );
}

export default Showcase;