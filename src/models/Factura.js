const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const NotaEntrega = require('./NotasEntrega');
const NIT = require('./Nits'); // Asumiendo que ya tienes un modelo para NIT

const Factura = sequelize.define('Factura', {
  id_factura: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_nota_entrega: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: NotaEntrega,
      key: 'id_nota_entrega'
    }
  },
  nit_cliente: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: NIT,
      key: 'nit'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  Iva: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 13
  }
}, {
  tableName: 'Facturas',
  timestamps: false
});

module.exports = Factura;
