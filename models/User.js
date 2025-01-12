import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  name: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
