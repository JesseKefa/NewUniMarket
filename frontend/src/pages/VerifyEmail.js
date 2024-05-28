import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  React.useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/auth/verify-email?token=${token}`);
        alert('Email verified successfully');
      } catch (error) {
        alert('Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="verify-email-page">
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
