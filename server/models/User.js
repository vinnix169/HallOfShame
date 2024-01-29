const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: Stirng,
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
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
