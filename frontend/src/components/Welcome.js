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
      <nav>
        <a href="/">UniMarket</a>
        <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>Logout</button>
      </nav>
      <div className="container">
        <h1>Welcome, {username}!</h1>
        <p>Here is your e-commerce dashboard.</p>
        {/* Add more content as needed for the e-commerce dashboard */}
      </div>
    </div>
  );
};

export default Welcome;
