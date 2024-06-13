const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const NIT = sequelize.define('NIT', {
  nit: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  nombre_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'NIT',
  timestamps: false  // Desactiva createdAt y updatedAt
});

module.exports = NIT;
