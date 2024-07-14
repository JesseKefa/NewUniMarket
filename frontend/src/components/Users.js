import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  if (!users.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
