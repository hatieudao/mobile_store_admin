var DataTypes = require("sequelize").DataTypes;
var _brands = require("./brands");
var _capacities = require("./capacities");
var _cart = require("./cart");
var _cart_details = require("./cart_details");
var _comments = require("./comments");
var _configurations = require("./configurations");
var _mobiles = require("./mobiles");
var _options = require("./options");
var _order_details = require("./order_details");
var _orders = require("./orders");
var _pictures = require("./pictures");
var _specifications = require("./specifications");
var _users = require("./users");

function initModels(sequelize) {
  var brands = _brands(sequelize, DataTypes);
  var capacities = _capacities(sequelize, DataTypes);
  var cart = _cart(sequelize, DataTypes);
  var cart_details = _cart_details(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var configurations = _configurations(sequelize, DataTypes);
  var mobiles = _mobiles(sequelize, DataTypes);
  var options = _options(sequelize, DataTypes);
  var order_details = _order_details(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var pictures = _pictures(sequelize, DataTypes);
  var specifications = _specifications(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  mobiles.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(mobiles, { as: "mobiles", foreignKey: "brand_id"});
  options.belongsTo(capacities, { as: "capacity", foreignKey: "capacity_id"});
  capacities.hasMany(options, { as: "options", foreignKey: "capacity_id"});
  cart_details.belongsTo(cart, { as: "cart", foreignKey: "cart_id"});
  cart.hasMany(cart_details, { as: "cart_details", foreignKey: "cart_id"});
  comments.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(comments, { as: "comments", foreignKey: "mobile_id"});
  configurations.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(configurations, { as: "configurations", foreignKey: "mobile_id"});
  options.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(options, { as: "options", foreignKey: "mobile_id"});
  pictures.belongsTo(mobiles, { as: "mobile", foreignKey: "mobile_id"});
  mobiles.hasMany(pictures, { as: "pictures", foreignKey: "mobile_id"});
  order_details.belongsTo(options, { as: "option", foreignKey: "option_id"});
  options.hasMany(order_details, { as: "order_details", foreignKey: "option_id"});
  order_details.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_details, { as: "order_details", foreignKey: "order_id"});
  configurations.belongsTo(specifications, { as: "specification", foreignKey: "specification_id"});
  specifications.hasMany(configurations, { as: "configurations", foreignKey: "specification_id"});
  cart.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cart, { as: "carts", foreignKey: "user_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    brands,
    capacities,
    cart,
    cart_details,
    comments,
    configurations,
    mobiles,
    options,
    order_details,
    orders,
    pictures,
    specifications,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
