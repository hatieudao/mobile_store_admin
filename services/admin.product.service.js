

const {models} = require('../models');

const brandService = require('./admin.brand.service');
const pictureService = require('./admin.picture.service');
const configurationService = require('./admin.configuration.service');
const optionService = require('./admin.option.service');
const commentService = require('./admin.comment.service');

const { Op } = require("sequelize")
const  sequelize = require("sequelize")

exports.productList = async (page, limit, filter, raw = false) => {


    let options = {
        include:
            [
                {
                    model: models.brands,
                    as: "brand",
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
        if (filter.productId){
            options.where.id = filter.productId;
        }

        if (filter.productName){
            options.where.full_name = filter.productName;
        }

        if (filter.brandId){
            options.where.brand_id = filter.brandId;
        }

        if (filter.brandName){
            options.include[0].where.name = filter.brandName;
        }

        if(filter.status){
            options.where.status = filter.status
        }


        //Nếu cả 2 cùng đúng
        if(filter.minRating && filter.maxRating ){
            options.where.rating  = {
                [Op.between]: [parseFloat(filter.minRating), parseFloat(filter.maxRating)]
            };
        }
        //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
        else{
            if(filter.minRating){
                options.where.rating  = {
                    [Op.gte]: parseFloat(filter.minRating)
                };
            }
            if(filter.maxRating){
                options.where.rating  = {
                    [Op.lte]: parseFloat(filter.maxRating)
                };
            }
        }

        //Nếu cả 2 cùng đúng
        if(filter.minPrice && filter.maxPrice ){
            options.where.price  = {
                [Op.between]: [parseInt(filter.minPrice), parseInt(filter.maxPrice)]
            };
        }
        //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
        else{
            if(filter.minPrice){
                options.where.price  = {
                    [Op.gte]: parseInt(filter.minPrice)
                };
            }
            if(filter.maxPrice){
                options.where.price  = {
                    [Op.lte]: parseInt(filter.maxPrice)
                };
            }
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


        //Nếu cả 2 cùng đúng
        if(filter.minUpdatedDate && filter.maxUpdatedDate ){

            //Vì maxUpdatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
            const maxUpdatedDateToday = new Date(filter.maxUpdatedDate)
            const maxUpdatedDateTomorrow = new Date(maxUpdatedDateToday);
            maxUpdatedDateTomorrow.setDate(maxUpdatedDateToday.getDate()+1);

            options.where.created_at  = {
                [Op.between]: [filter.minUpdatedDate, maxUpdatedDateTomorrow]
            };
        }
        //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
        else{
            if(filter.minUpdatedDate){
                options.where.updated_at  = {
                    [Op.gte]: filter.minUpdatedDate
                };
            }
            if(filter.maxUpdatedDate){
                const maxUpdatedDateToday = new Date(filter.maxUpdatedDate)
                const maxUpdatedDateTomorrow = new Date();
                maxUpdatedDateTomorrow.setDate(maxUpdatedDateToday.getDate()+1);

                options.where.updated_at  = {
                    [Op.lte]: maxUpdatedDateTomorrow
                };
            }
        }


    }


    const result = await models.mobiles.findAndCountAll(options);

    return result;

}

exports.countProduct = async () => {
    return await models.mobiles.count();
}

exports.getAllProductName = async (raw = false) => {
    return await models.mobiles.findAll({
        raw: raw,
        attributes: [
            "full_name"
        ]
    });
}

exports.findProductById = (id, raw = false) => {

    const result = models.mobiles.findOne({
        where: ({ id: id }),
        raw: raw
    });

    return result;

}


exports.findProductInforById = (id, raw = false) => {

    const result = models.mobiles.findOne({
        include: [
            { model: models.brands, require: true, as: 'brand' },
        ],
        where: ({ id: id }),
        raw: raw
    });

    return result;

}

exports.addProduct = async (fullName, price, rating, brandName) => {
    try{
        const brand = await brandService.getBrandByName(brandName);
        console.log('brand: ',brand);
        const brandId = brand.id;
        console.log('brandId: ',brandId);

        // const createAt = sequelize.literal('CURRENT_TIMESTAMP');
        const createAt = new Date();

        const product = await this.createProduct(fullName, brandId, price, rating, createAt);
        return product;

    }catch (e) {
        return false;
    }



}

exports.createProduct = async  (full_name, brand_id, price, rating, created_at) =>  {

    const maxId = await models.mobiles.max('id');
    const nextId = maxId + 1;
    const product = await models.mobiles.create({id: nextId, full_name: full_name, brand_id: brand_id, price: price, rating: rating, created_at: created_at});
    return product;
}

exports.updateProduct = async(id, fullName, price, rating, brandName) => {
    const brand = await brandService.getBrandByName(brandName);
    console.log('brand: ',brand);
    const brandId = brand.id;
    console.log('brandId: ',brandId);
    const updatedAt = new Date();

    const product = await this.findProductById(id);

    product.update({
        full_name: fullName,
        price: price,
        rating: rating,
        brand_id: brandId,
        updated_at: updatedAt
    })

    await product.save();

    return id;
}

exports.deleteProduct = async (id) => {
    // const pictureIdList = await pictureService.getPicturesIdByProductId(id);
    // await pictureService.deletePictureByIds(pictureIdList);
    //
    // const configurationIdList = await configurationService.getConfigurationsIdByProductId(id);
    // await configurationService.deleteConfigurationByIds(configurationIdList);
    //
    // const optionIdList = await optionService.getOptionsIdByProductId(id);
    // await optionService.deleteOptionByIds(optionIdList);
    //
    // const commentIdList = await commentService.getCommentsIdByProductId(id);
    // await commentService.deleteCommentByIds(commentIdList);

    const product = await this.findProductById(id);

    product.update({
        status: "remove"
    })


}

exports.restoreProduct = async (id) => {


    const product = await this.findProductById(id);

    product.update({
        status: "exist"
    })

}

exports.toggleDelete = async (id) => {
    const product = await this.findProductById(id, false);
    if(product.status === "remove"){
        await product.update({
            status: "exist"
        })
    }
    else
    {
        await product.update({
            status: "remove"
        })
    }
}

exports.getTopProduct = async (limit) => {
    try{
        const topProducts = await models.order_details.findAll({

            include: [
                { model: models.options, require: true, as: 'option',
                    include: [
                        {
                            model: models.mobiles, require: true, as: 'mobile',
                            attributes: [
                                'full_name',
                                'price',
                                'rating',
                                'status',
                            ],
                            include: [
                                {
                                    model: models.brands, require: true, as: 'brand',
                                    attributes: [
                                        'name',
                                    ],

                                }
                          ]
                        },

                    ],
                    attributes: [

                    ],
                },
            ],
            limit: limit,
            attributes: [
                [sequelize.fn('count', sequelize.col('order_details.id')), 'countOrderDetail'],
            ],
            order: [
                [sequelize.col('countOrderDetail'), 'DESC'],
            ],
            group: [
                // 'order_details.id',
                'option.mobile.id',
                'option.mobile.brand.id',
                'option.mobile.brand.name',
                'option.mobile.full_name',
                'option.mobile.price',
                'option.mobile.rating',
                'option.mobile.status',
                // 'option.id'
            ],
            raw: true
        })

        return topProducts;
    }catch (e){
        console.log(e);
    }

}

exports.getTurnoverMonth = async () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(),1);


    try{
        const turnoverMonth = await models.order_details.findAll({

            include: [
                { model: models.options, require: true, as: 'option',
                    attributes: [
                        // 'id',
                        // 'price'
                    ],
                },
                { model: models.orders, require: true, as: 'order',
                    attributes: [
                        // 'id',
                        // 'created_at'
                    ],
                    where: {
                        created_at: {
                            [Op.between]: [firstDayOfMonth, tomorrow]
                        }
                    }
                },
            ],
            attributes: [
                // 'order_details.id',
                [sequelize.fn('sum', sequelize.col('option.price')), 'sum'],
            ],
            raw: true,
            // group: [
            //     'order_details.id',
            //     'option.id',
            //     'option.price',
            //     'order.id',
            //     'order.created_at',
            // ]
        })


        // const turnoverMonth = await models.order_details.findAll({
        //
        //     include: [
        //         { model: models.options, require: true, as: 'option',
        //             attributes: [
        //                 'id',
        //                 'price'
        //             ],
        //         },
        //         { model: models.orders, require: true, as: 'order',
        //             attributes: [
        //                 // 'id',
        //                 // 'created_at'
        //             ],
        //             where: {
        //                 created_at: {
        //                     [Op.between]: [firstDayOfMonth, tomorrow]
        //                 }
        //             }
        //         },
        //     ],
        //     attributes: [
        //         // 'order_details.id',
        //         [sequelize.fn('sum', sequelize.col('option.price')), 'sum'],
        //     ],
        //     raw: true,
        //     group: [
        //         'order_details.id',
        //         'option.id',
        //         'option.price',
        //     //     'order.id',
        //     //     'order.created_at',
        //     ]
        // })

        return turnoverMonth[0].sum;
    }catch (e){
        console.log(e);
    }




        //Nếu cả 2 cùng đúng
//         if(filter.minCreatedDate && filter.maxCreatedDate ){
//
//         //Vì maxCreatedDate tính từ đầu ngày, nên ta phải lấy ngày tiếp theo của nó
//         const maxCreatedDateToday = new Date(filter.maxCreatedDate)
//         const maxCreatedDateTomorrow = new Date(maxCreatedDateToday);
//         maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);
//
//         options.where.created_at  = {
//             [Op.between]: [filter.minCreatedDate, maxCreatedDateTomorrow]
//         };
//     }
//     //Ngược lại, 1 trong 2 undefined hoặc cả 2 đều undefined
// else{
//         if(filter.minCreatedDate){
//             options.where.created_at  = {
//                 [Op.gte]: filter.minCreatedDate
//             };
//         }
//         if(filter.maxCreatedDate){
//             const maxCreatedDateToday = new Date(filter.maxCreatedDate)
//             const maxCreatedDateTomorrow = new Date();
//             maxCreatedDateTomorrow.setDate(maxCreatedDateToday.getDate()+1);
//
//             options.where.created_at  = {
//                 [Op.lte]: maxCreatedDateTomorrow
//             };
//         }
//     }

}