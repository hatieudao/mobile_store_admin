const { Sequelize } = require('sequelize');

const dbDev = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});
const dbProduct = new Sequelize(process.env.HDB_DATABASE, process.env.HDB_USERNAME, process.env.HDB_PASSWORD, {
  host: process.env.HDB_HOST,
  dialect: 'postgres',
  port: process.env.HDB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = (process.env.NODE_ENV === 'production' ? dbProduct : dbDev)

console.log(`This app lanch in ${process.env.NODE_ENV} environment`)


module.exports = db
