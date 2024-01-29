const express = require("express");
const router = express.Router();
const PostModel = require("../models/Post");
const multer = require("multer");

//Multer for storing uploaded images at ./uploads.
const storage = multer.diskStorage({
  //destination of the images
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  //naming the file by current time in milis
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Get all post
router.get("/get", async (req, res) => {
  try {
    //Finding all objects
    const result = await PostModel.find();
    res.json(result);
    //Throw error if there is one
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get a post by id
router.get("get/:id", async (req, res) => {
  try {
    //Finding object by id
    const result = await PostModel.findById(req.params.id);
    res.json(result);
    //Throw error if there is one
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Post new created post
router.post("/createPost", upload.single("image"), async (req, res) => {
  try {
    //Creating an object for editing values
    const { title, description, likes, views, date } = req.body;
    //Checking if there is an image file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    //Setting the image path, and downloading image to server
    const imagePath = req.file.filename;
    const newPost = new PostModel({
      title,
      description,
      likes,
      views,
      date,
      image: imagePath, //setting the image path for the image field
    });
    //Adding object to database
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
    //Throw error if there is one
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

//Put updated like to a post by id
router.put("/updateLikes/:id", upload.none(), async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedLikes = req.body.likes;
    //Finding and updating the object by id
    const result = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { likes: updatedLikes } }, //setting only the likes
      { new: true }
    );
    //If no object was found, return an error
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result);
    //Throw error if there is one
  } catch (err) {
    console.error("Error updating likes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Put updated view to a post by id
router.put("/updateViews/:id", upload.none(), async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedViews = req.body.views;
    console.log(req.body);
    //Finding and updating the object by id
    const result = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { views: updatedViews } }, //setting only the views
      { new: true }
    );
    //If no object was found, return an error
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result);
    //Throw error if there is one
  } catch (err) {
    console.error("Error updating views:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete post by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    //Finding object by id and deleting it
    const result = await PostModel.findByIdAndDelete(postId);

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
    //Throw error if there is one
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
