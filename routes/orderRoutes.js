import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/myorders", authMiddleware, getUserOrders);
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.put("/:orderId", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;
























// import express from "express";
// import Order from "../models/Order.js";

// const router = express.Router();

// // Place order
// router.post("/", async (req, res) => {
//   const { userId, books, totalAmount } = req.body;
//   try {
//     const newOrder = await Order.create({ user: userId, books, totalAmount });
//     res.status(201).json(newOrder);
//   } catch (err) {
//     res.status(400).json({ message: "Order failed." });
//   }
// });

// // Get order history
// router.get("/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.params.userId }).populate("books");
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get orders." });
//   }
// });

// export default router;
