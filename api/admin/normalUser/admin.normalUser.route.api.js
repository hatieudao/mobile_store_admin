var express = require('express');
var router = express.Router();

const normalUserApiController = require('./admin.normalUser.controller.api');

router.get('/', normalUserApiController.normalUserList);

module.exports = router;