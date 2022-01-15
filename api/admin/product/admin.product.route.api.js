var express = require('express');
var router = express.Router();

const productApiController = require('./admin.product.controller.api');

router.get('/', productApiController.productList);

module.exports = router;