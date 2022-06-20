const mongoose = require("mongoose");
const { getListingOfCars } = require("./craiglistClient");
const { saveCar, getCars, getByHood } = require("./dbClient");

const url =
  "mongodb+srv://snakep1sken:p9ef9QSqipLmhfK@nodeschool-cluster.h14w6.mongodb.net/cardb?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connecting to Database
mongoose
  .connect(url, connectionParams)
  .then(async () => {})
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

async function main() {
  const cars = await getByHood();
  console.log(cars);
  process.exit(0);
}

main();

// price conversion regex
// Create update function to update car
// Create function to delete a car
// Create function to find by title partial match.
