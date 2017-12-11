const express           = require('express');
const router            = express.Router();
const mongoose          = require('mongoose');
const passport          = require('passport');
const passportConfig    = require('../config/passport');
const Users             = require('../models/user');
const Posts             = require('../models/post');

let users               = new Users();
let posts               = new Posts.Posts();

router.route('/profile')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        Users.findOne({email: req.user.email}, function(err, user) {
            if (err) throw err;
            if (!user) return '';
            var renderProfile = new Promise((resolve, reject) => {
                userInfo = {
                    username: user.username,
                    email: user.email,
                    profilePicPath: user.profilePicPath,
                    bio: user.bio                    
                };
                resolve();
            });
            renderProfile.then(() => {
                res.render('./admin/profile', {user: GLOBAL.userInfo, menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'], current: 'Profile'});
            }).catch(() => {
                res.render('./admin/profile', {user: '', menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'], current: 'Profile'});
            })
        });
        
    })

router.route('/edit-profile')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        res.render('./admin/edit-profile', {user: GLOBAL.userInfo, menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'], current: 'Profile'});
    })
    .post(passportConfig.isAuthenticated, (req, res, next) => {

    })

router.route('/add-post')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        res.render('./admin/add-post', {user: GLOBAL.userInfo, menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'], current: 'Profile'});
    })

router.route('/my-posts')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        Users.findOne({email: req.user.email}, function(err, user) {
            Posts.find({author: user.email}, function(err, _post) {
                if (err) throw err;
                if (!_post) return '';
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
                    GLOBAL.userPosts.push(user_posts);
                };
            });
        });
        
        res.render('./admin/my-posts', {posts: GLOBAL.userPosts});
    })

router.route('/delete-post')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        res.render('./admin/delete-post', {});
    })

router.route('/edit-post')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        res.render('./admin/edit-post', {});
    })

router.route('/edit-users')
    .get(passportConfig.isAuthenticated, (req, res, next) => {
        res.render('./admin/edit-users', {});
    })  


module.exports = router;