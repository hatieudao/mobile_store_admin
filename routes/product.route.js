var express = require('express');
var router = express.Router();

const productController = require('../controllers/admin.product.controller');

const multer  = require('multer')
// const upload = multer({ dest: './public/uploads/products/'});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/products/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

router.get('/',productController.productList);
router.get('/addPage',productController.addProductPage);
router.post('/add',upload.any('pictures'),productController.addProduct);
router.get('/deleteAll',productController.deleteAllProduct)

router.get('/:id',productController.productItem);

router.post('/:id/update',upload.any('pictures'), productController.updateProduct);
router.get('/:id/delete',productController.deleteProduct);
router.get('/:id/restore',productController.restoreProduct);
router.get('/:id/toggleDelete',productController.toggleDelete);






// router.get('/:add', function (req, res, next) {
//   res.render('admin/product/productAddItem', { title: 'Product', layout: 'admin/layout.hbs' });
// });


module.exports = router;
