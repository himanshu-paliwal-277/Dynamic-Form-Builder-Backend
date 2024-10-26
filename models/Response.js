const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  answers: { type: Map, of: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("Response", responseSchema);
