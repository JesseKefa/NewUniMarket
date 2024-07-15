import React, { useState } from 'react';
import axios from 'axios';
import './ProductManager.css';

const ProductManager = () => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('physical');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('type', type);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product added:', res.data);
      // Reset form fields
      setCategory('');
      setType('physical');
      setTitle('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setFile(null);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="product-manager">
  <h2>Add a New Product</h2>
  <form onSubmit={handleSubmit}>
    <div className="step">
      <h3>Product Details</h3>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <div>
        <label>
          <input
            type="radio"
            value="physical"
            checked={type === 'physical'}
            onChange={(e) => setType(e.target.value)}
          />
          Physical Item
        </label>
        <label>
          <input
            type="radio"
            value="digital"
            checked={type === 'digital'}
            onChange={(e) => setType(e.target.value)}
          />
          Digital File
        </label>
      </div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
    </div>
    <div className="step">
      <h3>Set Your Pricing</h3>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
    </div>
    <div className="step">
      <h3>Add Photos</h3>
      <input type="file" onChange={handleFileChange} required />
    </div>
   
    <div className="error-message" style={{ display: error ? 'block' : 'none' }}>
      {error}
    </div>
   
    <div className="success-message" style={{ display: success ? 'block' : 'none' }}>
      Product added successfully!
    </div>
    
    <div className="loading-spinner" style={{ display: loading ? 'flex' : 'none' }}>
      <div></div><div></div><div></div>
    </div>
    <button type="submit">Add Product</button>
  </form>
</div>

  );
};

export default ProductManager;
