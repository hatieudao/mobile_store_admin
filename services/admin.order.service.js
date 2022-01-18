
const {models} = require('../models');
const {Op, where} = require("sequelize");

exports.orderList = async (page, limit, filter, raw = false) => {

    let options = {
        include:
            [
                {
                    model: models.users,
                    as: "user",
                    where: {

                    }
                },
            ],
        order: [
            ['id', 'ASC'],
        ],
        where: {

        },
        raw: raw
    }

    if(limit && page){
        options.offset = (page - 1) * limit;
        options.limit = limit;
    }

    if(filter){
        if (filter.orderId){
            options.where.id = filter.orderId;
        }

        if (filter.customerId){
            options.where.user_id = filter.customerId;
        }


        if (filter.customerUsername){
            options.include[0].where.username = filter.customerUsername;
        }

        if (filter.phone){
            options.where.phone = filter.phone;
        }

        if(filter.state){
            options.where.state = filter.state
        }

        if(filter.minCreatedDate && filter.maxCreatedDate) {
            options.where.created_at = {
                // [Op.between]: [filter.minCreatedDate, filter.maxCreatedDate]
                [Op.gte]: filter.minCreatedDate,
                [Op.lte]: filter.maxCreatedDate
            };
        }

    }


    const result = await models.orders.findAndCountAll(options);

    return result;

}

exports.countOrdersByState = async (state) => {
    return models.orders.count({
        where: {
            state: state
        }
    })
}

exports.findOrderInforById = async (id, raw = false) => {

    const result = await models.orders.findOne({
        include: [
            { model: models.users, require: true, as: 'user' },
        ],
        where: ({ id: id }),
        raw: raw
    });
    return result;
}


exports.findOrderById = async (id, raw = false) => {

    const result = await models.orders.findOne({
        where: ({ id: id }),
        raw: raw
    });

    return result;

}



exports.changeState = async (id, state) => {
    const order = await this.findOrderById(id);
    await order.update({
        state: state
    });
    await order.save();
}


exports.countOrderByUserId = async(userId) => {
    const countOrder = await models.orders.count({
        where: {
            user_id: userId
        },
        include: [
            { model: models.users, require: true, as: 'user' },
        ],

    });
    return countOrder;
}

