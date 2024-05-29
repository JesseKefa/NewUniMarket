import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import VerifyOTP from './components/VerifyOTP';
import LandingPage from './components/LandingPage';
import Welcome from './components/Welcome';
import './styles.css';

function App() {
  return (
    <Router>
      <nav>
        <a href="/">UniMarket</a>
        <div>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
