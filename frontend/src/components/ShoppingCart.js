import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProducts.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  return (
    <div className="user-products">
      <h2>Shopping Cart</h2>
      <div className="product-grid">
        {cart.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/product/${product._id}`}>
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.title} className="product-image" />
              ) : (
                <div className="product-image-placeholder">No Image Available</div>
              )}
            </Link>
            <h3><Link to={`/product/${product._id}`}>{product.title}</Link></h3>
            <p>KES {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
