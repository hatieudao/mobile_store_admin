const orderService = require('../services/admin.order.service');
const orderDetailService = require('../services/admin.orderDetail.service');
const brandService = require("../services/admin.brand.service");
const productService = require("../services/admin.product.service");
const configurationService = require("../services/admin.configuration.service");
const optionService = require("../services/admin.option.service");
const pictureService = require("../services/admin.picture.service");

exports.orderList = async (req, res) => {
  const data = req.query;

  const page = parseInt(data.page) || 1;
  const limit = parseInt(data.limit) || 10;

  //filter
  //Lấy các giá trị filter
  const filter = {
    orderId: data.orderId,
    customerId: data.customerId,
    customerUsername: data.customerUsername,
    customerPhoneNumber: data.customerPhoneNumber,
    state: ((data.state) === '0') ? undefined : data.state,
    minCreatedDate: data.minCreatedDate || new Date(2021, 0, 1),
    maxCreatedDate: data.maxCreatedDate || new Date(),
  }



  const allOrders = await orderService.orderList(page, limit, filter, true);

  const orders = allOrders.rows;

  const count = allOrders.count;


  const pagination = {
    page: page,
    limit: limit,
    totalRows: count
  }

  res.render('order/orderList', { title: 'order List', layout: 'layout.hbs', orders, pagination, filter });
}

exports.orderItem = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('id = ', id);

  const order = await orderService.findOrderInforById(id, true);
  const userId = order.user_id;

  const orderDetailAndCount = await orderDetailService.findOrderDetailInforAndCountAllByOrderId(id, true);
  const orderDetails = orderDetailAndCount.rows;
  const countOrderDetails = orderDetailAndCount.count;


  const countOrderByUserId = await orderService.countOrderByUserId(userId);


  res.render('order/orderItem', { title: `Order ${id}`, layout: 'layout.hbs', order, orderDetails, countOrderDetails, countOrderByUserId });
}


exports.changeState = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('id = ', id);
  const state = req.query.state;

  await orderService.changeState(id, state);

  res.redirect('/admin/order/' + id);



}
