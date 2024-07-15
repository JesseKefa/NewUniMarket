const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createStripePaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createStripePaymentIntent };
