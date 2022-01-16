const express = require('express');
const router = express.Router();
const picturesApiContrller = require('./picture.controller.api');

router.get('/:id', picturesApiContrller.getImage);
router.get('/mobile/:id', picturesApiContrller.getImageOfMobile);
router.get('/user/:id', picturesApiContrller.getAvatarOfUser);
module.exports = router;
