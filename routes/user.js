const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const mailController = require('../controllers/mail.controller');

router.get('/create',authMiddleware.checkLogin, userController.viewCreateUser);
router.post('/create',validate.validateUserData,mailController.send,userController.create);
router.get('/login',authMiddleware.checkLogin, userController.viewLoginUser)
router.post('/login', userController.login)
router.get("/logout", userController.logout)
router.get('/confirmEmail',authMiddleware.checkLogin, mailController.viewVerifyCode)
router.post('/confirmEmail', mailController.verifyCode)

module.exports = router;
