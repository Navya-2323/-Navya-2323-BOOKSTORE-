import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    quantity: Number
  }],
  totalAmount: Number,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
