const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const mongoose = require("mongoose");
const PostModel = require("./models/Post");
app.use(cors());
app.use(express.json());

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid conflicts
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static("uploads"));

mongoose
  .connect(
    "mongodb+srv://remibende:Asdman169@hallofshamecluster.ryucxpo.mongodb.net/hallofshamedb"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", async (req, res) => {
  try {
    const result = await PostModel.find();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const result = await PostModel.findById(req.params.id);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/upload", upload.single("image"), async (req, res) => {
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

app.put("/like/:id", upload.none(), async (req, res) => {
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

app.put("/view/:id", upload.none(), async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedViews = req.body.views;
    console.log(req.body);

    // Find the post by ID and update the likes count
    const result = await PostModel.findByIdAndUpdate(
      postId,
      { $set: { views: updatedViews } },
      { new: true } // Return the updated post
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

app.delete("/deletePost/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log("Server started runnig at port:" + PORT);
});
