import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/admin-login');
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/users">Manage Users</Link>
      <Link to="/admin/products">Manage Products</Link>
      <Link to="/admin/orders">View Orders</Link>
      <Link to="/admin/categories">Manage Categories</Link>
      <div className="signout" onClick={handleSignOut}>Sign Out</div>
    </div>
  );
};

export default Sidebar;
