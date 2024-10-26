const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Form = require("../models/Form");
const Response = require("../models/Response");

// Create a form
router.post("/forms", auth, async (req, res) => {
  try {
    const { formName, formDescription, fields } = req.body;
    const newForm = new Form({
      userId: req.userId,
      formName,
      formDescription,
      fields,
    });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: "Error creating form", error });
  }
});

// Get all forms by the logged-in user
router.get("/forms", auth, async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.userId });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving forms", error });
  }
});

// Get a form by ID
router.get("/forms/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving form", error });
  }
});

// save form response
router.post("/forms/:id/responses", async (req, res) => {
  try {
    const { id } = req.params;
    const newResponse = new Response({
      formId: id,
      answers: req.body, // Contains all answers with field names as keys
    });
    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save response", error });
  }
});

// get responses for a specific form
router.get("/forms/:id/responses", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const responses = await Response.find({ formId: id });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve responses", error });
  }
});

module.exports = router;
