// DetallesNotasEntrega.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const DetalleNotaEntrega = sequelize.define('DetallesNotasEntrega', {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_nota_entrega: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'NotasEntrega',
      key: 'id_nota_entrega',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Productos',
      key: 'id_Producto',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_venta: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = DetalleNotaEntrega;
