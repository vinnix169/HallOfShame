const router = require("express").Router();
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");

//register

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, passwordAgain, displayName } = req.body;

    istValid =
      !email || !username || !password || !passwordAgain ? true : false;

    if (istValid) {
      return res
        .status(400)
        .json({ error: "Please fill all fields that are required" });
    }

    if (password !== passwordAgain) {
      return res.status(400).json({
        error:
          "The two passwords did not match. Please enter the same password!",
      });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Please enter a password at least 8 character long" });
    }

    const alreadyExists = await UserModel.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ error: "The user already exists" });
    }

    const salt = await bcrypt.genSalt();
    const pswHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      displayName,
      pswHash,
      pfp,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
