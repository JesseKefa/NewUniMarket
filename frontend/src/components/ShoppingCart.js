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

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setCart(cart.filter(item => item.productId._id !== productId));
    } catch (err) {
      console.error('Error removing item from cart', err);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/orders`, {
        items: cart,
        totalAmount: cart.reduce((total, item) => total + item.productId.price * item.quantity, 0),
        paymentMethod: 'M-Pesa' // or 'Credit Card'
      }, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Order created:', res.data);
      // Handle successful checkout (e.g., redirect to order confirmation page)
    } catch (err) {
      console.error('Error creating order', err);
    }
  };

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
              <button onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Error fetching cart products</p>
        )}
      </div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default ShoppingCart;
