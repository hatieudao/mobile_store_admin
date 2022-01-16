

const passport = require("../auth/admin/passport");
exports.isLogin = async (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/admin/auth/login')
    }
}

exports.loginPage = (req, res, next) => {
    res.render('auth/login', { title: `auth`, layout: 'loginLayout.hbs', loginFailed: req.query.loginFailed !== undefined });
}


exports.logout = (req, res, next) => {
    req.logout()
    res.redirect('/admin/auth/login');
}
