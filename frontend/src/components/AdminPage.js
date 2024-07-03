import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

const Admin = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage(res.data.msg);
      } catch (err) {
        setMessage('Access denied.');
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <p>{message}</p>
    </div>
  );
};

export default Admin;
