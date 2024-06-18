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
import './styles.css';
import './components/Navbar.css';
import './components/AccountSettings.css';
import './components/ShoppingCart.css';
import './components/Checkout.css';
import './components/ProductList.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<ProductList />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/favorites" element={<div>Favorites</div>} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/shop-manager" element={<div>Shop Manager</div>} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
