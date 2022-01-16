var express = require('express');
var router = express.Router();

const orderApiController = require('./admin.order.controller.api');

router.get('/', orderApiController.orderList);

module.exports = router;