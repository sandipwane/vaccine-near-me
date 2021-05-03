var express = require("express");
const axios = require("axios");
const moment = require("moment");
var router = express.Router();

function getTodaysDateIndFormat() {
  return moment().format("DD-MM-YYYY");
}

router.get("/", async (req, res) => {
  res.send({
    message: "Please use route `vaccine/:pincode/:date?` to check availability",
  });
});

async function fetchVaccinesByPincodeAndDate(pincode, date) {
  try {
    const response = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
    );
    let sessions = [];
    if (response && response.data && response.data.sessions) {
      sessions = response.data.sessions;
    }

    return sessions;
  } catch (error) {
    const message = error.response.data.error;
    throw new Error(message);
  }
}

/* GET */
router.get("/:pincode/:date?", async (req, res) => {
  try {
    let { pincode, date } = req.params;
    date = date || getTodaysDateIndFormat();
    if (!pincode) {
      throw new Error("Pincode is require to fetch vaccine availability");
    }
    const sessions = await fetchVaccinesByPincodeAndDate(pincode, date)
    res.send({
      data: sessions,
    });
  } catch (error) {
    res.set(400);
    res.send({
      message: error.message,
    });
  }
});

module.exports = router;
