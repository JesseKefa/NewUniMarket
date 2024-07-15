import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/products', {
          headers: {
            'x-auth-token': token,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };

    fetchUsers();
    fetchProducts();
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="users-list">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username} - {user.email}</li>
          ))}
        </ul>
      </div>
      <div className="products-list">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.title} - ${product.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
