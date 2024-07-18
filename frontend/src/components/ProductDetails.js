import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Button, Paper, CircularProgress } from '@mui/material';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId'); // Ensure userId is stored in localStorage on login
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/cart/${userId}`, {
        productId: product._id,
        quantity: 1,
      }, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Product added to cart:', res.data);
      navigate('/cart');
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{product.title}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={product.title} style={{ width: '100%' }} />
              ))
            ) : (
              <Typography>No Image Available</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1"><strong>Category:</strong> {product.category}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {product.description}</Typography>
          <Typography variant="body1"><strong>Price:</strong> KES {product.price}</Typography>
          <Typography variant="body1"><strong>Quantity:</strong> {product.quantity}</Typography>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
          <div>
            <Typography variant="h6">Seller Information</Typography>
            <Typography variant="body1"><strong>Username:</strong> {product.user.username}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {product.user.email}</Typography>
            <Button variant="outlined" color="primary" onClick={() => navigate(`/messages/${product.user._id}`)}>Message Seller</Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
