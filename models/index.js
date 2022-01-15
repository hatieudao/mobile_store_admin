const initModels = require('./init-models');
const db = require('../config/database')
module.exports = {
  models: initModels(db),
}
