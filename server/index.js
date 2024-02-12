const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Middleware setup
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Routes setup
app.use("/user", require("./routes/UsersRoute"));
app.use("/post", require("./routes/PostsRoute"));

// Connect to MongoDB
mongoose
  .connect(
    process.env.MCD_CON ||
      "mongodb+srv://remibende:Asdman169@hallofshamecluster.ryucxpo.mongodb.net/hallofshamedb"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log("Server started running at port:" + PORT);
});
