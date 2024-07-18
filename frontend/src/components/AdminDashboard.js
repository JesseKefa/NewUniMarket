import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:5000/api/admin/dashboard-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDashboardData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ['Users', 'Products', 'Orders'],
    datasets: [
      {
        label: 'Counts',
        data: [dashboardData.users.length, dashboardData.products.length, dashboardData.orders.length],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Bar data={data} />
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.orders.map(order => (
            <tr key={order._id}>
              <td>{order.user.username}</td>
              <td>
                {order.items.map(p => (
                  <div key={p.productId._id}>
                    {p.productId.title} (x{p.quantity})
                  </div>
                ))}
              </td>
              <td>${order.totalAmount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
