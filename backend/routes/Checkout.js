const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your_stripe_secret_key_here');

router.post('/create-checkout-session', async (req, res) => {
  const { name, email, phone, event } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Event: ${event}`,
            description: `Registration for ${name} (${email})`,
          },
          unit_amount: 4999, // in cents => $49.99
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://yourdomain.com/success`,
      cancel_url: `https://yourdomain.com/cancel`,
      metadata: { name, email, phone, event },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: 'Payment session creation failed' });
  }
});

module.exports = router;
