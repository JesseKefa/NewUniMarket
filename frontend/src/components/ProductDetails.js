import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError('Error fetching product details');
      }
    };
    fetchProduct();
  }, [productId]);

  if (error) {
    return <div className="product-details"><p>{error}</p></div>;
  }

  if (!product) {
    return <div className="product-details"><p>Loading...</p></div>;
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <div className="product-details-content">
        <div className="product-images">
          {product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={product.title} />
            ))
          ) : (
            <div className="product-image-placeholder">No Image Available</div>
          )}
        </div>
        <div className="product-info">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> KES {product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
