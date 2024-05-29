import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const verify = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/verify-email?token=${token}`);
        setMessage('Email verification successful. You can now log in.');
        navigate('/login');
      } catch (error) {
        setMessage('Email verification failed: An unexpected error occurred');
      }
    };

    if (token) {
      verify();
    } else {
      setMessage('Invalid verification link.');
    }
  }, [location, navigate]);

  return (
    <div className="verify-email-container">
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;

