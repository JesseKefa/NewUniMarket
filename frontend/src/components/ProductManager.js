import React, { useState } from 'react';
import axios from 'axios';
import './ProductManager.css';

const ProductManager = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    quantity: 1,
    images: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Toys & Hobbies',
    'Health & Beauty',
    // Add more categories as needed
  ];

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setSelectedImages([...files]);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const incrementQuantity = () => {
    setFormData((prevData) => ({ ...prevData, quantity: prevData.quantity + 1 }));
  };

  const decrementQuantity = () => {
    setFormData((prevData) => ({
      ...prevData,
      quantity: prevData.quantity > 1 ? prevData.quantity - 1 : 1,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('category', formData.category);
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('quantity', formData.quantity);
    selectedImages.forEach((image, index) => {
      form.append('images', image);
    });
  
    // Log FormData entries for debugging
    console.log('FormData entries:', Array.from(form.entries()));
  
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/products', form, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Product added successfully');
      setMessageType('success');
      // Reset form after successful submission
      setFormData({
        category: '',
        title: '',
        description: '',
        price: '',
        quantity: 1,
        images: [],
      });
      setSelectedImages([]);
    } catch (err) {
      console.error('Error adding product', err.response ? err.response.data : err);  // Log the error to the console
      setMessage('Error adding product');
      setMessageType('error');
    }
  };
  

  return (
    <div className="product-manager">
      <h2>Add a New Product</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={onChange} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={onChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={onChange} required />
        </div>
        <div>
          <label>Price (KES)</label>
          <input type="number" name="price" value={formData.price} onChange={onChange} required />
        </div>
        <div>
          <label>Quantity</label>
          <div className="quantity-control">
            <button type="button" onClick={decrementQuantity}>-</button>
            <input type="number" name="quantity" value={formData.quantity} onChange={onChange} required />
            <button type="button" onClick={incrementQuantity}>+</button>
          </div>
        </div>
        <div>
          <label>Add Photos</label>
          <input type="file" name="images" onChange={onChange} multiple />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
    </div>
  );
};

export default ProductManager;
