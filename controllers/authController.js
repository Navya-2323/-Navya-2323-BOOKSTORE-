// backend/controllers/authController.js
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Request body:", req.body); // Debugging log
  console.log("Environment JWT_SECRET:", process.env.JWT_SECRET ? "Defined" : "Undefined"); // Debugging log
  console.log("Login attempt with email:", email); // Debugging log
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password); // ✅ hash compare
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password comparison result:", isMatch); // Debugging log

    if (!isMatch) {
      console.log("Password mismatch for email:", email); // Debugging log
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log("Login successful for email:", email); // Debugging log

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Request body:", req.body); // Debugging log
  console.log("Environment JWT_SECRET:", process.env.JWT_SECRET ? "Defined" : "Undefined"); // Debugging log
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  name,
  email,
  password: hashedPassword, // ✅ store hashed
});
await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};
