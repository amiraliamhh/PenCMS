const mongoose = require('mongoose')
const config   = require('../config/secret')
const Posts    = require('../models/post')

let Post = new Posts.Posts()

exports.gp = {
    getPostByTitle(title) {
        Post.find({'postTitle': title}).exec(function(err, post) {
            if (err) throw err;
            return post
        })
    },

    getPostsByAuthor(author) {
        Post.find({'author': author}).exec(function(err, post) {
            if (err) throw err;
            return post
        })
    },

    getPostsByCategory(cat) {
        Post.find({'category': cat}).exec(function(err, post) {
            if (err) throw err;
            return post
        })
    },

    getPostsByTag(tag) {
        Post.find({'tags': tag}).exec(function(err, post) {
            if (err) throw err;
            return post
        })
    },

    // function* getPostsByTags(tags) {
    //     let postsArray = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         Post.find({'tags': tags[i]}).exec(function(err, post) {
    //             if (err) throw err;
    //             postsArray.push(post)
    //         })
    //     }
    //     return postsArray
    // }

    getPostsByLikes(min, max) {
        if (!min) {
            console.warn('One argument is missed in "getPostsByLikes" function.')
            return false
        }

        if (!max) {
            Post.find({'likes': min}).exec(function(err, post) {
                if (err) throw err;
                return post
            })
        }

        Post.find({'likes': {$gt: min, $lt: max}}).exec(function(err, post) {
            if (err) throw err;
            return post
        })
    }
}