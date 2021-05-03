const mongoose = require("mongoose");

const recipeintSchema = new mongoose.Schema({
  email: String,
  pincode: String,
  notified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Recipient", recipeintSchema);
