import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product details', err);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <div className="product-details-content">
        <div className="product-images">
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={product.title} />
          ))}
        </div>
        <div className="product-info">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> KES {product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Seller:</strong> <Link to={`/users/${product.sellerId}`}>{product.sellerName}</Link></p>
          <button onClick={() => navigate(`/messages/${product.sellerId}`)}>Message Seller</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
