const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/mpesa', async (req, res) => {
  const { phoneNumber } = req.body;

  // Implement M-Pesa Daraja API integration here
  const shortCode = 'YOUR_SHORTCODE';
  const lipaNaMpesaOnlinePasskey = 'YOUR_PASSKEY';
  const consumerKey = 'YOUR_CONSUMER_KEY';
  const consumerSecret = 'YOUR_CONSUMER_SECRET';
  const authUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  const paymentUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  try {
    // Get the access token
    const authResponse = await axios.get(authUrl, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });
    const accessToken = authResponse.data.access_token;

    // Make the payment request
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortCode}${lipaNaMpesaOnlinePasskey}${timestamp}`).toString('base64');
    const response = await axios.post(
      paymentUrl,
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: 1, // Amount should be dynamic
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://your-callback-url.com/callback',
        AccountReference: 'UniMarket',
        TransactionDesc: 'Payment for goods',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json({ message: 'Payment request sent. Please complete the payment on your phone.' });
  } catch (error) {
    console.error('M-Pesa payment error:', error);
    res.status(500).json({ message: 'Payment failed. Please try again.' });
  }
});

module.exports = router;
