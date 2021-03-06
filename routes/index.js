const express           = require('express');
const router            = express.Router();
const passport          = require('passport');
const passportConfig    = require('../config/passport');
const mongoose          = require('mongoose');
const Posts             = require('../models/post')
const Users             = require('../models/user');

let posts               = new Posts.Posts();
let comments            = new Posts.Comments();
let users               = new Users();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    Users.findOne({email: req.user.email}, function(err, user) {
      res.render('index', { user: user, menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'],current: 'Home' });
    });
  } else {
    res.render('index', { user: '', menu: ['Home', 'Tutorials', 'Sign Up', 'Login'],links: ['/', '/tutorials', '/signup', '/login'] ,current: 'Home'});
  }
});

router.route('/login')
  .get((req, res, next) => {
    res.render('login', { user: '', menu: ['Home', 'Tutorials', 'Posts','Sign Up', 'Login'],links: ['/', '/tutorials', '/posts','/signup', '/login'] ,current: 'Login'});
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/admin/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res, next) => {
    res.render('signup', { user: '', menu: ['Home', 'Tutorials', 'Posts', 'Sign Up', 'Login'],links: ['/', '/tutorials', '/posts','/signup', '/login'] ,current: 'Sign Up'});
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
    if (req.user) {
      res.render('posts', {user: GLOBAL.userInfo, menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'], current: 'Posts'});
    } else {
      res.render('posts', { user: '', menu: ['Home', 'Tutorials', 'Posts', 'Sign Up', 'Login'],links: ['/', '/tutorials', '/posts','/signup', '/login'] ,current: 'Posts'});
    }
    
  })

router.route('/tutorials')
  .get((req, res, next) => {
    if (req.user) {
      res.render('tutorials', {user: GLOBAL.userInfo, menu: ['Home', 'Tutorials', 'Posts', 'Profile'], links: ['/', '/tutorials', '/posts', '/admin/profile'], current: 'Tutorials'});
    } else {
      res.render('tutorials', { user: '', menu: ['Home', 'Tutorials', 'Posts', 'Sign Up', 'Login'],links: ['/', '/tutorials', '/posts','/signup', '/login'] ,current: 'Tutorials'});
    }    
  })

module.exports = router;
