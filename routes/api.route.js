var express = require('express');
var router = express.Router();

const productApiRoute = require('../api/admin/product/admin.product.route.api');
const pictureApiRoute = require('../api/public/picture.route.api');
router.use('/product', productApiRoute);
router.use('/picture', pictureApiRoute);
module.exports = router;
