var express = require('express');
var router = express.Router();

const productApiController = require('./admin.product.controller.api');

router.get('/', productApiController.productList);
router.get('/brand', productApiController.brandList);
router.get('/productName', productApiController.productNameList);

module.exports = router;