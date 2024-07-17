import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserProducts.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(res.data.items);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching cart products', err);
        setError('Error fetching cart products');
        setLoading(false); // Set loading to false even if there is an error
      }
    };
    fetchCart();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="user-products">
      <h2>Shopping Cart</h2>
      <div className="product-grid">
        {cart.map((item) => (
          <div key={item.productId._id} className="product-card">
            <Link to={`/products/${item.productId._id}`}>
              {item.productId.images && item.productId.images.length > 0 ? (
                <img src={`http://localhost:5000/uploads/${item.productId.images[0]}`} alt={item.productId.title} className="product-image" />
              ) : (
                <div className="product-image-placeholder">No Image Available</div>
              )}
            </Link>
            <h3><Link to={`/products/${item.productId._id}`}>{item.productId.title}</Link></h3>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
