const mongoose = require("mongoose");

const recipeintSchema = new mongoose.Schema({
  email: { type: String },
  contact: {
    type: Number,
    validate: {
      validator: function (v) {
        return /d{10}/.test(v);
      },
      message: "{VALUE} is not a valid 10 digit number!",
    },
  },
  pincode: { type: String, required: true },
  notified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Recipient", recipeintSchema);
