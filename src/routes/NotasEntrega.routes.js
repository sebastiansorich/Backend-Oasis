const express = require('express');
const router = express.Router();
const notaEntregaController = require('../controllers/NotasEntrega.controllers');

router.get('/', notaEntregaController.getAllNotasEntrega);
router.get('/:id', notaEntregaController.getNotaEntregaById);
router.post('/', notaEntregaController.createNotaEntrega);
router.put('/:id', notaEntregaController.updateNotaEntrega);
router.delete('/:id', notaEntregaController.deleteNotaEntrega);

module.exports = router;
