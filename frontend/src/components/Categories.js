import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/categories');
      setCategories(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (error) return <div>Error fetching categories</div>;
  if (!categories.length) return <div>Loading...</div>;

  return (
    <div>
      <h2>Manage Categories</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
