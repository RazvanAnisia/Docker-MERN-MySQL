const Sequelize = require('sequelize').Sequelize;
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: 'mysql-db',
  logging: false
});

module.exports = sequelize;