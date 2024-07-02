import React, { useState } from 'react';
import axios from 'axios';
import './ShopCreation.css';

const ShopCreation = ({ setShopCreated }) => {
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shopData = {
      name: shopName,
      description: shopDescription,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/shops', shopData);
      console.log('Shop created:', res.data);
      setShopCreated(true);
    } catch (err) {
      console.error('Error creating shop:', err);
    }
  };

  return (
    <div className="shop-creation">
      <h2>Create Your Shop</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shop Name</label>
          <input
            type="text"
            placeholder="Enter your shop name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Shop Description</label>
          <textarea
            placeholder="Describe your shop"
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Shop</button>
      </form>
    </div>
  );
};

export default ShopCreation;
