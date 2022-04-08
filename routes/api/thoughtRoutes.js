const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
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
  .get(getSingleThought);
// - `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// - `PUT` to update a thought by its `_id`

// - `DELETE` to remove a thought by its `_id`

// **`/api/thoughts/:thoughtId/reactions`**

// - `POST` to create a reaction stored in a single thought's `reactions` array field

// - `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

module.exports = router;
