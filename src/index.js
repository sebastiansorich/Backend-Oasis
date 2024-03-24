const express = require('express');

const app = express();

const cors = require("cors");

const router = require('./routes/tasks.routes');
const morgan = require('morgan');

// Middleware de registro de solicitudes
app.use(morgan('dev'));

// Middleware para analizar JSON en solicitudes entrantes
app.use(express.json());

// Configuración de las rutas
app.use(router);


//prubando como un cabron






app.use(cors({
    origin: "http://localhost:3000"
}))



const port = 3000;
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
});
