import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../AuthStyles.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/auth/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      setMessage('Login successful');
      setMessageType('success');
      setTimeout(() => navigate('/admin/dashboard'), 2000); // Redirect to admin dashboard after 2 seconds
    } catch (err) {
      setMessage('Error logging in');
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Admin Login</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
