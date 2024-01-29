const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PostModel = require("../models/Post");
const multer = require("multer");
const cors = require("cors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid conflicts
  },
});

const upload = multer({ storage: storage });

router.get("/get", async (req, res) => {
  try {
    const result = await PostModel.find();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await PostModel.findById(req.params.id);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createPost", upload.single("image"), async (req, res) => {
  try {
    const { title, description, likes, views, date } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imagePath = req.file.filename;

    const newPost = new PostModel({
      title,
      description,
      likes,
      views,
      date,
      image: imagePath,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.put("/updateLikes", upload.none(), async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedLikes = req.body.likes;
    console.log(req.body);

    // Find the post by ID and update the likes count
    const result = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { likes: updatedLikes } },
      { new: true } // Return the updated post
    );

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(result);
  } catch (err) {
    console.error("Error updating likes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateViews/:id", upload.none(), async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedViews = req.body.views;
    console.log(req.body);

    const result = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { views: updatedViews } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(result);
  } catch (err) {
    console.error("Error updating views:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const result = await PostModel.findByIdAndDelete(postId);

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
