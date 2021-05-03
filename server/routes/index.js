var express = require("express");
var router = express.Router();
const snsNotifier = require("../cron/snsNotifier");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Vaccine Jugaad API" });
});

router.get("/check-sms", function (req, res, next) {
  snsNotifier.sendSMS("Hello World", "9545790591");
  res.send({
    message: 'sms triggered'
  })
});

module.exports = router;
