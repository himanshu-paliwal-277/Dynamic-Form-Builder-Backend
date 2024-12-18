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
    const responseData = {
      formId: id,
      answers: { ...req.body }, // Spread req.body to ensure it's a plain object
    };

    const newResponse = new Response(responseData);
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

// Delete a form and its responses by ID
router.delete("/forms/:id", auth, async (req, res) => {
  try {
    const formId = req.params.id;

    // Delete the form by ID
    const deletedForm = await Form.findByIdAndDelete(formId);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Delete all responses associated with the form
    await Response.deleteMany({ formId });

    res
      .status(200)
      .json({ message: "Form and associated responses deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete form", error });
  }
});

module.exports = router;
