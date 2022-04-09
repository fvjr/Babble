const router = require("express").Router();

const { get } = require("express/lib/response");
const {
  getThoughts,
  getSingleThought,
  updateThought,
  addReaction,
  deleteReaction,
  deleteThought,
  createThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router
  .route("/")
  // - `GET` to get all thoughts
  .get(getThoughts) //-->working
  // - `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  .post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  // - `GET` to get a single thought by its `_id`
  .get(getSingleThought) //-->working
  // - `PUT` to update a thought by its `_id`
  .put(updateThought) //-->working
  // - `DELETE` to remove a thought by its `_id`
  .delete(deleteThought); //-->working

// **`/api/thoughts/:thoughtId/reactions`**
router
  .route("/:thoughtId/reactions")
  // - `POST` to create a reaction stored in a single thought's `reactions` array field
  .post(addReaction); //-->working

// **`/api/thoughts/:thoughtId/reactions/:reactionId`**
router
  .route("/:thoughtId/reactions/:reactionId")
  // - `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
  .delete(deleteReaction); //-->working

module.exports = router;
