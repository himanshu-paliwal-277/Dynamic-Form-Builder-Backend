const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  // Extract the token after confirming Authorization header exists
  const token = authHeader.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
