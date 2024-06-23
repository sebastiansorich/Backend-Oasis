
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('OasisDB', 'postgres', 'Passw0rd', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432',
});

module.exports = sequelize;
