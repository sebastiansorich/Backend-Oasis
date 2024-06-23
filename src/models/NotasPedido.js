const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Trabajador = require('./Trabajadores');
const DetalleNotaPedido = require('./DetallesNotaPedido'); // Asegúrate de importar el modelo correcto

const NotaPedido = sequelize.define('NotaPedido', {
  id_nota_pedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_trabajador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trabajador,
      key: 'id_trabajador'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'entregado'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'NotasPedido',
  timestamps: false, // Deshabilitar timestamps para evitar errores relacionados
});

NotaPedido.hasMany(DetalleNotaPedido, { foreignKey: 'id_nota_pedido' });

module.exports = NotaPedido;
