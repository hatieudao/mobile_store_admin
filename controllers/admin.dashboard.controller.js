const productService = require('../services/admin.product.service');
const pictureService = require("../services/admin.picture.service");
const orderService = require("../services/admin.order.service");
const userService = require("../services/admin.user.service");

exports.getDashboardPage = async (req, res) => {

    const limit = 10;
    const topProducts = await productService.getTopProduct(limit);

    for (let product of topProducts) {
        const id = product['option.mobile.id'];
        const picture = await pictureService.getAvatarPictureByProductId(id);
        product.picture = picture;
    }

    const countProducts = await productService.countProduct() || 0;
    const countWaitingOrders = await orderService.countOrdersByState('waiting to confirm') || 0;
    const countNormalUsers = await userService.countUsersByRole('user') || 0;
    const turnoverMonth = await productService.getTurnoverMonth() || 0;

    // res.render('index', { title: 'Dashboard', layout: 'layout.hbs',
    //     topProducts,
    //     countProducts,
    //     countWaitingOrders,
    //     countNormalUsers,
    //     turnoverMonth
    // });
    res.redirect("/admin/statistical/date")
}