import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="product-list-container">
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={`http://localhost:5000/uploads/${product.photos[0]}`} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
