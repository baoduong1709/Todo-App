var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/auth')
var viewListTask = require('../controllers/tasks/viewListTask')
var createTask = require('../controllers/tasks/createTask')
var updateTask = require('../controllers/tasks/updateTask')
var deleteTask = require("../controllers/tasks/deleteTask");
var searchTask = require('../controllers/tasks/searchTask')
var validate = require('../middlewares/validate')

router.post('/create',checkLogin.verifyToken,validate.validateTaskData,createTask.create);
router.get('/view', checkLogin.verifyToken, viewListTask.view)
router.post('/update/status/:id', checkLogin.verifyToken, updateTask.updateTaskStatus);
router.put('/update/:id', checkLogin.verifyToken, updateTask.update);
router.delete('/delete/:id', checkLogin.verifyToken, deleteTask.delete);
router.get('/view/search', checkLogin.verifyToken, searchTask.search)
module.exports = router;