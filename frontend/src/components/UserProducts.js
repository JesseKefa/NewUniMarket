import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import './UserProducts.css';

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products', err);
        setLoading(false);
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Products</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <Link to={`/products/${product._id}`}>
                {product.images && product.images.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:5000/uploads/${product.images[0]}`}
                    alt={product.title}
                  />
                ) : (
                  <div className="product-image-placeholder">No Image Available</div>
                )}
              </Link>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography>KES {product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleFavorite(product._id)}>Favorite</Button>
                <Button size="small" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserProducts;
