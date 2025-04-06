const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    comment: {
        type: String,
        required: true,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);