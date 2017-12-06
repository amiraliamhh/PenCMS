const express = require('express');
const router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login', {});
})

router.route('/signup')
  .get((req, res, next) => {
    res.render('signup', {});
  })
  .post((req, res, next) => {
    User.findOne({email: email}, function(err, user) {
      if (err) throw err;
      if (user) {
        res.render('error', {error: 'existing user'});
      } else {
        let user = new User();
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
    res.render('posts', {});
  })

module.exports = router;
