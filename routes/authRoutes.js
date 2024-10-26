const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register Route (Simplified)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password }); // Store password directly
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login Route (Simplified)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found"); // Debugging output
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    if (user.password !== password) {
      console.log("Password mismatch"); // Debugging output
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      userId: user._id,
      username: user.username,
      userEmail: email,
    });
  } catch (error) {
    console.error("Error logging in:", error); // Log specific error details
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
