const { Schema, Model, model } = require("mongoose");

const CarSchema = new Schema({
  title: String,
  url: String,
  datePosted: Date,
  hood: String,
  price: String,
});

module.exports = model("Car", CarSchema);
