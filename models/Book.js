import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  year: Number,
  description: String,
});

// ✅ Avoid OverwriteModelError
const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;


