var express = require('express');
var router = express.Router();

const productApiRoute = require('../api/admin/product/admin.product.route.api');
const orderApiRoute = require('../api/admin/order/admin.order.route.api');
const normalUserApiRoute = require('../api/admin/normalUser/admin.normalUser.route.api');
const adminUserApiRoute = require('../api/admin/adminUser/admin.adminUser.route.api');
const statisticalApiRoute = require('../api/admin/statistical/admin.statistical.route.api');

router.use('/product', productApiRoute);
router.use('/order', orderApiRoute);
router.use('/normalUser', normalUserApiRoute);
router.use('/adminUser', adminUserApiRoute);
router.use('/statistical', statisticalApiRoute);


module.exports = router;