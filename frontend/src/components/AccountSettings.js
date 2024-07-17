import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountSettings.css';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    dob: '',
    gender: '',
    about: '',
    address: {
      country: '',
      fullName: '',
      streetAddress: '',
      aptSuite: '',
      city: '',
      postalCode: '',
      setAsDefault: false,
    },
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'x-auth-token': token,
          },
        });
        setFormData(res.data);
        setProfileImagePreview(res.data.profileImage);
      } catch (err) {
        console.error('Error fetching profile', err);  // Log the error to the console
        setMessage('Error fetching profile');
        setMessageType('error');
      }
    };
    fetchProfile();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (key !== 'address') {
        form.append(key, formData[key]);
      } else {
        form.append('address', JSON.stringify(formData[key]));
      }
    }
    if (profileImage) {
      form.append('profileImage', profileImage);
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users/profile', form, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData(res.data);
      setProfileImagePreview(res.data.profileImage);
      setMessage('Profile updated successfully');
      setMessageType('success');
      setEditMode(false);
      // Update profile picture in Navbar
      document.getElementById('navbarProfileImage').src = res.data.profileImage;
      localStorage.setItem('profileImage', res.data.profileImage);

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } catch (err) {
      console.error('Error updating profile', err);  // Log the error to the console
      setMessage('Error updating profile');
      setMessageType('error');
    }
  };

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>
      {editMode ? (
        <form onSubmit={onSubmit}>
          <div>
            <label>Profile Picture</label>
            <input type="file" onChange={onFileChange} />
            {profileImagePreview && <img src={profileImagePreview} alt="Profile Preview" className="profile-preview" />}
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={onChange} disabled />
          </div>
          <div>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={onChange} />
          </div>
          <div>
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={onChange} />
          </div>
          <div>
            <label>Gender</label>
            <div>
              <label>
                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={onChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={onChange} />
                Female
              </label>
              <label>
                <input type="radio" name="gender" value="Rather not say" checked={formData.gender === 'Rather not say'} onChange={onChange} />
                Rather not say
              </label>
              <label>
                <input type="radio" name="gender" value="Custom" checked={formData.gender === 'Custom'} onChange={onChange} />
                Custom
              </label>
            </div>
          </div>
          <div>
            <label>About</label>
            <textarea name="about" value={formData.about} onChange={onChange} />
          </div>
          <h3>Address</h3>
          <div>
            <label>Country</label>
            <input type="text" name="address.country" value={formData.address.country} onChange={onChange} />
          </div>
          <div>
            <label>Full Name</label>
            <input type="text" name="address.fullName" value={formData.address.fullName} onChange={onChange} />
          </div>
          <div>
            <label>Street Address</label>
            <input type="text" name="address.streetAddress" value={formData.address.streetAddress} onChange={onChange} />
          </div>
          <div>
            <label>Apt / Suite / Other (optional)</label>
            <input type="text" name="address.aptSuite" value={formData.address.aptSuite} onChange={onChange} />
          </div>
          <div>
            <label>City</label>
            <input type="text" name="address.city" value={formData.address.city} onChange={onChange} />
          </div>
          <div>
            <label>Postal Code (optional)</label>
            <input type="text" name="address.postalCode" value={formData.address.postalCode} onChange={onChange} />
          </div>
          <div>
            <label>
              <input type="checkbox" name="address.setAsDefault" checked={formData.address.setAsDefault} onChange={onChange} />
              Set as default
            </label>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div className="profile-display">
          <div className="profile-picture">
            <img src={profileImagePreview || '/default-profile.png'} alt="Profile" />
          </div>
          <div className="profile-info">
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Username:</strong> {formData.username}</p>
            <p><strong>Date of Birth:</strong> {new Date(formData.dob).toDateString()}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>About:</strong> {formData.about}</p>
            <h3>Address</h3>
            <p><strong>Country:</strong> {formData.address.country}</p>
            <p><strong>Full Name:</strong> {formData.address.fullName}</p>
            <p><strong>Street Address:</strong> {formData.address.streetAddress}</p>
            <p><strong>Apt / Suite / Other:</strong> {formData.address.aptSuite}</p>
            <p><strong>City:</strong> {formData.address.city}</p>
            <p><strong>Postal Code:</strong> {formData.address.postalCode}</p>
            <p><strong>Set as Default:</strong> {formData.address.setAsDefault ? 'Yes' : 'No'}</p>
          </div>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
      {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
};

export default AccountSettings;
