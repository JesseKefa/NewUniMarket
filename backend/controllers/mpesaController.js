const axios = require('axios');
const mpesaConfig = require('../config/mpesa');

const initiateMpesaPayment = async (req, res) => {
  const { amount, phone } = req.body;

  const auth = Buffer.from(`${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`).toString('base64');

  try {
    const tokenResponse = await axios.get(mpesaConfig.oauthEndpoint, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const { access_token } = tokenResponse.data;

    const paymentResponse = await axios.post(mpesaConfig.stkPushEndpoint, {
      BusinessShortCode: mpesaConfig.businessShortCode,
      Password: mpesaConfig.password,
      Timestamp: mpesaConfig.timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: mpesaConfig.businessShortCode,
      PhoneNumber: phone,
      CallBackURL: mpesaConfig.callbackUrl,
      AccountReference: 'UniMarket',
      TransactionDesc: 'Payment for order',
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.status(200).json(paymentResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { initiateMpesaPayment };
