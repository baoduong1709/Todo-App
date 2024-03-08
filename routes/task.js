var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkLogin')
var viewListTask = require('../controllers/tasks/viewListTask')
var createTask = require('../controllers/tasks/createTask')
var updateTask = require('../controllers/tasks/updateTask')

router.post('/create',checkLogin.check, createTask.create);
router.get('/view', checkLogin.check, viewListTask.view)
router.post('/update/status/:id', checkLogin.check, updateTask.updateTaskStatus);
router.put('/update/:id',checkLogin.check, updateTask.update);
module.exports = router;