const express = require('express');
const router = express.Router();
const notaEntregaController = require('../controllers/NotasEntrega.controllers');

// Primero definir la ruta para obtener todas las notas de entrega pendientes
router.get('/pendientes', notaEntregaController.getAllNotasEntregaPendientes);

// Luego las demás rutas
router.get('/', notaEntregaController.getAllNotasEntrega);
router.get('/:id', notaEntregaController.getNotaEntregaById);
router.post('/', notaEntregaController.createNotaEntrega);
router.put('/:id', notaEntregaController.updateNotaEntrega);
router.delete('/:id', notaEntregaController.deleteNotaEntrega);

module.exports = router;
