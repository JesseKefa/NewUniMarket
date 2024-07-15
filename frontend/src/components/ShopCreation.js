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
    <div class="shop-creation">
  <h2>Create Your Shop</h2>
  <div class="form-group">
    <label for="shop-name">Shop Name</label>
    <input type="text" id="shop-name" name="shop-name"/>
  </div>
  <div class="form-group">
    <label for="shop-description">Description</label>
    <textarea id="shop-description" name="shop-description"></textarea>
  </div>
  <div class="form-group">
    <label for="shop-owner">Owner Name</label>
    <input
     type="text" id="shop-owner" name="shop-owner"/>
  </div>
  
  <div class="error-message" style="display:none;">An error occurred. Please try again.</div>
  
  <div class="success-message" style="display:none;">Shop created successfully!</div>
 
  <div class="loading-spinner" style="display:none;">
    <div></div><div></div><div></div>
  </div>
  <button type="submit">Create Shop</button>
</div>

  );
};

export default ShopCreation;
