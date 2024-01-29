const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pfp: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
