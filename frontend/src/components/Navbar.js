import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const profileImage = localStorage.getItem('profileImage');
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">UniMarket</Link>
        <Link to="/categories">Categories</Link>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search for anything" className="search-bar" />
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <Link to="/favorites">Favorites</Link>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/shop-manager">Shop Manager</Link>
            <div className="profile-menu">
              <img
                src={profileImage || '/default-profile.png'}
                alt="Profile"
                className="profile-icon"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <span>{username}</span>
                  </div>
                  <Link to="/messages">Messages</Link>
                  <Link to="/account-settings">Account Settings</Link>
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
