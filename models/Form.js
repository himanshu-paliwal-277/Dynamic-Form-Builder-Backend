const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  formName: { type: String, required: true },
  formDescription: { type: String },
  fields: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Form", formSchema);
