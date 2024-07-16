import React, { useState } from 'react';
import axios from 'axios';
import '../AuthStyles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('Password reset email sent');
      setMessageType('success');
    } catch (err) {
      setMessage('Error sending password reset email');
      setMessageType('error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Forgot Password</h2>
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
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
