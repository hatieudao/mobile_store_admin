var express = require('express');
var router = express.Router();

const statisticalApiController = require('./admin.statistical.controller.api');

router.get('/date', statisticalApiController.getDateStatistics);
router.get('/month', statisticalApiController.getMonthStatistics);
router.get('/quarter', statisticalApiController.getQuarterStatistics);
router.get('/year', statisticalApiController.getYearStatistics);

module.exports = router;