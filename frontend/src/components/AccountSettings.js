import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountSettings.css';

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setDob(res.data.dob);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('dob', dob);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const res = await axios.put('/api/users/update', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(res.data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="account-settings">
      <h2>Your Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="profile-image-section">
          <label>Profile Image</label>
          <input type="file" onChange={handleFileChange} />
          {user.profileImage && (
            <img src={`/uploads/${user.profileImage}`} alt="Profile" />
          )}
        </div>
        <div className="user-info-section">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default AccountSettings;
