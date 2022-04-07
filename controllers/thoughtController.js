const { Thought, User } = require("../models");

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //   - `GET` to get a single thought by its `_id`

  // - `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

  //   **`/api/thoughts/:thoughtId/reactions`**

  // - `POST` to create a reaction stored in a single thought's `reactions` array field

  // - `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
};
