const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Proveedor = require('./Proveedores'); // Asegúrate de que el nombre del archivo sea correcto

const Producto = sequelize.define('Productos', {
  id_Producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock_minimo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  stock_actual: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedor,
      key: 'id_Proveedor'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'Productos',
  timestamps: false
});

Producto.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

module.exports = Producto;
