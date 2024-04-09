const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const multer = require("multer");
const { parse } = require("querystring");

const uploadsDir = path.join(__dirname, "../uploads");
const thumbnailDir = path.join(uploadsDir, "thumbnail");
const imgId = Date.now();

if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "img") {
            // Check if the field is your main image
            cb(null, uploadsDir); // Save to the main 'uploads' folder
        } else {
            cb(null, thumbnailDir); // Save to the 'thumbnail' folder
        }
    },
    filename: function (req, file, cb) {
        // Include imgId in the filename for both the original and the thumbnail
        const filename = imgId + file.originalname;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

//Create New Post

router.post("/", auth, upload.single("img"), async (req, res) => {
    try {
        const { title, description, likes, views, date, desc, tags } = req.body;

        const parsedTags = JSON.parse(tags);

        const user = jwt.decode(req.cookies.token).user;

        const originalImgBuffer = await sharp(req.file.path).toBuffer();

        const originalImgName = req.file.originalname; // No need for path here

        const thumbnailFileName = `thumbnail-${imgId}${originalImgName}`;
        const thumbnailImagePath = path.join(thumbnailDir, thumbnailFileName);

        console.log(thumbnailImagePath);

        // Resize and save thumbnail asynchronously
        await sharp(originalImgBuffer)
            .resize({ width: 300, height: 300 })
            .toBuffer()
            .then(async (thumbnailBuffer) => {
                fs.writeFile(thumbnailImagePath, thumbnailBuffer, (err) => {
                    if (err) {
                        console.error("FileWrite error: " + err);
                    } else {
                        console.log("Thumbnail saved successfully!");
                    }
                });
            })
            .catch((err) => {
                console.error("Saving thumbnail error: " + err);
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
            tags: parsedTags,
        });

        console.log(newPost);

        await newPost.save();

        res.status(200).send({ message: "Post created" });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            Error: "An internal server error has occurred...",
        });
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

router.get("/tags", auth, async (req, res) => {
    try {
        const posts = await Post.find();

        let tags = [];
        posts.forEach((i) => {
            if (i.tags) {
                tags.push(i.tags);
            }
        });

        const uniqueTagsSet = new Set();

        // Minden adatelemen végigmegyünk
        tags.forEach((tag) => {
            // Minden egyes taget hozzáadjuk a Set-hez
            tag.forEach((t) => {
                // Tagek hozzáadása a Set-hez (szükség esetén azonosítóként átalakítva)
                uniqueTagsSet.add(t.toString());
            });
        });

        // A Set átalakítása tömbbé
        const uniqueTagsArray = Array.from(uniqueTagsSet);

        res.json(uniqueTagsArray);
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
