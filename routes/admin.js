const express           = require('express');
const router            = express.Router();
const mongoose          = require('mongoose');
const passport          = require('passport');
const passportConfig    = require('../config/passport');
const Users             = require('../models/user');
const Posts             = require('../models/post');

let users               = new Users();

router.route('/profile')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        res.render('profile', {});
    })

router.route('/add-post')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        res.render('add-post', {});
    })

router.route('/my-posts')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        Users.findOne({email: req.user.email}, function(err, user) {
            Posts.find({author: user.email}, function(err, _post) {
                if (err) throw err;
                if (!_post) return 'fail';
                userPosts = [];
                for (let i = 0; i < _post.length; i++) {
                    var user_posts = {
                        postTitle: _post[i].postsTitle,
                        shortDescryption: _post[i].shortDescryption,
                        content: _post[i].content,
                        category: _post[i].category,
                        tags: _post[i].tags,
                        headerImagePath: _post[i].headerImagePath,
                        likes: _post[i].likes,
                        likers: _post[i].likers,
                        createdAt: post[i].createdAt
                    };
                    userPosts.push(user_posts);
                };
            });
        });
        
        res.render('my-posts', {});
    })

module.exports = router;