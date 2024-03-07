var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkLogin')
var viewListTask = require('../controllers/tasks/viewListTask')
var createTask = require('../controllers/tasks/createTask')

router.post('/create',checkLogin.check, createTask.create);
router.get('/view', checkLogin.check, viewListTask.view)
module.exports = router;