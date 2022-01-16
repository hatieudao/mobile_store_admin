const userService = require('../../../services/admin.user.service');

exports.normalUserList = async (req, res) => {

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

    res.json({normalUsers, pagination});

}