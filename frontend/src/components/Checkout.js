import React, { useState } from 'react';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvc: '' });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (paymentMethod === 'mpesa') {
      try {
        const response = await axios.post('http://localhost:5000/api/payments/mpesa', {
          phoneNumber: mpesaNumber,
        });
        alert(response.data.message);
      } catch (error) {
        console.error('Error processing M-Pesa payment:', error);
        alert('Payment failed. Please try again.');
      }
    } else {
      // Handle credit card payment
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div className="payment-method">
          <label>
            <input
              type="radio"
              value="mpesa"
              checked={paymentMethod === 'mpesa'}
              onChange={handlePaymentMethodChange}
            />
            M-Pesa
          </label>
          <label>
            <input
              type="radio"
              value="credit-card"
              checked={paymentMethod === 'credit-card'}
              onChange={handlePaymentMethodChange}
            />
            Credit Card
          </label>
        </div>
        {paymentMethod === 'mpesa' && (
          <div className="mpesa-details">
            <label htmlFor="mpesaNumber">M-Pesa Number</label>
            <input
              type="text"
              id="mpesaNumber"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              required
            />
          </div>
        )}
        {paymentMethod === 'credit-card' && (
          <div className="credit-card-details">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              required
            />
            <label htmlFor="cardExpiry">Expiry Date</label>
            <input
              type="text"
              id="cardExpiry"
              value={cardDetails.expiryDate}
              onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
              required
            />
            <label htmlFor="cardCVC">CVC</label>
            <input
              type="text"
              id="cardCVC"
              value={cardDetails.cvc}
              onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
              required
            />
          </div>
        )}
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
