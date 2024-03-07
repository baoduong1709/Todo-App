var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkLogin')
var viewListTask = require('../controllers/tasks/viewListTask')

router.get('/view', checkLogin.check, viewListTask.view)
module.exports = router;