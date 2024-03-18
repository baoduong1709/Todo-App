const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/auth')
const validate = require('../middlewares/validate');
const taskController = require('../controllers/task.controller');

router.post('/',checkLogin.verifyToken,validate.validateTaskData,taskController.create);
router.get('/', checkLogin.verifyToken, taskController.view)
router.post('/status/:id', checkLogin.verifyToken, taskController.updateTaskStatus);
router.put('/:id', checkLogin.verifyToken, taskController.update);
router.delete('/:id', checkLogin.verifyToken, taskController.delete);
router.get('/search', checkLogin.verifyToken, taskController.search)

module.exports = router;