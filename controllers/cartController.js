import Cart from '../models/CartModel.js';

export const addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      // Check if book already exists in cart
      const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ book: bookId, quantity });
      }
      cart = await cart.save();
    } else {
      // Create new cart
      cart = await Cart.create({
        user: userId,
        items: [{ book: bookId, quantity }],
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.book');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.book.toString() !== bookId);
    cart = await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};






