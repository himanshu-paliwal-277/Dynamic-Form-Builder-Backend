const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Debugging line
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/formBuilder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api", formRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
