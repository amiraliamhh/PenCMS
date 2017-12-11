const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    shortDescryption: {
        type: String,
        required: false,
        default: ''   
    },
    content: {
        type: String,
        required: true
    },
    author: {
        // user email is stored
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: 'uncategorized'
    },
    tags: {
        type: Array,
        required: false
    },
    headerImagePath: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    likers: {
        type: Array,
        required: true,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

var CommentsSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    isReplying: {
        type: Boolean,
        required: true,
        default: false
    },
    replyingTo: {
        type: String,
        required: false,
        default: ''
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    likers: {
        type: Array,
        required: true,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

exports.Posts    = mongoose.model('Posts', PostSchema);
exports.Comments = mongoose.model('Comments', CommentsSchema);