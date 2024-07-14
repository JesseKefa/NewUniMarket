import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/dashboard-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const usersData = {
    labels: ['Users'],
    datasets: [
      {
        label: 'Users',
        data: [data.users.length],
        backgroundColor: ['#FF6384'],
        hoverBackgroundColor: ['#FF6384']
      }
    ]
  };

  const productsData = {
    labels: ['Products'],
    datasets: [
      {
        label: 'Products',
        data: [data.products.length],
        backgroundColor: ['#36A2EB'],
        hoverBackgroundColor: ['#36A2EB']
      }
    ]
  };

  const ordersData = {
    labels: ['Orders'],
    datasets: [
      {
        label: 'Orders',
        data: [data.orders.length],
        backgroundColor: ['#FFCE56'],
        hoverBackgroundColor: ['#FFCE56']
      }
    ]
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-charts">
        <div>
          <Pie data={usersData} />
          <p>Users</p>
        </div>
        <div>
          <Pie data={productsData} />
          <p>Products</p>
        </div>
        <div>
          <Pie data={ordersData} />
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
