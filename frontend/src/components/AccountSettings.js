import React, { useState } from 'react';

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem('profileImage', reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Account Settings</h1>
      <div>
        <label htmlFor="profileImage">Upload Profile Image:</label>
        <input type="file" id="profileImage" accept="image/*" onChange={handleImageUpload} />
      </div>
      {profileImage && <img src={profileImage} alt="Profile" className="profile-preview" />}
    </div>
  );
};

export default AccountSettings;
