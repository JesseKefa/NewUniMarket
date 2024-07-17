import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProducts.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:5000/api/products/cart', {}, {
          headers: {
            'x-auth-token': token,
          },
        });
        setCart(res.data);
      } catch (err) {
        console.error('Error fetching cart products', err);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="user-products">
      <h2>Shopping Cart</h2>
      <div className="product-grid">
        {cart.map((product) => (
          <div key={product._id} className="product-card">
            <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>KES {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
