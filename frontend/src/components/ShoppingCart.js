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
            <div className="cart-item-title">{item.name}</div>
            <div className="cart-item-description">{item.description}</div>
            <div className="cart-item-price">${item.price}</div>
            <div className="cart-item-quantity">
              <label htmlFor={`quantity-${index}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(index, e.target.value)}
              />
            </div>
            <button className="remove-button" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <button className="checkout-button" onClick={() => window.location.href='/checkout'}>
        Proceed to Checkout
      </button>
    </div>
  ) : (
    <p>Your cart is empty.</p>
  )}
</div>

  );
};

export default ShoppingCart;
