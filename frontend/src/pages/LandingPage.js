import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Landing Page</h1>
        <p>Creative Design</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="landing-buttons">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
