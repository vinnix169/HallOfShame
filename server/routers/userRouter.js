const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const randomString = require("../lib/randomStringGen");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Define the destination folder for storing the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, +Date.now() + file.originalname);
        console.log(file); // Use the original file name as the name for the stored file
    },
});

const upload = multer({ storage: storage });

//Register user
router.post("/register", upload.single("avatar"), async (req, res) => {
    try {
        const { username, email, password, passwordAgain } = req.body;
        let avatar = req.file;

        //Validating user data

        if (!email || !password || !passwordAgain || !username) {
            return res.status(400).json({ Error: "Fill all requires fields!" });
        }

        if (password.length < 8 && password) {
            return res
                .status(400)
                .json({ Error: "Password must be at least 8 characters!" });
        }

        if (password !== passwordAgain) {
            return res.status(400).json({ Error: "Passwords must match!" });
        }

        if (username.length > 16) {
            return res.status(400).json({
                Error: "Username cannot be longer then 32 characters",
            });
        }

        const usersEmail = await User.findOne({ email });

        if (usersEmail) {
            return res.status(400).json({ Error: "Email already taken!" });
        }
        /*
        if (!avatar) {
            avatar = "default-avatar.jpg";
        }
*/
        //Creating username tag

        const usersUsername = await User.findOne({ username });
        let userTag = "0000";

        if (usersUsername) {
            const usersTag = await User.find({ userTag });
            userTag = randomString.makeTag(4, usersTag);
        }

        //Hashing password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //Saving user to database

        const newUser = new User({
            email,
            username,
            userTag,
            password: passwordHash,
            avatar: req.file.filename,
            about: "",
        });

        await newUser.save();

        //Set token for user

        const token = jwt.sign(
            {
                user: newUser._id,
            },
            process.env.JWT_SECRET
        );

        //Set token for cookie

        res.cookie("token", token, {
            httpOnly: true,
        }).send();
    } catch (err) {
        res.status(500).send({
            Error: "An internal server error has occured...",
        });
        console.error(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ Error: "Fill all requires fields!" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ Error: "Wrong email or password!" });
        }

        const passwordCompare = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!passwordCompare) {
            return res.status(401).json({ Error: "Unauthorized" });
        }

        //sign in user
        //Set token for user

        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        //Set token for cookie

        res.cookie("token", token, {
            httpOnly: true,
        }).send();
    } catch (err) {
        res.status(500).send({
            Error: "An internal server error has occured...",
        });
        console.error(err);
    }
});

//Logout user
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.send({ Message: "Logged out..." });
});

router.get("/", async (req, res) => {
    const allUser = await User.find();
    res.json(allUser);
});

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    } catch (err) {
        res.json(false);
    }
});

router.get("/loggedInUser", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (token) {
            const id = jwt.decode(token);
            const user = await User.findById(id.user);
            return res.send(user);
        }

        res.send({ message: "no user logged in" });
    } catch (err) {
        res.json(err);
    }
});

router.post("/creatorName", async (req, res) => {
    try {
        const { username } = await User.findById(req.body);
        res.send(username);
    } catch (err) {}
});

router.get("/:id", auth, async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.findById(req.params.id);

        const userDTO = {
            id: user.id,
            userTag: user.userTag,
            username: user.username,
            avatar: user.avatar,
            about: user.about,
        };

        res.status(200).send(userDTO);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
