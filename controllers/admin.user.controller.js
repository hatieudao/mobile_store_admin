const userService = require('../services/admin.user.service');
const orderService = require("../services/admin.order.service");

exports.userList = async (req, res) => {

    const data = req.query;

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    const filter = {
        userId: data.userId,
        userFullName: data.userFullName,
        userPhoneNumber: data.userPhoneNumber,
        userUserName: data.userUserName,
        status: ((data.status) === '0') ? undefined : data.status,
        minCreatedDate: data.minCreatedDate,
        maxCreatedDate: data.maxCreatedDate,
    }

    // await userService.foo();

    const allUser = await userService.userList(page,limit, filter, true);

    //products
    const normalUsers = allUser.rows;
    //Số lượng các products
    const count = allUser.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('user/userList', { title: 'user List', layout: 'layout.hbs', normalUsers, pagination, filter });
}


exports.lockAllUser = async (req, res) => {
    const lockALl = req.query.lockAll;

    if(lockALl){
        for (let userId of lockALl)
        {
            await userService.lockUser(userId);
        }
    }

    res.redirect('/admin/user');
}


exports.userAccount = async (req, res) => {

    const id = parseInt(req.params.id);
    console.log('id = ', id);

    const normalUser = await userService.findUserById(id, true);

    res.render('user/userAccount', { title: 'User Account', layout: 'layout.hbs', normalUser});
}


exports.toggleLock = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id = ', id);
    await userService.toggleLockUser(id);
    res.redirect("/admin/user/" + id);
}
