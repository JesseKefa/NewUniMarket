import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:5000/api/admin/dashboard-data', config);
        setDashboardData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
        setError('Error fetching dashboard data');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {dashboardData ? (
        <div>
          {/* Render your dashboard data here */}
          <p>Users: {dashboardData.users}</p>
          <p>Products: {dashboardData.products}</p>
          <p>Orders: {dashboardData.orders}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
