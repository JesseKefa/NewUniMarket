import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProducts.css';

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };
    fetchProducts();
  }, []);

  const handleFavorite = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/favorites`,
        { productId },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      alert('Added to favorites');
    } catch (err) {
      console.error('Error adding to favorites', err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/cart`,
        { productId },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      alert('Added to cart');
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  return (
    <div className="user-products">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.title} className="product-image" />
            ) : (
              <div className="product-image-placeholder">No Image Available</div>
            )}
            <h3>{product.title}</h3>
            <p>KES {product.price}</p>
            <div className="product-actions">
              <button onClick={(e) => { e.stopPropagation(); handleFavorite(product._id); }}>Favorite</button>
              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product._id); }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
