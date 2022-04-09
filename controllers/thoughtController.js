const { ObjectId } = require("mongoose").Types;
const res = require("express/lib/response");
const { Thought, User } = require("../models");

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //   - `GET` to get a single thought by its `_id`
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // - `PUT` to update a thought by its `_id`
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "No thought found with this ID. Please try again.",
            })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // - `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
  // createThought(req, res) {
  //   Thought.create(req.body)
  //     .then((thought) => res.json(thought))
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     });
  // },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but no user found with that ID",
            })
          : res.json(
              "Created the thought and added the thought to the user successfully."
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // - `DELETE` to remove a thought by its `_id`
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found by this ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //   **`/api/thoughts/:thoughtId/reactions`**

  // - `POST` to create a reaction stored in a single thought's `reactions` array field
  addReaction(req, res) {
    console.log("Adding reaction to thought");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "No thought found with this ID. Please try again.",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // - `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
