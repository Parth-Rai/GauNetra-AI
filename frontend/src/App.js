import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import CoverPage from './pages/CoverPage';
import MainPage from './pages/MainPage';
import Dashboard from './pages/Dashboard';

const MainLayout = () => (
  <div className="app-container">
    <nav>
      <div className="logo">GauNetra AI</div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
    <main>
      <Outlet /> 
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoverPage />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;