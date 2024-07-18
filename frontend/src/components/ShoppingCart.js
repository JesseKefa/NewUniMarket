import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserProducts.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setCart(res.data.items);
      } catch (err) {
        console.error('Error fetching cart products', err);
      }
    };
    fetchCart();
  }, [userId]);

  return (
    <div className="user-products">
      <h2>Shopping Cart</h2>
      <div className="product-grid">
        {cart ? (
          cart.map((item) => (
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
          ))
        ) : (
          <p>Error fetching cart products</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
