import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
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
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setFormData(res.data);
      } catch (err) {
        setMessage('Error fetching profile');
        setMessageType('error');
      }
    };
    fetchProfile();
  }, []);

  const onChange = (e) => {
    if (e.target.name.startsWith('address.')) {
      const addressField = e.target.name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: e.target.value,
        },
      }));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onFileChange = (e) => {
    setProfileImage(e.target.files[0]);
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
      await axios.put('http://localhost:5000/api/users/profile', form, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Profile updated successfully');
      setMessageType('success');
    } catch (err) {
      setMessage('Error updating profile');
      setMessageType('error');
    }
  };

  return (
    <div>
      <h1>Account Settings</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Profile Picture</label>
          <input type="file" onChange={onFileChange} />
        </div>
        <div>
          <label>Gender</label>
          <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={onChange} /> Female
          <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={onChange} /> Male
          <input type="radio" name="gender" value="Rather not say" checked={formData.gender === 'Rather not say'} onChange={onChange} /> Rather not say
          <input type="radio" name="gender" value="Custom" checked={formData.gender === 'Custom'} onChange={onChange} /> Custom
        </div>
        <div>
          <label>About</label>
          <textarea name="about" value={formData.about} onChange={onChange}></textarea>
        </div>
        <div>
          <label>Address</label>
          <div>
            <label>Country</label>
            <select name="address.country" value={formData.address.country} onChange={onChange}>
              <option value="Kenya">Kenya</option>
              {/* Add more options as needed */}
            </select>
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
            <input type="checkbox" name="address.setAsDefault" checked={formData.address.setAsDefault} onChange={(e) => onChange({ ...e, target: { ...e.target, value: e.target.checked } })} /> Set as default
          </div>
        </div>
        <button type="submit">Save Changes</button>
      </form>
      {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
};

export default AccountSettings;
