import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/admin/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>Error fetching products</div>;

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
