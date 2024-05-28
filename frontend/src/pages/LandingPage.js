import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <nav>
          <div className="logo">UniMarket</div>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Welcome to UniMarket</h1>
        <p>Your one-stop shop for all your needs.</p>
        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Sign Up</Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

