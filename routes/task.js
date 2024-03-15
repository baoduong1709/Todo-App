const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/auth')
const validate = require('../middlewares/validate');
const taskController = require('../controllers/task.controller');


router.post('/create',checkLogin.verifyToken,validate.validateTaskData,taskController.create);
router.get('/view', checkLogin.verifyToken, taskController.view)
router.post('/update/status/:id', checkLogin.verifyToken, taskController.updateTaskStatus);
router.put('/update/:id', checkLogin.verifyToken, taskController.update);
router.delete('/delete/:id', checkLogin.verifyToken, taskController.delete);
router.get('/view/search', checkLogin.verifyToken, taskController.search)
module.exports = router;