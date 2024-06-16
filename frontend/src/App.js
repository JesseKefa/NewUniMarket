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
import './styles.css';

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

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/welcome" element={<Welcome />} />
            {/* Add your additional protected routes here */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

