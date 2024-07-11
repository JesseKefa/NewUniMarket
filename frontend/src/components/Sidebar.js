// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/orders">View Orders</Link></li>
        <li><Link to="/admin/categories">Manage Categories</Link></li>
        <li><button className="sign-out-button">Sign Out</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
