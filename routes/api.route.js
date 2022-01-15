var express = require('express');
var router = express.Router();

const productApiRoute = require('../api/admin/product/admin.product.route.api');

router.use('/product', productApiRoute);

module.exports = router;
