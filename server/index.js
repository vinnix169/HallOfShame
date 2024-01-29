const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoute = require("./routes/UsersRoute");
const postsRoute = require("./routes/PostsRoute");

// Middleware setup
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes setup
app.use("/user", usersRoute);
app.use("/post", postsRoute);

// Connect to MongoDB
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

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server started running at port:" + PORT);
});
