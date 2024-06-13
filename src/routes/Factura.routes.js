const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/Factura.controller');

router.post('/', facturaController.createFactura);
router.get('/', facturaController.getAllFacturas);
router.delete('/:id', facturaController.deleteFactura)

module.exports = router;