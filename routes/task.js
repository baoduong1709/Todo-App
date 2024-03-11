var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkLogin')
var viewListTask = require('../controllers/tasks/viewListTask')
var createTask = require('../controllers/tasks/createTask')
var updateTask = require('../controllers/tasks/updateTask')
var deleteTask = require("../controllers/tasks/deleteTask");
var searchTask = require('../controllers/tasks/searchTask')

router.post('/create',checkLogin.check, createTask.create);
router.get('/view', checkLogin.check, viewListTask.view)
router.post('/update/status/:id', checkLogin.check, updateTask.updateTaskStatus);
router.put('/update/:id', checkLogin.check, updateTask.update);
router.delete('/delete/:id', checkLogin.check, deleteTask.delete);
router.get('/view/search',searchTask.search)
module.exports = router;