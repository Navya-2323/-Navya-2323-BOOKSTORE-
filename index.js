import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/booksRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ FIXED import

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);     // ✅ Auth (login/signup)
app.use("/api/users", userRoutes);    // ✅ User routes
app.use("/books", bookRoutes);        // ✅ Books CRUD
app.use("/api/cart", cartRoutes);     // ✅ Cart routes
app.use("/orders", orderRoutes);      // ✅ Orders
app.use("/reviews", reviewRoutes);    // ✅ Reviews
app.use("/genres", genreRoutes);      // ✅ Genres

// DB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
