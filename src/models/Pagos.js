const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const NotaEntrega = require('./NotasEntrega');

const Pago = sequelize.define('Pago', {
  id_pago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  codigo_nota_entrega: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: NotaEntrega,
      key: 'id_nota_entrega'
    }
  },
  monto_pagado: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  fecha_pago: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Pagos',
  timestamps: false
});

module.exports = Pago;
