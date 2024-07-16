import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        setMessage(res.data.msg);
        setMessageType('success');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect to login after 2 seconds
      } catch (err) {
        setMessage(err.response?.data?.msg || 'Email verification failed');
        setMessageType('error');
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
