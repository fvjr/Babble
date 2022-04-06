const connection = require("../config/connection");
const { User } = require("../models");
const { users } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Now connected to database.");

  //drop existing users
  await User.deleteMany({});

  //empty array to hold users

  // const userArray = [];

  await User.collection.insertMany(users);
  console.table(users);
  console.info("Seeding complete.");
  process.exit(0);
});
