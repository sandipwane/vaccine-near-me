const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vaccine-jugaad", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.info(`Databse connection established with ${db.name}`)
});
