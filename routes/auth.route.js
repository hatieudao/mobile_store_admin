var express = require('express');
var router = express.Router();

const authController = require('../controllers/admin.auth.controller')

const passport = require('../auth/admin/passport');


router.get('/login', authController.loginPage);

router.get('/logout', authController.logout);


router.post('/login',
    passport.authenticate('local'
        , { successRedirect: '/admin',
    failureRedirect: '/admin/auth/login?loginFailed',
    }
    ),
);


module.exports = router;
