import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard-data');
      setDashboardData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching dashboard data');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (error) return <div>Error fetching dashboard data</div>;
  if (!dashboardData) return <div>Loading...</div>;

  const barData = {
    labels: ['Users', 'Products', 'Orders', 'Categories'],
    datasets: [
      {
        label: 'Count',
        data: [
          dashboardData.usersCount,
          dashboardData.productsCount,
          dashboardData.ordersCount,
          dashboardData.categoriesCount,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  const pieData = {
    labels: ['Users', 'Products', 'Orders', 'Categories'],
    datasets: [
      {
        data: [
          dashboardData.usersCount,
          dashboardData.productsCount,
          dashboardData.ordersCount,
          dashboardData.categoriesCount,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '45%' }}>
          <Bar data={barData} />
        </div>
        <div style={{ width: '45%' }}>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
