import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5000/api/admin/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!categories.length) return <div>Error fetching categories</div>;

  return (
    <div>
      <h2>Manage Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
