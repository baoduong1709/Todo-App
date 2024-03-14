var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth')

/* GET home page. */
router.get('/',authMiddleware.checkLogin, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
