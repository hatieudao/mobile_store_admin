const { models } = require('../models');

const sequelize = require("sequelize")

exports.getOrderDetailsIdByOptionId = async (optionId) => {
    const order_detailIds = await models.order_details.findAll({
            where: ({option_id: optionId}),
            attributes: ['id'],
        }
    )

    return order_detailIds.map(function (cur){
        return cur.id;
    });

}

exports.getOrderDetailsIdByOptionIds = async (optionIds) => {
    const order_detailIds = await models.order_details.findAll({
            where: ({option_id: optionIds}),
            attributes: ['id'],
        }
    )

    return order_detailIds.map(function (cur){
        return cur.id;
    });

}

exports.deleteOrderDetailByIds = async (listIds) => {
    models.order_details.destroy(
        {
            where: {
                id: listIds
            }
        }
    );
}

exports.findOrderDetailInforAndCountAllByOrderId = async (orderId, raw = false) => {
    return models.order_details.findAndCountAll({
        include: [
            { model: models.options, require: true, as: 'option',
                include: [
                    { model: models.mobiles, require: true, as: 'mobile'},
                    { model: models.capacities, require: true, as: 'capacity' },
                ],
            },
        ],
        where: ({ order_id: orderId }),
        raw: raw
    })
}



exports.getTotalMoneyByOrderId = async (orderId) => {
    // const orderDetails = models.order_details.findAll({
    //     where: {
    //         order_id: orderId
    //     }
    //     raw: true,
    // })

    try{
        // const totalMoney = await models.order_details.findAll({
        //     as: 'order_detail',
        //     attributes: [
        //         [sequelize.fn('sum', sequelize.col('option.price')), 'total_money'],
        //     ],
        //     include: [
        //         {
        //             model: models.options, as: 'option',
        //             attributes: [
        //                 'price'
        //             ]
        //         }
        //     ],
        //     where: {
        //         order_id: orderId
        //     },
        //     group: ['order_detail.order_id'],
        // })

        // const totalMoney = await models.order_details.sum('id',{
        //     // as: 'order_detail',
        //     // attributes: [
        //     //     [sequelize.fn('sum', sequelize.col('option.price')), 'total_money'],
        //     // ],
        //     include: [
        //         {
        //             model: models.options, as: 'option',
        //             attributes: [
        //                 'price'
        //             ]
        //         }
        //     ],
        //     where: {
        //         order_id: orderId
        //     },
        // })

        const orderDetails = await models.order_details.findAll({
            attributes: [
                'id', 'order_id'
            ],
            where: {
                order_id: orderId
            },
            include: [
                    {
                        model: models.options, as: 'option', require: false,
                        attributes: [
                            'price'
                        ]
                    }
                ],
            raw: true,
        });

        const totalMoney = orderDetails.reduce(function (total, orderDetail) {
            return total + parseInt(orderDetail['option.price']);
        }, 0);
        return totalMoney || 0;
    }catch (e) {
        console.log(e);
    }

}

// exports.getAllMoneyByUserId = async (userId) => {
//     try{
//         const orderDetails = await models.order_details.findAll({
//             attributes: [
//                 'id', 'user_id'
//             ],
//             where: {
//                 user_id: userId
//             },
//             include: [
//                 {
//                     model: models.options, as: 'option', require: false,
//                     attributes: [
//                         'price'
//                     ]
//                 }
//             ],
//             raw: true,
//         });
//
//         const totalMoney = orderDetails.reduce(function (total, orderDetail) {
//             return total + parseInt(orderDetail['option.price']);
//         }, 0);
//         return totalMoney || 0;
//     }catch (e) {
//         console.log(e);
//     }
// }