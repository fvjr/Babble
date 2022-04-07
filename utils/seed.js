const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Now connected to database.");

  //drop existing users
  await User.deleteMany({});

  //drop existing thoughts
  await Thought.deleteMany({});

  //empty array to hold users

  // const userArray = [];

  //add users to the collection and await the results
  await User.collection.insertMany(users);

  //add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.info("Seeding complete.");
  process.exit(0);
});
