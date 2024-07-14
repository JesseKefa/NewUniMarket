import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/dashboard-data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const userCount = data.users.length;
  const productCount = data.products.length;
  const orderCount = data.orders.length;

  const userData = {
    labels: ['Users'],
    datasets: [
      {
        label: 'Users',
        data: [userCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const productData = {
    labels: ['Products'],
    datasets: [
      {
        label: 'Products',
        data: [productCount],
        backgroundColor: ['rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const orderData = {
    labels: ['Orders'],
    datasets: [
      {
        label: 'Orders',
        data: [orderCount],
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="chart-container">
        <Bar data={userData} />
        <Bar data={productData} />
        <Bar data={orderData} />
      </div>
    </div>
  );
};

export default Dashboard;
