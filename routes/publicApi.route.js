var express = require('express');
var router = express.Router();

const pictureApiRoute = require('../api/public/picture.route.api');

router.use('/picture', pictureApiRoute);

module.exports = router;
