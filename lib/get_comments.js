const mongoose    = require('mongoose')
const Comments    = require('../models/post')
const Users       = require('../models/user')  

let Comment       = new Posts.Comments();
let User          = new Users.User();

exports.gc = {    
    getCommentsByUserId(id) {
        Comment.find({'user':id}).exec(function(err, comment) {
            if (err) throw err;
            return comment
        })
    },

    getCommentsByUserEmail(email) {
        User.findOne({'email':email}).exec(function(err, user) {
            if (err) throw err;
            Comment.find({'user':user._id}).exec(function(err, comment) {
                if (err) throw err;
                return comment
            })
        })
    },

    getCommentsByUsername(username) {
        User.findOne({'username':username}).exec(function(err, user) {
            if (err) throw err;
            Comment.find({'user':user._id}).exec(function(err, comment) {
                if (err) throw err;
                return comment
            })
        })
    },

    getCommentsByIsReplying(isReplying) {
        if (isReplying) {
            Comment.find({'isReplying':true}).exec(function(err, comment) {
                if (err) throw err;
                return comment
            })
        } else {
            Comment.find({'isReplying':false}).exec(function(err, comment) {
                if (err) throw err;
                return comment
            })
        }
    },

    getCommentsReplyingToUserId(id) {
        Comment.find({'user':id}).exec(function(err, comment) {
            if (err) throw err;
            return comment
        })
    },

    getCommentsReplyingToUserEmail(email) {
        User.find({'email':email}).exec(function(err, user) {
            if (err) throw err;
            Comment.find({'user':user._id}).exec(function(err, comment) {
                if (err) throw err;
                return comment
            })
        })
    },

    getCommentsReplyingToUsername(username) {
        User.find({'username':username}).exec(function(err, user) {
            if (err) throw err;
            Comment.find({'user':user._id}).exec(function(err, comment) {
                if (err) throw err;
                return comment
            })
        })
    }
}