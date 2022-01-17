var express = require('express');
var router = express.Router();

const adminUserController = require('../controllers/admin.adminUser.controller');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/admins/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

router.get('/',adminUserController.adminUserList);

router.get('/addPage',adminUserController.addAdminUserPage);
router.post('/add',upload.single('avatar'),adminUserController.addAdminUser);
router.get('/lockAll',adminUserController.lockAllAdminUser)
router.get('/currentAccount',adminUserController.adminCurrentAccount);
router.post('/currentAccount/update',upload.single('avatar'),adminUserController.updateAdminCurrentAccount);
router.post('/currentAccount/changePassword',adminUserController.changePassword);
router.get('/:id',adminUserController.adminAccount);
router.get('/:id/toggleLock',adminUserController.toggleLock);

// router.get('/currentAccount', function (req, res, next) {
//     res.render('admin/product', { title: `User ${id}`, layout: 'admin/layout.hbs' });
// });

module.exports = router;
