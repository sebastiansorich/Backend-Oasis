const { Sequelize } = require('sequelize');
require('dotenv').config();
// Configura la conexión a la base de datos utilizando la URL de conexión proporcionada
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // Opción para evitar errores de certificado SSL en entornos de desarrollo
    }
  }
});

module.exports = sequelize;
