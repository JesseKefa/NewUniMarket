import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <h3>Order #{order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total: {order.total}</p>
              <div className="order-products">
                {order.products.map((item) => (
                  <div key={item.product._id} className="order-product">
                    <p>{item.product.title}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
