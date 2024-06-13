// Importa el módulo necesario de Sequelize
const { DataTypes } = require('sequelize');
// Importa la instancia de Sequelize que has configurado previamente
const sequelize = require('../sequelize');

// Define el modelo Cliente
const Cliente = sequelize.define('Cliente', {
  // Define las columnas de la tabla Cliente
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true // Indica que el valor de esta columna debe ser único
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false // No permite valores nulos
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  // Opciones adicionales del modelo
  tableName: 'Clientes', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva las marcas de tiempo createdAt y updatedAt
});

// Exporta el modelo Cliente para poder usarlo en otros archivos
module.exports = Cliente;
