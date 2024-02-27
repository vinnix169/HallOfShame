const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Define the destination folder for storing the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
        console.log(file); // Use the original file name as the name for the stored file
    },
});

const upload = multer({ storage: storage });

//Create New Post

router.post("/", auth, upload.single("img"), async (req, res) => {
    try {
        const { title, description, likes, views, date, desc } = req.body;
        const user = jwt.decode(req.cookies.token).user;

        const originalImgBuffer = req.file.buffer;
        const originalImgName = req.file.originalname;

        const thumbnailFileName = `${
            path.parse(originalImgName).name
        }-thumbnail.jpg`;
        const thumbnailImagePath = path.join(
            __dirname,
            "uploads/thumbnail",
            thumbnailFileName
        );

        console.log("Original Image:", req.file);

        // Resize and save thumbnail asynchronously
        await sharp(originalImgBuffer)
            .resize({ width: 300, height: 300 })
            .toBuffer()
            .then(async (thumbnailBuffer) => {
                await writeFileAsync(thumbnailImagePath, thumbnailBuffer);
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send("Error creating thumbnail");
            });

        const newPost = new Post({
            title,
            img: req.file.filename,
            description,
            creator: user,
            likes,
            views,
            date,
            desc,
        });

        await newPost.save();

        res.status(200).send({ message: "Post created" });
    } catch (err) {
        res.status(500).send({
            Error: "An internal server error has occurred...",
        });
        console.error(err);
    }
});
//Get All Posts

router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//Get A Post By Id

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

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/like", auth, async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        res.send("Updated");
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put("/view", auth, async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );
        res.send("Updated");
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
