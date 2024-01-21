const express = require("express");
const app = express();
const cors = require('cors')
const PORT = 3001;
const mongoose = require("mongoose");
const PostModel = require("./models/Post");


app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/hosdb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


  app.get("/getPosts", async (req, res) => {
    try {
      const result = await PostModel.find({});
      res.json(result);
    } catch (err) {
      res.json({ error: err.message });
    }
  });

app.post("/newPost", async (req,res) => {
    const post = req.body;
    const newPost = new PostModel(post);
    await newPost.save();
})

app.listen(PORT, () => {
  console.log("Server started runnig at port:" + PORT);
});
