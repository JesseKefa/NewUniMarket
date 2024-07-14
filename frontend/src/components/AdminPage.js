import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
import Products from './Products';
import Orders from './Orders';
import Categories from './Categories';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <Link to="dashboard">Dashboard</Link>
        <Link to="users">Manage Users</Link>
        <Link to="products">Manage Products</Link>
        <Link to="orders">View Orders</Link>
        <Link to="categories">Manage Categories</Link>
        <Link to="/" className="signout-button">Sign Out</Link>
      </div>
      <div className="content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<Categories />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
