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

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
