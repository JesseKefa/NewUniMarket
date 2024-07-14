import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/orders">View Orders</Link></li>
        <li><Link to="/admin/categories">Manage Categories</Link></li>
        <li><button onClick={handleLogout} className="sign-out-button">Sign Out</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
