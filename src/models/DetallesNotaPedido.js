// DetallesNotasEntrega.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const NotaPedido = require('./NotasPedido'); // 
const DetalleNotaPedido = sequelize.define('DetallesNotasPedido', {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_nota_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'NotasPedido',
      key: 'id_nota_pedido',
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
    allowNull: true,
  },

}, {
  tableName: 'DetallesNotasPedidos', // Asegurar que el nombre de la tabla coincida con tu base de datos
  ttimestamps: true, // Deshabilitar timestamps para evitar errores relacionados
  
});



module.exports = DetalleNotaPedido;
