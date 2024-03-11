var express = require('express');
var router = express.Router();
var loginUser = require('../controllers/users/loginUser');
var createUser = require('../controllers/users/createUser')
var sendEmail = require('../middlewares/sendEmail')
var confirmEmail = require('../controllers/users/confirmEmail')


router.get('/create', createUser.view);
router.post('/create',sendEmail.send,createUser.create);
router.get('/login', loginUser.view)
router.post('/login', loginUser.login)
router.get("/logout", loginUser.logout)
router.get('/confirmEmail', confirmEmail.view)
router.post('/confirmEmail', confirmEmail.verify)

module.exports = router;
