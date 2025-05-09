import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Add review
router.post("/", async (req, res) => {
  const { bookId, userId, content, rating } = req.body;
  try {
    const review = await Review.create({ book: bookId, user: userId, content, rating });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: "Review failed." });
  }
});

// Get reviews for a book
router.get("/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate("user");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to get reviews." });
  }
});

export default router;
