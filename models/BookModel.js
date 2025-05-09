// backend/models/BookModel.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  description: String,
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;


