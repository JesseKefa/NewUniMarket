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

  const handleFavorite = (productId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(`Product ${productId} added to favorites`);
    }
  };

  const handleAddToCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log(`Product ${productId} added to cart`);
      navigate('/cart');
    }
  };

  return (
    <div className="user-products">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/products/${product._id}`}>
              {product.images && product.images.length > 0 ? (
                <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.title} className="product-image" />
              ) : (
                <div className="product-image-placeholder">No Image Available</div>
              )}
              <h3>{product.title}</h3>
              <p>KES {product.price}</p>
            </Link>
            <div className="product-actions">
              <button onClick={() => handleFavorite(product._id)}>Favorite</button>
              <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
