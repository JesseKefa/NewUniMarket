import React from 'react';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
          <button onClick={() => window.location.href='/checkout'}>Proceed to Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
