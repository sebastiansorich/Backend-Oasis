// index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelize'); 
const home = require('../src/pages/Homepage.controllers');
const routes = require('./indexRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite que el servidor acepte JSON

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', home.HomePage);

// Rutas
app.use('/', routes);

// Sincronizar la base de datos e iniciar el servidor
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });
