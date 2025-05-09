import express from "express";
import Genre from "../models/Genre.js";

const router = express.Router();

// Add genre
router.post("/", async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).json({ message: "Failed to add genre." });
  }
});

// Get genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch genres." });
  }
});

export default router;
