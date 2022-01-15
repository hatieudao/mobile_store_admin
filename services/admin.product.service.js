const { models } = require('../models');

const brandService = require('./admin.brand.service');
const pictureService = require('./admin.picture.service');
const configurationService = require('./admin.configuration.service');
const optionService = require('./admin.option.service');
const commentService = require('./admin.comment.service');

const { Op } = require("sequelize")

exports.productList = async (page, limit, filter, raw = false) => {

  let x = new Date(2021, 10, 20);
  let y = new Date(2021, 11, 20);
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
      // created_at: {
      //     [Op.between]: [filter.minCreatedDate, filter.maxCreatedDate]
      // },
    },
    raw: raw
  }

  if (limit && page) {
    options.offset = (page - 1) * limit;
    options.limit = limit;
  }

  if (filter) {
    if (filter.productId) {
      options.where.id = filter.productId;
    }

    if (filter.productName) {
      options.where.full_name = filter.productName;
    }

    if (filter.brandId) {
      options.where.brand_id = filter.brandId;
    }

    if (filter.brandName) {
      options.include[0].where.name = filter.brandName;
    }

    if (filter.status) {
      options.where.status = filter.status
    }

    if (filter.minRating && filter.maxRating) {
      options.where.rating = {
        [Op.between]: [filter.minRating, filter.maxRating]
      };
    }

    if (filter.minCreatedDate && filter.maxCreatedDate) {
      options.where.created_at = {
        // [Op.between]: [filter.minCreatedDate, filter.maxCreatedDate]
        [Op.gte]: filter.minCreatedDate,
        [Op.lte]: filter.maxCreatedDate
      };
    }

    // if(filter.minUpdatedDate && filter.maxUpdatedDate) {
    //     options.where.updated_at  = {
    //         // [Op.between]: [filter.minUpdatedDate, filter.maxUpdatedDate]
    //         [Op.gte]: filter.minUpdatedDate,
    //         [Op.lte]: filter.maxUpdatedDate
    //     };
    // }


  }


  const result = await models.mobiles.findAndCountAll(options);

  return result;

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
  try {
    const brand = await brandService.getBrandByName(brandName);
    console.log('brand: ', brand);
    const brandId = brand.id;
    console.log('brandId: ', brandId);

    // const createAt = sequelize.literal('CURRENT_TIMESTAMP');
    const createAt = new Date();

    const product = await this.createProduct(fullName, brandId, price, rating, createAt);
    return product;

  } catch (e) {
    return false;
  }



}

exports.createProduct = async (full_name, brand_id, price, rating, created_at) => {

  const maxId = await models.mobiles.max('id');
  const nextId = maxId + 1;
  const product = await models.mobiles.create({ id: nextId, full_name: full_name, brand_id: brand_id, price: price, rating: rating, created_at: created_at });
  return product;
}

exports.updateProduct = async (id, fullName, price, rating, brandName) => {
  const brand = await brandService.getBrandByName(brandName);
  console.log('brand: ', brand);
  const brandId = brand.id;
  console.log('brandId: ', brandId);
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

