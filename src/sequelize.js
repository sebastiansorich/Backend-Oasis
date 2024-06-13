
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('NancyFinal', 'postgres', 'Passw0rd', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432',
});

module.exports = sequelize;
