import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
