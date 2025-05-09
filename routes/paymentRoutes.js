import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe('your-stripe-secret-key'); // Replace with your actual Stripe secret key

router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

