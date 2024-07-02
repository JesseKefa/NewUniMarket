import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('/api/admin/users');
        const productsRes = await axios.get('/api/admin/products');
        const ordersRes = await axios.get('/api/admin/orders');
        setUsers(usersRes.data);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="admin-section">
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username} - {user.email}</li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h3>Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.title} - {product.price}</li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h3>Orders</h3>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>Order #{order._id} - {order.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
