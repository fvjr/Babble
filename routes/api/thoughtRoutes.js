const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  updateThought,
  addReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts

router
  .route("/")
  // - `GET` to get all thoughts
  .get(getThoughts);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  // - `GET` to get a single thought by its `_id`
  .get(getSingleThought)
  // - `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

  // - `PUT` to update a thought by its `_id`
  .put(updateThought);
// - `DELETE` to remove a thought by its `_id`

// **`/api/thoughts/:thoughtId/reactions`**
router
  .route("/:thoughtId/reactions")
  // - `POST` to create a reaction stored in a single thought's `reactions` array field
  .post(addReaction);
// - `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

module.exports = router;
