const {models} = require('../models');

const brandService = require('./admin.brand.service');
const pictureService = require('./admin.picture.service');
const configurationService = require('./admin.configuration.service');
const optionService = require('./admin.option.service');
const commentService = require('./admin.comment.service');

const { Op } = require("sequelize")
const  sequelize = require("sequelize")
//
// exports.getStatisticalDate = async (page, limit, filter, raw = false) => {
//
//     let options = {
//         where: {
//
//         },
//         attributes: [
//             [sequelize.fn('date',  sequelize.col('created_at')), 'created_at_date'],
//             // 'created_at'
//         ],
//         // order: [
//         //     // ['created_at', 'ASC'],
//         // ],
//         group:  sequelize.col('created_at_date'),
//         raw: raw,
//
//     }
//
//
//     // if(limit && page){
//     //     options.offset = (page - 1) * limit;
//     //     options.limit = limit;
//     // }
//
//     // filter.minDate = new Date(2021,2,2);
//     // filter.maxDate = new Date(2021,2,2);
//     //
//     // if(filter.minDate && filter.maxDate){
//     //
//     //     //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
//     //     const maxCreatedDateToday = new Date(filter.maxDate)
//     //     const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
//     //     maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);
//     //     options.where.created_at  = {
//     //         [Op.between]: [filter.minDate, maxCreatedDateTomorrow]
//     //     };
//     // }
//     // //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
//     // else{
//     //     if(filter.minDate){
//     //         options.where.created_at  = {
//     //             [Op.gte]: filter.minDate
//     //         };
//     //     }
//     //     if(filter.maxDate){
//     //         const maxDateToday = new Date(filter.maxDate)
//     //         const maxDateTomorrow = new Date();
//     //         maxDateTomorrow.setDate(maxDateToday.getDate()+1);
//     //
//     //         options.where.created_at  = {
//     //             [Op.lte]: maxDateTomorrow
//     //         };
//     //     }
//     // }
//
//     try{
//         const result = await models.orders.findAll(options);
//         return result;
//     }catch (e) {
//         console.log(e);
//     }
//
// }


exports.getStatisticalDate = async (page, limit, filter, raw = false) => {

    let options = {
        include: [
            { model: models.options, require: true, as: 'option',
                attributes: [
                    // 'id',
                    // 'price'
                ],
                where: {

                }
            },
            { model: models.orders, require: true, as: 'order',
                attributes: [
                    // 'id',
                    // 'created_at'
                ],
                where: {

                }
            },
        ],
        attributes: [
            // [sequelize.fn('date',  sequelize.col('order.created_at')), 'created_at_date'],
            [sequelize.fn('sum',   sequelize.literal('(option.price*order_details.quantity)')), 'total_money'],
            [sequelize.fn('sum',  sequelize.col('order_details.quantity')), 'sumQuantity'],
            [sequelize.fn('count',  sequelize.fn('distinct', sequelize.col('order.id'))), 'count_orders'],
            // 'order_details.id'
            [sequelize.fn('date',  sequelize.col('order.created_at')), 'created_at_date'],
        ],

        group:  sequelize.col('created_at_date'),

        // where: {
        //
        // },
        // attributes: [
        //     // [sequelize.fn('date',  sequelize.col('created_at')), 'created_at_date'],
        //     'created_at'
        // ],
        order: [
            [sequelize.col('created_at_date'), 'ASC'],
        ],
        group:  sequelize.col('created_at_date'),
        raw: raw,


    }


    // filter.minDate = new Date(2021,2,2);
    // filter.maxDate = new Date(2021,2,2);

    if(filter.minDate && filter.maxDate){

        //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
        const maxCreatedDateToday = new Date(filter.maxDate)
        const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
        maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

        //include[1]. là orders
        options.include[1].where.created_at  = {
            [Op.between]: [filter.minDate, maxCreatedDateTomorrow]
        };
    }
    //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
    else{
        if(filter.minDate){
            options.include[1].where.created_at  = {
                [Op.gte]: filter.minDate
            };
        }
        if(filter.maxDate){
            const maxDateToday = new Date(filter.maxDate)
            const maxDateTomorrow = new Date();
            maxDateTomorrow.setDate(maxDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.lte]: maxDateTomorrow
            };
        }
    }

    try{
        // const result = await models.order_details.findAll({
        //
        // });

        const all = await models.order_details.findAll(options);
        const count = all.length;

        if(limit && page){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }

        const rows = await models.order_details.findAll(options)

        return {rows, count};
    }catch (e) {
        console.log(e);
    }

}

