const express           = require('express');
const router            = express.Router();
const passport          = require('passport');
const passportConfig    = require('../config/passport');
const mongoose          = require('mongoose');
const Posts             = require('../models/post')
const Users             = require('../models/user');

let posts               = new Posts();
let users               = new Users();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    Users.findOne({email: req.user.email}, function(err, user) {
      res.render('index', { username: user.username, menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'],current: 'Home' });
    });
  } else {
    res.render('index', { username: '', menu: ['Home', 'Tutorials', 'Sign Up', 'Login'],links: ['/', '/tutorials', '/signup', '/login'] ,current: 'Home'});
  }
});

router.route('/login')
  .get((req, res, next) => {
    res.render('login', {});
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/admin/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res, next) => {
    res.render('signup', {});
  })
  .post((req, res, next) => {
    Users.findOne({email: req.body.email}, function(err, user) {
      if (err) throw err;
      if (user) {
        res.render('error', {error: 'existing user'});
      } else {
        let user = new Users();
        user.email  = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function(err) {
          if (err) return next(err);
          req.logIn(user, function(err) {
            if (err) return next(err);
            res.redirect('/');
          });
        });
      }
    });
  });

router.route('/posts')
  .get((req, res, next) => {
    Posts.find({}, function (err, _post) {
      if (err)
        return err;

      if (!_post)
        return console.log('No posts yet!');

      console.log(_post);
    })
    res.render('posts', {});
  })

module.exports = router;
