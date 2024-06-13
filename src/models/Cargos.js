// src/models/Cargos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Cargo = sequelize.define('Cargo', {
  id_cargo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Cargos',
  timestamps: false  // Desactiva createdAt y updatedAt
});

module.exports = Cargo;
