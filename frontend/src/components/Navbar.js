import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const profileImage = localStorage.getItem('profileImage');
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">UniMarket</Link>
        <Link to="/products">Products</Link>
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
            <div className="profile-menu" ref={dropdownRef}>
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
