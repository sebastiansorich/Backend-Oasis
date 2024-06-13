// src/models/Trabajadores.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Cargo = require('./Cargos'); // Importa el modelo Cargo para establecer la relación

const Trabajador = sequelize.define('Trabajadores', {
  id_trabajador: {
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
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_cargo: {
    type: DataTypes.INTEGER,
    references: {
      model: Cargo,
      key: 'id_cargo'
    },
    allowNull: false
  }
}, {
  tableName: 'Trabajadores',
  timestamps: false  // Desactiva createdAt y updatedAt
});



module.exports = Trabajador;