exports.getStatisticalWeek = async (page, limit, filter, raw = false) => {

    let options = {
        include: [
            { model: models.options, require: true, as: 'option',
                attributes: [
                    // 'id',
                    // 'price'
                ],
                where: {

                }
            },
            { model: models.orders, require: true, as: 'order',
                attributes: [
                    // 'id',
                    // 'created_at'
                ],
                where: {

                }
            },
        ],
        attributes: [
            // [sequelize.fn('date',  sequelize.col('order.created_at')), 'created_at_date'],
            [sequelize.fn('sum',   sequelize.literal('(option.price*order_details.quantity)')), 'total_money'],
            [sequelize.fn('sum',  sequelize.col('order_details.quantity')), 'sumQuantity'],
            [sequelize.fn('count',   sequelize.fn('distinct', sequelize.col('order.id'))), 'count_orders'],
            // 'order_details.id'
            [sequelize.fn('date_trunc', 'week',  sequelize.col('order.created_at')), 'created_at_week'],
        ],

        group:  sequelize.col('created_at_week'),

        // where: {
        //
        // },
        // attributes: [
        //     // [sequelize.fn('date',  sequelize.col('created_at')), 'created_at_date'],
        //     'created_at'
        // ],
        order: [
            [sequelize.col('created_at_week'), 'ASC'],
        ],
        group:  sequelize.col('created_at_week'),
        raw: raw,


    }


    // filter.minDate = new Date(2021,2,2);
    // filter.maxDate = new Date(2021,2,2);

    if(filter.minDate && filter.maxDate){

        //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
        const maxCreatedDateToday = new Date(filter.maxDate)
        const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
        maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

        //include[1]. là orders
        options.include[1].where.created_at  = {
            [Op.between]: [filter.minDate, maxCreatedDateTomorrow]
        };
    }
    //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
    else{
        if(filter.minDate){
            options.include[1].where.created_at  = {
                [Op.gte]: filter.minDate
            };
        }
        if(filter.maxDate){
            const maxDateToday = new Date(filter.maxDate)
            const maxDateTomorrow = new Date();
            maxDateTomorrow.setDate(maxDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.lte]: maxDateTomorrow
            };
        }
    }

    try{
        // const result = await models.order_details.findAll({
        //
        // });

        const all = await models.order_details.findAll(options);
        const count = all.length;
        // const count = 0;

        if(limit && page){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }

        const rows = await models.order_details.findAll(options)

        return {rows, count};
        // return rows;
    }catch (e) {
        console.log(e);
    }

}


exports.getStatisticalMonth = async (page, limit, filter, raw = false) => {

    let options = {
        include: [
            { model: models.options, require: true, as: 'option',
                attributes: [
                    // 'id',
                    // 'price'
                ],
                where: {

                }
            },
            { model: models.orders, require: true, as: 'order',
                attributes: [
                    // 'id',
                    // 'created_at'
                ],
                where: {

                }
            },
        ],
        attributes: [
            // [sequelize.fn('date',  sequelize.col('order.created_at')), 'created_at_date'],
            [sequelize.fn('sum',   sequelize.literal('(option.price*order_details.quantity)')), 'total_money'],
            [sequelize.fn('sum',  sequelize.col('order_details.quantity')), 'sumQuantity'],
            [sequelize.fn('count',   sequelize.fn('distinct', sequelize.col('order.id'))), 'count_orders'],
            // 'order_details.id'
            [sequelize.fn('date_trunc', 'month',  sequelize.col('order.created_at')), 'created_at_month'],
        ],

        group:  sequelize.col('created_at_month'),

        // where: {
        //
        // },
        // attributes: [
        //     // [sequelize.fn('date',  sequelize.col('created_at')), 'created_at_date'],
        //     'created_at'
        // ],
        order: [
            [sequelize.col('created_at_month'), 'ASC'],
        ],
        group:  sequelize.col('created_at_month'),
        raw: raw,


    }


    // filter.minDate = new Date(2021,2,2);
    // filter.maxDate = new Date(2021,2,2);

    if(filter.minDate && filter.maxDate){

        //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
        const maxCreatedDateToday = new Date(filter.maxDate)
        const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
        maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

        //include[1]. là orders
        options.include[1].where.created_at  = {
            [Op.between]: [filter.minDate, maxCreatedDateTomorrow]
        };
    }
    //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
    else{
        if(filter.minDate){
            options.include[1].where.created_at  = {
                [Op.gte]: filter.minDate
            };
        }
        if(filter.maxDate){
            const maxDateToday = new Date(filter.maxDate)
            const maxDateTomorrow = new Date();
            maxDateTomorrow.setDate(maxDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.lte]: maxDateTomorrow
            };
        }
    }

    try{
        // const result = await models.order_details.findAll({
        //
        // });

        const all = await models.order_details.findAll(options);
        const count = all.length;
        // const count = 0;

        if(limit && page){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }

        const rows = await models.order_details.findAll(options)

        return {rows, count};
        // return rows;
    }catch (e) {
        console.log(e);
    }

}

