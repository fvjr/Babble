const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

//aggregate function to get the number of users overal

const totalUsers = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
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
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({
              message: "No user found with that ID. Please review the ID",
            })
          : res.json({
              user,
              //STILL NEED ASSOCIATED THOUGHT AND REACTION DATA
            })
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

  // - `DELETE` to remove user by its `_id`

  //   **`/api/users/:userId/friends/:friendId`**

  // - `POST` to add a new friend to a user's friend list

  // - `DELETE` to remove a friend from a user's friend list
};
