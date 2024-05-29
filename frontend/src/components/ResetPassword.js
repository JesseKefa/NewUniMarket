import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', { email });
      console.log(res.data);
      setIsEmailSent(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      {!isEmailSent ? (
        <form onSubmit={onEmailSubmit}>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <button type="submit">Send Reset Link</button>
        </form>
      ) : (
        <form onSubmit={onPasswordSubmit}>
          <input type="text" name="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter Token" required />
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" required />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
