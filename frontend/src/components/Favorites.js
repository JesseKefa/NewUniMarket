import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProducts.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:5000/api/products/favorites', {}, {
          headers: {
            'x-auth-token': token,
          },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error('Error fetching favorite products', err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="user-products">
      <h2>Favorites</h2>
      <div className="product-grid">
        {favorites.map((product) => (
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

export default Favorites;
