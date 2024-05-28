import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || 'An unexpected error occurred'));
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label>Email address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <button type="submit">Send Reset Link</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
