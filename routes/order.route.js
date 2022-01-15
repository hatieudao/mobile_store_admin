var express = require('express');
var router = express.Router();


const orderController = require('../controllers/admin.order.controller');

router.get('/', orderController.orderList);

router.get('/:id', orderController.orderItem);

router.get('/:id/changeState', orderController.changeState);


module.exports = router;
