const { models } = require('../models');
const capacityService = require('./admin.capacity.service')
const orderDetailService = require('./admin.orderDetail.service')


exports.getOptionsInforByProductId = (producId) => models.options.findAll({
  where: ({
    mobile_id: producId,
    status: "exist"
  }),
  include: [
    { model: models.capacities, require: true, as: 'capacity' },
  ],
})


exports.getOptionsByIds = async (listIds, raw = false) => {
  return await models.options.findAll({
    where: ({ id: listIds }),
    raw: raw
  }
  )

}

exports.getOptionsIdByProductId = async (producId) => {
  const optionIds = await models.options.findAll({
    where: ({ mobile_id: producId }),
    attributes: ['id'],
  }
  )
  return optionIds.map(function (cur) {
    return cur.id;
  });

}


exports.addOption = async (mobile_id, name, price, capacityName) => {
  const capacity = await capacityService.getCapacityByName(capacityName);
  console.log('capacity: ', capacity);
  const capacityId = capacity.id;
  console.log('capacityId: ', capacityId);

  try {
    const options = await this.createOption(mobile_id, name, price, capacityId);
    return options;
  } catch (error) {
    return false;
  }


}

exports.createOption = async (mobile_id, name, price, capacity_id) => {

  const maxId = await models.options.max('id');
  const nextId = maxId + 1;
  const option = await models.options.create({ id: nextId, mobile_id: mobile_id, name: name, price: price, capacity_id: capacity_id });
  return option;
}


exports.deleteOption = async (id) => {
  const orderDetailIdList = await orderDetailService.getOrderDetailsIdByOptionId(id);
  await orderDetailService.deleteOrderDetailByIds(orderDetailIdList);

}

exports.deleteOptionByIds = async (listIds) => {

  // const orderDetailIdList =  await orderDetailService.getOrderDetailsIdByOptionIds(listIds);
  // console.log('orderDetailIdList: ',orderDetailIdList);
  // await orderDetailService.deleteOrderDetailByIds(orderDetailIdList);

  let options = await this.getOptionsByIds(listIds);

  for (let option of options) {
    await option.update({
      status: "remove"
    })
  }

  // models.options.destroy(
  //     {
  //         where: {
  //             id: listIds
  //         }
  //     }
  // );
}
