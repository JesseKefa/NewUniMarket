import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import VerifyOTP from './components/VerifyOTP';
import LandingPage from './components/LandingPage';
import Welcome from './components/Welcome';
import ForgotPassword from './components/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
import AccountSettings from './components/AccountSettings';
import Navbar from './components/Navbar';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import ProductList from './components/ProductList';
import ProductManager from './components/ProductManager';
import AdminLogin from './components/AdminLogin';

import Sidebar from './components/Sidebar';
import AdminPage from './components/AdminPage';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';
import Categories from './components/Categories';

import './styles.css';
import './components/Navbar.css';
import './components/AccountSettings.css';
import './components/ShoppingCart.css';
import './components/Checkout.css';
import './components/ProductList.css';
import './components/ProductManager.css';
import './components/AdminPage.css';

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <Router>
      {!isAdminRoute && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/favorites" element={<div>Favorites</div>} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/shop-manager" element={<ProductManager />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/*" element={<AdminPage />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
