var express = require('express');
var router = express.Router();

const orderRouter = require('./order.route');
const productRouter = require('./product.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const adminUserRouter = require('./adminUser.route');
const statisticalRouter = require('./statistical.route');
const apiRouter = require('./api.route');

const authController = require('../controllers/admin.auth.controller');
const dashboardController = require('../controllers/admin.dashboard.controller');


/* GET home page. */
router.get('/', authController.isLogin, dashboardController.getDashboardPage);

// router.get('/', function (req, res, next) {
//   res.render('admin/index', { title: 'Dashboard', layout: 'admin/layout.hbs' });
// });


router.use('/auth', authRouter);
router.use('/order', authController.isLogin, orderRouter);
router.use('/user', authController.isLogin, userRouter);
router.use('/product', authController.isLogin, productRouter);
router.use('/adminUser', authController.isLogin, adminUserRouter);
router.use('/statistical', authController.isLogin, statisticalRouter);
router.use('/api', authController.isLogin, apiRouter);


module.exports = router;
