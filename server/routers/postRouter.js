const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

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

module.exports = router;
