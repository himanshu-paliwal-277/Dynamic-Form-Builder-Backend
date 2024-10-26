const express = require("express");
const auth = require("../middleware/auth");
const Response = require("../models/Response");
const router = express.Router();

// Get responses for a specific form
router.get("/forms/:id/responses", auth, async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.id });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving responses", error });
  }
});

module.exports = router;
