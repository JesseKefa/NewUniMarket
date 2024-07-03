import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountSettings = () => {
  const [profileData, setProfileData] = useState({
    gender: '',
    about: '',
    address: {
      country: '',
      fullName: '',
      streetAddress: '',
      aptSuite: '',
      city: '',
      postalCode: '',
      setDefault: false,
    },
    profileImage: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
        setMessage('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfileData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setProfileData({ ...profileData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      for (const key in profileData) {
        if (key === 'address') {
          formData.append(key, JSON.stringify(profileData[key]));
        } else {
          formData.append(key, profileData[key]);
        }
      }

      const res = await axios.put('http://localhost:5000/api/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile updated successfully');
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Profile Picture</label>
          <input type="file" name="profileImage" onChange={handleImageChange} />
        </div>
        <div>
          <p></p>
        </div>
        <div>
          <label>Gender</label>
          <div>
            <label>
              <input type="radio" name="gender" value="Female" checked={profileData.gender === 'Female'} onChange={handleChange} />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="Male" checked={profileData.gender === 'Male'} onChange={handleChange} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Rather not say" checked={profileData.gender === 'Rather not say'} onChange={handleChange} />
              Rather not say
            </label>
            <label>
              <input type="radio" name="gender" value="Custom" checked={profileData.gender === 'Custom'} onChange={handleChange} />
              Custom
            </label>
          </div>
        </div>
        <div>
          <label>About</label>
          <textarea name="about" value={profileData.about} onChange={handleChange}></textarea>
        </div>
        <div>
        <h2>Address</h2>
          <div>
            <label>Country</label>
            <select name="address.country" value={profileData.address.country} onChange={handleChange}>
              <option value="Kenya">Kenya</option>
              {/* Add other countries as needed */}
            </select>
          </div>
          <div>
            <label>Full Name</label>
            <input type="text" name="address.fullName" value={profileData.address.fullName} onChange={handleChange} />
          </div>
          <div>
            <label>Street Address</label>
            <input type="text" name="address.streetAddress" value={profileData.address.streetAddress} onChange={handleChange} />
          </div>
          <div>
            <label>Apt / Suite / Other</label>
            <input type="text" name="address.aptSuite" value={profileData.address.aptSuite} onChange={handleChange} />
          </div>
          <div>
            <label>City</label>
            <input type="text" name="address.city" value={profileData.address.city} onChange={handleChange} />
          </div>
          <div>
            <label>Postal Code</label>
            <input type="text" name="address.postalCode" value={profileData.address.postalCode} onChange={handleChange} />
          </div>
          <div>
            <label>
              <input type="checkbox" name="address.setDefault" checked={profileData.address.setDefault} onChange={handleChange} />
              Set as default
            </label>
          </div>
        </div>
        
        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountSettings;
