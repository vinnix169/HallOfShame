const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const session = require("express-session");

router.use(
  session({
    secret: "Asdman169",
    resave: "false",
    saveUninitialized: true,
  })
);



router.get("/get", (req, res) => {
  if (req.session.username) {
      res.json({valid: true, username: req.session.username})
  } else {
    res.json({valid: false, username: "none"})
  }
});

router.get("/profile", async (req, res) => {
  if (req.session.user) {
    await res.send(`Welcome, ${req.session.user.username}!`);
  } else {
    await res.status(401).send("Unauthorized");
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email: email, password: password });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.session.user = {
      username: user.username,
      isAdmin: user.isAdmin,
    };

    res.json(
      req.session.user
    );

    console.log(user.email);
  } catch (err) {
    res.send(res.status(500));
    console.error(err);
  }
});

router.put("/", (req, res) => {
  res.send({ data: "Post put" });
});

router.delete("/", (req, res) => {
  res.send({ data: "Post delete" });
});

module.exports = router;
