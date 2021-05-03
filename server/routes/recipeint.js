var express = require("express");
var router = express.Router();
// const mongoose = require("mongoose");

const RecipientModel = require("../database/recipentModel");

/* Add recipeient */
router.post("/register", async (req, res) => {
  try {
    let { email, pincode } = req.body;

    const existingRecipiet = await RecipientModel.findOne({ email });
    if (existingRecipiet) {
      throw new Error("Email Already Registered");
    }
    const recipient = new RecipientModel({ email, pincode });
    await recipient.save();
    res.send({
      message: `Email address ${email} for pincode ${pincode} registered successfully`,
    });
  } catch (error) {
    res.set(400);
    res.send({
      message: error.message,
    });
  }
});

module.exports = router;
