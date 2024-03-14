const express = require('express');
const router = express.Router();
const createUser = require('../controllers/users/createUser')
const sendEmail = require('../middlewares/email')
const confirmEmail = require('../controllers/users/confirmEmail')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth')

router.get('/create',authMiddleware.checkLogin, createUser.view);
router.post('/create',sendEmail.send,createUser.create);
router.get('/login',authMiddleware.checkLogin, userController.view)
router.post('/login', userController.login)
router.get("/logout", userController.logout)
router.get('/confirmEmail',authMiddleware.checkLogin, confirmEmail.view)
router.post('/confirmEmail', confirmEmail.verify)

module.exports = router;
