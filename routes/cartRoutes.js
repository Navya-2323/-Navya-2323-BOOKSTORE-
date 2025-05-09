import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/remove/:bookId', authMiddleware, removeFromCart);

export default router;







































// import express from "express";
// import Cart from "../models/Cart.js";

// const router = express.Router();

// // Add book to cart
// router.post("/add", async (req, res) => {
//   const { userId, bookId } = req.body;
//   try {
//     const cartItem = await Cart.create({ user: userId, book: bookId });
//     res.status(201).json(cartItem);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to add to cart." });
//   }
// });

// // Get cart items
// router.get("/:userId", async (req, res) => {
//   try {
//     const cart = await Cart.find({ user: req.params.userId }).populate("book");
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching cart." });
//   }
// });

// // Remove item
// router.delete("/:id", async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Removed from cart." });
//   } catch (err) {
//     res.status(500).json({ message: "Error removing item." });
//   }
// });

// export default router;



