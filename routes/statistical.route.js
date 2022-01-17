var express = require('express');
var router = express.Router();


const statisticalController = require('../controllers/admin.statistical.controller');

router.get('/date',statisticalController.getDateStatisticalPage);
router.get('/week',statisticalController.getWeekStatisticalPage);
router.get('/month',statisticalController.getMonthStatisticalPage);
router.get('/quarter',statisticalController.getQuarterStatisticalPage);
router.get('/year',statisticalController.getYearStatisticalPage);



module.exports = router;
