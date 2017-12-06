var express = require('express');
var router = express.Router();

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
    
  })

router.route('/posts')
  .get((req, res, next) => {
    res.render('posts', {});
  })

module.exports = router;
