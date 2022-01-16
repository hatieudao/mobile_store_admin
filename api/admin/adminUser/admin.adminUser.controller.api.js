const userService = require('../../../services/admin.user.service');
const productService = require("../../../services/admin.product.service");
const configurationService = require("../../../services/admin.configuration.service");
const optionService = require("../../../services/admin.option.service");
const pictureService = require("../../../services/admin.picture.service");
const fs = require("fs");

exports.adminUserList = async (req, res) => {

    const data = req.query;

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    const filter = {
        adminId: data.adminId,
        adminUserName: data.adminUserName,
        adminName: data.adminName,
        adminPhoneNumber: data.adminPhoneNumber,
        status: ((data.status) === '0') ? undefined : data.status,
        minCreatedDate: data.minCreatedDate,
        maxCreatedDate: data.maxCreatedDate,
    }

    // await userService.foo();

    const allAdminUser = await userService.adminUserList(page,limit, filter, true);

    //products
    const adminUsers = allAdminUser.rows;
    //Số lượng các products
    const count = allAdminUser.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.json({adminUsers, pagination});
}

exports.checkPassword = async (req, res) =>{

    const currentAdminUser = req.user;
    const id = parseInt(currentAdminUser.id);
    console.log('id = ', id);

    const oldPassword =  req.body.oldPassword;

    const isCorrectPassword = await userService.isCorrectPassword(id, oldPassword);
    res.status(200).json({isCorrectPassword});

}

exports.getAdminPhoneNumbers = async (req, res) => {
    const phoneNumbers = await userService.getAdminPhoneNumbers();
    res.status(200).json({phoneNumbers});
}