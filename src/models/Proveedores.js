const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Proveedor = sequelize.define('Proveedor', {
  id_Proveedor: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  pais: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Proveedores',
  timestamps: false
});

module.exports = Proveedor;
