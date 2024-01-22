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

app.post("/newPost", async (req, res) => {
  const post = req.body;
  const newPost = new PostModel(post);

  try {
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server started runnig at port:" + PORT);
});
