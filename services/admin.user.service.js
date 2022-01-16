
const {models} = require('../models');

const uuid = require('uuid');
const bcrypt = require('bcrypt');
const {Op} = require("sequelize");
const brandService = require("./admin.brand.service");



exports.userList = async (page, limit, filter, raw = false) => {
    let options = {
        order: [
            ['id', 'ASC'],
        ],
        where: {
            role: "user",
        },
        raw: raw
    }

    if(limit && page){
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    if(filter){
        if (filter.userId){
            options.where.id = filter.userId.trim();
        }

        if (filter.userFullName){
            options.where.full_name = filter.userFullName.trim();
        }

        if (filter.userPhoneNumber){
            options.where.phone_number = filter.userPhoneNumber.split(" ").join("");
        }
        if (filter.userUserName){
            options.where.username = filter.userUserName.trim();
        }

        if(filter.status){
            options.where.status = filter.status
        }

        //Nếu cả 2 cùng đúng
        if(filter.minCreatedDate && filter.maxCreatedDate ){

            //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
            const maxCreatedDateToday = new Date(filter.maxCreatedDate)
            const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
            maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.between]: [filter.minCreatedDate, maxCreatedDateTomorrow]
            };
        }
        //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
        else{
            if(filter.minCreatedDate){
                options.where.created_at  = {
                    [Op.gte]: filter.minCreatedDate
                };
            }
            if(filter.maxCreatedDate){
                const maxCreatedDateToday = new Date(filter.maxCreatedDate)
                const maxCreatedDateTomorrow = new Date();
                maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

                options.where.created_at  = {
                    [Op.lte]: maxCreatedDateTomorrow
                };
            }
        }
    }


    const result = models.users.findAndCountAll(options);
    return result;
}

exports.lockUser = async (userId) => {
    const user = await this.findUserById(userId);
    user.update({
        status: "lock"
    })
}

exports.unLockUser = async (userId) => {
    const user = await this.findUserById(userId);
    user.update({
        status: "unlock"
    })
}


exports.findNormalUserById = (id, raw = false) => {

    const result = models.users.findOne({
        where: {
            id: id,
            role: "user"
        },
        raw: raw
    });
    return result;
}


exports.findUserById = (id, raw = false) => {

    const result = models.users.findOne({
        where: {
            id: id,
        },
        raw: raw
    });
    return result;
}


exports.adminUserList = async (page, limit, filter, raw = false) => {
    let options = {
        order: [
            ['id', 'ASC'],
        ],
        where: {
            role: "admin",
        },
        raw: raw
    }

    if(limit && page){
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    if(filter){
        if (filter.adminId){
            options.where.id = filter.adminId.trim();
        }

        if (filter.adminName){
            options.where.full_name = filter.adminName.trim();
        }

        if (filter.adminPhoneNumber){
            options.where.phone_number = filter.adminPhoneNumber.split(" ").join("");
        }
        if (filter.adminUserName){
            options.where.username = filter.adminUserName.trim();
        }

        if(filter.status){
            options.where.status = filter.status
        }

        //Nếu cả 2 cùng đúng
        if(filter.minCreatedDate && filter.maxCreatedDate ){

            //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
            const maxCreatedDateToday = new Date(filter.maxCreatedDate)
            const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
            maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.between]: [filter.minCreatedDate, maxCreatedDateTomorrow]
            };
        }
        //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
        else{
            if(filter.minCreatedDate){
                options.where.created_at  = {
                    [Op.gte]: filter.minCreatedDate
                };
            }
            if(filter.maxCreatedDate){
                const maxCreatedDateToday = new Date(filter.maxCreatedDate)
                const maxCreatedDateTomorrow = new Date();
                maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

                options.where.created_at  = {
                    [Op.lte]: maxCreatedDateTomorrow
                };
            }
        }
    }


    const result = models.users.findAndCountAll(options);
    return result;
}

exports.addAdminUser = async (username, password, full_name, address, avatar, phone_number) => {
    const created_at = new Date();
    const maxId = await models.users.max('id');
    const nextId = maxId + 1;

    const uid = uuid.v4();

    const saltRounds = 5;
    const hashPassword = await bcrypt.hash(password,saltRounds);

    try {
        const user = await models.users.create(
            {
                id: nextId,
                username: username,
                password: hashPassword,
                full_name: full_name,
                address: address,
                avatar: avatar,
                uid: uid,
                phone_number: phone_number,
                created_at: created_at,
                role: "admin"
            }
        );
        return user;
    } catch (error) {
        return false;
    }
}

exports.findAdminUserById = (id, raw = false) => {

    const result = models.users.findOne({
        where: {
            id: id,
            role: "admin"
        },
        raw: raw
    });

    return result;

}

exports.findAdminUserByUsername = (username) => {

    const result = models.users.findOne({
        where: {
            username: username,
            role: "admin"
        }
    });
    return result;
}

exports.findUnlockAdminUserByUsername = (username) => {

    const result = models.users.findOne({
        where: {
            username: username,
            role: "admin",
            status: "unlock"
        }
    });
    return result;
}

exports.lockAdminUser = async (adminUserId) => {
    const adminUser = await this.findAdminUserById(adminUserId);
    adminUser.update({
        status: "lock"
    })
}


exports.updateAdminUser = async(id, phone_number, address, avatar) => {

    const admin = await this.findAdminUserById(id);

    admin.update({
        phone_number: phone_number,
        address: address,
        avatar: avatar
    })

    await admin.save();

    return id;
}

exports.changeAdminPassword = async(id, password) => {
    const saltRounds = 5;
    const hashPassword = await bcrypt.hash(password,saltRounds);

    const admin = await this.findAdminUserById(id);

    admin.update({
        password: hashPassword
    })

    await admin.save();
}

exports.isCorrectPassword = async(id, password) => {
    const user = await this.findAdminUserById(id, true);
    return bcrypt.compare(password, user.password);
}

exports.getAdminPhoneNumbers = async () => {
    const adminUsers = await models.users.findAll({
        where: {
            role: "admin"
        },
        raw: true,
        attributes: [
            'phone_number'
        ]
    })

    let phoneNumbers = new Array();
    for (let adminUser of adminUsers){
        const phoneNumber = adminUser.phone_number.split(" ").join("");
        phoneNumbers.push(phoneNumber);
    }
    return phoneNumbers;

}


exports.toggleLockUser = async (id) => {
    const user = await this.findUserById(id, false);
    if(user.status === "unlock"){
        await user.update({
            status: "lock"
        })
    }
    else
    {
        await user.update({
            status: "unlock"
        })
    }
}

exports.countUsersByRole = async (role) => {
    return await models.users.count({
        where: {
            role: role
        }
    })
}