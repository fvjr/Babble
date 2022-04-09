const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
const thoughtController = require("./thoughtController");

//aggregate function to get the number of users overal

const totalUsers = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // - `GET` all users
  //get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const usersObj = {
          users,
          numberOfUsers: await totalUsers(),
        };
        return res.json(usersObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //   - `GET` a single user by its `_id` and populated thought and friend data
  //find user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .then(async (user) =>
        !user
          ? res.status(404).json({
              message: "No user found with that ID. Please review the ID",
            })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // - `POST` a new user:
  //create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // - `PUT` to update a user by its `_id`
  //update user by id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user found with this ID. Please try again.",
            })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // - `DELETE` to remove user by its `_id`
  //delete a user by id

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user found with this ID. Please try again.",
            })
          : Thought.deleteMany({ $in: user.thoughts })
      )
      .then(() =>
        res.json({
          message: "User and associated thoughts successfully deleted.",
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // - `POST` to add a new friend to a user's friend list
  //add a friend to a user's friend list
  addFriend(req, res) {
    console.log("Adding friend");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user found with this ID. Please try again.",
            })
          : res.json({ user })
      )
      .catch((err) => res.status(500).json(err));
  },

  // - `DELETE` to remove a friend from a user's friend list
  deleteFriend(req, res) {
    console.log("Deleting friend from friend's list");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user found with this ID. Please try again.",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
