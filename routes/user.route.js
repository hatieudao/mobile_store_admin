var express = require('express');
var router = express.Router();

const userController = require('../controllers/admin.user.controller');
const adminUserController = require("../controllers/admin.adminUser.controller");

router.get('/', userController.userList);
router.get('/lockAll', userController.lockAllUser)

router.get('/:id', userController.userAccount);


module.exports = router;
