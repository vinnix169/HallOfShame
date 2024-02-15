const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, img, desc } = req.body;
    const user = jwt.decode(req.cookies.token).user;
    console.log(user);
    const newPost = new Post({
      title,
      img,
      desc,
      creator: user,
    });

    await newPost.save();

    res.json({ message: "Haha" });
  } catch (err) {
    res.status(500).send({
      Error: "An internal server error has occured...",
    });
    console.error(err);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(post.creator);

    const result = {
      data: {
        post,
        user,
      },
    };
    console.log(post);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
