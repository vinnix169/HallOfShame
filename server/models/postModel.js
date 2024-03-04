const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  tags: {
    type: [],
    required: false,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
