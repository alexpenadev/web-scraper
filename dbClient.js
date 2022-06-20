const mongoose = require("mongoose");
const Car = require("./car");
// Save car model is passed to async function
async function saveCar({ title, url, datePosted, hood, price }) {
  const car = new Car({
    title,
    url,
    datePosted: new Date(datePosted),
    hood,
    price,
  });

  await car.save();
}

async function getCars() {
  const cars = await Car.find();
  return cars;
}
//
async function getByHood(hood) {
  const cars = await Car.find({ hood });
  return cars;
}


module.exports = { saveCar, getCars, getByHood };
