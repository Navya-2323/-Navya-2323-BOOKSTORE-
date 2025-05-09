import express from "express";
import Book from "../models/BookModel.js";
import { authMiddleware as verifyToken } from "../middleware/authMiddleware.js";



const router = express.Router();

// Utility function for random descriptions
const generateDescription = () => {
  const descriptions = [
    "A thrilling journey of imagination.",
    "Explore the depths of storytelling.",
    "A must-read literary piece.",
    "Inspires creativity and thought.",
    "Heartwarming and beautifully written.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// GET all books
router.get("/", verifyToken, async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error while fetching books" });
  }
});

// POST add a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({
      title,
      author,
      year,
      description: generateDescription(),
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong." });
  }
});

// PUT edit a book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: "Unable to update book." });
  }
});

// DELETE a book
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book." });
  }
});

export default router;



