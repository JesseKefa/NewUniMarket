import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
        name,
        phone,
        dateOfBirth
      });
      setMessage('Registration successful! Please check your email for verification.');
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data?.error || 'An unexpected error occurred'));
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>Email address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Phone</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        
        <label>Date of Birth</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Register;

  