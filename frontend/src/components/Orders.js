import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) return <div>Error fetching orders</div>;
  if (!orders.length) return <div>Loading...</div>;

  return (
    <div>
      <h2>View Orders</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user.email}</td>
              <td>{order.total}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.status}</td>
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

export default Orders;
