const { Schema, model } = require("mongoose");

const thoughtSchema = require("./Thought");

const validateEmail = (email) => {
  const emailValidator = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return emailValidator.test(email);
};

//schema to create User Model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [
        validateEmail,
        "Please enter a valid email address to create an account.",
      ],
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

const User = model("user", userSchema);

module.exports = User;
