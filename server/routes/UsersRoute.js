const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.get("/", (req, res) => {
  res.send({ data: "Post Get" });
});

router.post("/", (req, res) => {
  res.send({ data: "Post post" });
});

router.put("/", (req, res) => {
  res.send({ data: "Post put" });
});

router.delete("/", (req, res) => {
  res.send({ data: "Post delete" });
});

module.exports = router;
