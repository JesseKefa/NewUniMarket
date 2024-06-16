import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;