const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        required: true,
    },
    views: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel;