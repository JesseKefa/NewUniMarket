import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const onChange = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setMessageType('success');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay the navigation to show the success message
    } catch (err) {
      setMessage(err.response.data.message);
      setMessageType('error');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="New Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
