const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Cliente = require('./Clientes');
const Trabajador = require('./Trabajadores');
const DetalleNotaEntrega = require('./DetallesNotasEntrega');

const NotaEntrega = sequelize.define('NotaEntrega', {
  id_nota_entrega: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_trabajador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Trabajadores', // Asegúrate de usar el nombre en singular del modelo
      key: 'id_trabajador'
    }
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clientes', // Asegúrate de usar el nombre en singular del modelo
      key: 'id_cliente'
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
  tableName: 'NotasEntrega',
  timestamps: false
});

NotaEntrega.hasMany(DetalleNotaEntrega, { foreignKey: 'id_nota_entrega' });

module.exports = NotaEntrega;
