const { Schema, model } = require("mongoose");

// const thoughtSchema = require("./Thought");

//function to validate user email
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
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ _id: { type: Schema.Types.ObjectId, ref: "User" } }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    //trying id options
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

const User = model("User", userSchema);

module.exports = User;
