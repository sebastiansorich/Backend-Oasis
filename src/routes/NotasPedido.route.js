const express = require('express');
const router = express.Router();
const notaPedidoController = require('../controllers/NotasPedido.controllers');

router.get('/', notaPedidoController.getAllNotasPedido);
router.post('/', notaPedidoController.createNotaPedido);
router.delete('/:id', notaPedidoController.deleteNotaPedido);

module.exports = router;
