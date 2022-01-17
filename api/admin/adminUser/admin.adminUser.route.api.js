var express = require('express');
var router = express.Router();

const adminUserApiController = require('./admin.adminUser.controller.api');

router.get('/', adminUserApiController.adminUserList);
router.post('/checkPassword', adminUserApiController.checkPassword);
router.get('/adminUserUniqueInfor', adminUserApiController.getAdminUserUniqueInfor);
router.get('/phoneNumber', adminUserApiController.getAdminPhoneNumbers);

module.exports = router;