const userService = require('../services/admin.user.service');
const productService = require("../services/admin.product.service");
const configurationService = require("../services/admin.configuration.service");
const optionService = require("../services/admin.option.service");
const pictureService = require("../services/admin.picture.service");
const fs = require("fs");

exports.adminUserList = async (req, res) => {

    const data = req.query;

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    const filter = {
        adminId: data.adminId,
        adminUserName: data.adminUserName,
        adminEmail: data.adminEmail,
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

    res.render('adminUser/adminUserList', { title: 'user List', layout: 'layout.hbs', adminUsers, pagination, filter });
}


exports.addAdminUserPage = (req, res) => {
    res.render('adminUser/adminUserAdd', { title: 'Product', layout: 'layout.hbs' });
}


exports.addAdminUser = async (req, res) => {
    const { username, password, full_name, address, phoneNumber } = req.body;

    const avatarFile = req.file;
    let avatar;

    if (avatarFile) {
        let path = avatarFile.path.replace(/\\/g, "/");
        avatar = path.replace('public', "");
    }


    const addNewAdminUser = await userService.addAdminUser(username, password, full_name, address, avatar, phoneNumber);
    console.log(addNewAdminUser);
    const id = addNewAdminUser.id;
    res.redirect('/admin/adminUser/'+id);
}

exports.adminAccount = async (req, res) => {

    const currentUser = req.user;

    const id = parseInt(req.params.id);
    console.log('id = ', id);

    if(currentUser.id === id){
        res.redirect("/admin/adminUser/currentAccount");
    }
    else
    {
        const adminUser = await userService.findAdminUserById(id, true);
        res.render('adminUser/adminAccount', { title: 'Product', layout: 'layout.hbs', adminUser});
    }

}


exports.adminCurrentAccount = async (req, res) => {

    const currentAdminUser = req.user;
    const id = parseInt(currentAdminUser.id);
    console.log('id = ', id);

    const adminUser = await userService.findAdminUserById(id, true);

    res.render('adminUser/adminCurrentAccount', { title: 'Product', layout: 'layout.hbs', adminUser});
}

exports.lockAllAdminUser = async (req, res) => {
    const lockALl = req.query.lockAll;

    if(lockALl){
        for (let adminUserId of lockALl)
        {
            await userService.lockAdminUser(adminUserId);
        }
    }

    res.redirect('/admin/adminUser');
}

exports.updateAdminCurrentAccount = async (req, res) => {
    const currentAdminUser = req.user;
    const id = parseInt(currentAdminUser.id);
    console.log('id = ', id);
    const {phone_number, address} = req.body;
    const adminUser = await userService.findAdminUserById(id,true);

    const avatarFile = req.file;
    let avatar;

    if (avatarFile) {
        let path = avatarFile.path.replace(/\\/g, "/");
        avatar = path.replace('public', "");
        await removeAvatarPaths(adminUser.avatar)
    }

    await userService.updateAdminUser(id, phone_number, address, avatar);

    if(avatar){
        res.locals.user.avatar = avatar;
    }


    res.redirect('/admin/adminUser/currentAccount');
}

removeAvatarPaths = async function (path){
    try {
        fs.unlinkSync("./public" + path);
    } catch (e) {
        return false;
    }
}


exports.changePassword = async (req, res) => {

    const currentAdminUser = req.user;
    const id = parseInt(currentAdminUser.id);
    console.log('id = ', id);


    const {newPassword} = req.body;

    if(newPassword){
        await userService.changeAdminPassword(id,newPassword);
    }
    res.redirect('/admin/adminUser/currentAccount');
}


exports.toggleLock = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id = ', id);
    await userService.toggleLockUser(id);
    res.redirect("/admin/adminUser/" + id);
}
