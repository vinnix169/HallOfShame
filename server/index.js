const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cp = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

//server setup

// Server setup
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
app.use(cp());
app.use(express.json());

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.status(200).send({ message: "RESPONSE OK" });
});
//Connect to MongoDB

mongoose
    .connect(process.env.MDB_CON, console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

//Routers
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user", require("./routers/userRouter"));
app.use("/post", require("./routers/postRouter"));

app.listen(PORT, () =>
    console.log(`Server started. Listening on port ${PORT}`)
);
