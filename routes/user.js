var express = require('express');
var router = express.Router();
var loginUser = require('../controllers/users/loginUser');

/* GET users listing. */
router.get('/login', loginUser.view)
router.post('/login',loginUser.login)

module.exports = router;
