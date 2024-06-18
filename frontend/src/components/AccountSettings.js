import React, { useState, useEffect } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '');
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    dob: '',
  });

  useEffect(() => {
    // Fetch user data from the backend
    fetch('/api/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem('profileImage', reader.result);

      // Update profile image in the backend
      fetch('/api/users/profile/image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ profileImage: reader.result }),
      })
        .then((response) => response.json())
        .then((data) => console.log('Profile image updated:', data))
        .catch((error) => console.error('Error updating profile image:', error));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="account-settings-container">
      <h1>Your Profile</h1>
      <div className="profile-section">
        <label htmlFor="profileImage">Profile Image</label>
        <input type="file" id="profileImage" accept="image/*" onChange={handleImageUpload} />
        {profileImage && <img src={profileImage} alt="Profile" className="profile-preview" />}
      </div>
      <div className="user-data-section">
        <h2>User Information</h2>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
        <p><strong>Date of Birth:</strong> {userData.dob}</p>
      </div>
    </div>
  );
};

export default AccountSettings;
