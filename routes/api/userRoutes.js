const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
} = require("../../controllers/userController");

// /api/users
router
  .route("/")
  // - `GET` all users
  .get(getUsers)
  // - `POST` a new user:
  .post(createUser);

// /api/users/:userId
router
  .route("/:userId")
  // - `GET` a single user by its `_id` and populated thought and friend data
  .get(getSingleUser)
  // - `PUT` to update a user by its `_id`
  .put(updateUser)
  // - `DELETE` to remove user by its `_id`
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  // - `POST` to add a new friend to a user's friend list
  .post(addFriend); // -------not working
// - `DELETE` to remove a friend from a user's friend list

module.exports = router;
