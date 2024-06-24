const express = require('express');
const router = express.Router();
const reportController = require('../controllers/Reportes.controller');

// Ruta para generar el reporte de inventario en PDF
router.get('/generar_inventario', reportController.generateInventoryReportController);

module.exports = router;