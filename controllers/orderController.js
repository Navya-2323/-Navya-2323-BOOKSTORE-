import Order from "../models/Order.js";
import Cart from "../models/CartModel.js";


// Place a new order
export const placeOrder = async (req, res) => {
  const { paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.book");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user.id,
      items: cart.items.map((item) => ({
        book: item.book._id,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod,
      isPaid: paymentMethod === 'COD' ? false : true,
      paidAt: paymentMethod === 'Online' ? Date.now() : null,
    });

    await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    console.error("Failed to place order:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// Get orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.book");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.book");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};
