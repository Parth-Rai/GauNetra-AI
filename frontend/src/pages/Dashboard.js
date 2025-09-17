import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getDashboardData } from '../api'; 
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading dashboard...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#B3B3B3' } },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#B3B3B3' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: '#B3B3B3' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
    },
  };

  const chartData = {
    labels: dashboardData?.breedDistribution?.map(item => item.breed) || [],
    datasets: [
      {
        label: 'Total Number of Identifications',
        data: dashboardData?.breedDistribution?.map(item => item.count) || [],
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Data Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{dashboardData?.totalIdentifications || 0}</h2>
          <p>Total Animals Identified</p>
        </div>
        <div className="stat-card">
          <h2>{dashboardData?.uniqueBreeds || 0}</h2>
          <p>Unique Breeds</p>
        </div>
      </div>

      <div className="dashboard-component">
        <h3>Breed Distribution</h3>
        <Bar options={chartOptions} data={chartData} />
      </div>

      <div className="dashboard-component">
        <h3>Identification Locations</h3>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: '100%', borderRadius: '16px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {dashboardData?.locations?.map(loc => (
            <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
              <Popup>
                <b>Breed:</b> {loc.breed} <br />
                <b>Confidence:</b> {(loc.confidence * 100).toFixed(1)}%
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Dashboard;