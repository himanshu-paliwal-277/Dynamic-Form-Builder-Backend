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

// CORS (Cross-Origin Resource Sharing) configuration
const corsOptions = {
  origin: [
    'https://dynamic-form-builder-react.vercel.app', // Production URL
    "https://dynamic-form-builder-react-js.netlify.app",
    'http://localhost:5173' // Local development URL on port 5173
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api", formRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Dynamic Form Builder API");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
