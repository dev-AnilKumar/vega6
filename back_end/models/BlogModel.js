const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    comments: [],
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);