exports.getStatisticalYear = async (page, limit, filter, raw = false) => {

    let options = {
        include: [
            { model: models.options, require: true, as: 'option',
                attributes: [
                    // 'id',
                    // 'price'
                ],
                where: {

                }
            },
            { model: models.orders, require: true, as: 'order',
                attributes: [
                    // 'id',
                    // 'created_at'
                ],
                where: {

                }
            },
        ],
        attributes: [
            // [sequelize.fn('date',  sequelize.col('order.created_at')), 'created_at_date'],
            [sequelize.fn('sum',   sequelize.literal('(option.price*order_details.quantity)')), 'total_money'],
            [sequelize.fn('sum',  sequelize.col('order_details.quantity')), 'sumQuantity'],
            [sequelize.fn('count',  sequelize.fn('distinct', sequelize.col('order.id'))), 'count_orders'],
            // 'order_details.id'
            [sequelize.fn('date_trunc', 'year',  sequelize.col('order.created_at')), 'created_at_year'],
        ],

        group:  sequelize.col('created_at_year'),

        // where: {
        //
        // },
        // attributes: [
        //     // [sequelize.fn('date',  sequelize.col('created_at')), 'created_at_date'],
        //     'created_at'
        // ],
        order: [
            [sequelize.col('created_at_year'), 'ASC'],
        ],
        group:  sequelize.col('created_at_year'),
        raw: raw,


    }


    // filter.minDate = new Date(2021,2,2);
    // filter.maxDate = new Date(2021,2,2);

    if(filter.minDate && filter.maxDate){

        //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
        const maxCreatedDateToday = new Date(filter.maxDate)
        const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
        maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

        //include[1]. là orders
        options.include[1].where.created_at  = {
            [Op.between]: [filter.minDate, maxCreatedDateTomorrow]
        };
    }
    //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
    else{
        if(filter.minDate){
            options.include[1].where.created_at  = {
                [Op.gte]: filter.minDate
            };
        }
        if(filter.maxDate){
            const maxDateToday = new Date(filter.maxDate)
            const maxDateTomorrow = new Date();
            maxDateTomorrow.setDate(maxDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.lte]: maxDateTomorrow
            };
        }
    }

    try{
        // const result = await models.order_details.findAll({
        //
        // });

        const all = await models.order_details.findAll(options);
        const count = all.length;
        // const count = 0;

        if(limit && page){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }

        const rows = await models.order_details.findAll(options)

        return {rows, count};
        // return rows;
    }catch (e) {
        console.log(e);
    }

}


exports.getStatisticalQuarter = async (page, limit, filter, raw = false) => {

    let options = {
        include: [
            { model: models.options, require: true, as: 'option',
                attributes: [
                    // 'id',
                    // 'price'
                ],
                where: {

                }
            },
            { model: models.orders, require: true, as: 'order',
                attributes: [
                    // 'id',
                    // 'created_at'
                ],
                where: {

                }
            },
        ],
        attributes: [
            // [sequelize.fn('date',  sequelize.col('order.created_at')), 'created_at_date'],
            [sequelize.fn('sum',   sequelize.literal('(option.price*order_details.quantity)')), 'total_money'],
            [sequelize.fn('sum',  sequelize.col('order_details.quantity')), 'sumQuantity'],
            [sequelize.fn('count',   sequelize.fn('distinct', sequelize.col('order.id'))), 'count_orders'],
            // 'order_details.id'
            [sequelize.fn('date_trunc', 'QUARTER',  sequelize.col('order.created_at')), 'created_at_quarter'],
        ],

        group:  sequelize.col('created_at_quarter'),

        // where: {
        //
        // },
        // attributes: [
        //     // [sequelize.fn('date',  sequelize.col('created_at')), 'created_at_date'],
        //     'created_at'
        // ],
        order: [
            [sequelize.col('created_at_quarter'), 'ASC'],
        ],
        group:  sequelize.col('created_at_quarter'),
        raw: raw,


    }


    // filter.minDate = new Date(2021,2,2);
    // filter.maxDate = new Date(2021,2,2);

    if(filter.minDate && filter.maxDate){

        //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
        const maxCreatedDateToday = new Date(filter.maxDate)
        const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
        maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);

        //include[1]. là orders
        options.include[1].where.created_at  = {
            [Op.between]: [filter.minDate, maxCreatedDateTomorrow]
        };
    }
    //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
    else{
        if(filter.minDate){
            options.include[1].where.created_at  = {
                [Op.gte]: filter.minDate
            };
        }
        if(filter.maxDate){
            const maxDateToday = new Date(filter.maxDate)
            const maxDateTomorrow = new Date();
            maxDateTomorrow.setDate(maxDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.lte]: maxDateTomorrow
            };
        }
    }

    try{
        // const result = await models.order_details.findAll({
        //
        // });

        const all = await models.order_details.findAll(options);
        const count = all.length;
        // const count = 0;

        if(limit && page){
            options.offset = (page - 1) * limit;
            options.limit = limit;
        }

        const rows = await models.order_details.findAll(options)

        return {rows, count};
        // return rows;
    }catch (e) {
        console.log(e);
    }

}