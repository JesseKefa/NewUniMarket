import React, { useEffect, useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    fetch('/api/admin/products', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-section">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ${product.price} (Posted by {product.postedBy.username})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
