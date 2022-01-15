const { models } = require('../models');

exports.getOrderDetailsIdByOptionId = async (optionId) => {
  const order_detailIds = await models.order_details.findAll({
    where: ({ option_id: optionId }),
    attributes: ['id'],
  }
  )

  return order_detailIds.map(function (cur) {
    return cur.id;
  });

}

exports.getOrderDetailsIdByOptionIds = async (optionIds) => {
  const order_detailIds = await models.order_details.findAll({
    where: ({ option_id: optionIds }),
    attributes: ['id'],
  }
  )

  return order_detailIds.map(function (cur) {
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
      {
        model: models.options, require: true, as: 'option',
        include: [
          { model: models.mobiles, require: true, as: 'mobile' },
          { model: models.capacities, require: true, as: 'capacity' },
        ],
      },
    ],
    where: ({ order_id: orderId }),
    raw: raw
  })
}
