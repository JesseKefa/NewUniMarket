import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5000/api/admin/dashboard-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDashboardData(response.data);
      } catch (error) {
        setError('Error fetching dashboard data');
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Users: {dashboardData.usersCount}</h2>
        <h2>Products: {dashboardData.productsCount}</h2>
        <h2>Orders: {dashboardData.ordersCount}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
