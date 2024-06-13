// src/routes/Trabajadores.routes.js
const express = require('express');
const router = express.Router();
const trabajadorController = require('../controllers/Trabajadores.controllers');

router.get('/', trabajadorController.getAllTrabajadores);
router.get('/:id', trabajadorController.getTrabajadorById);
router.post('/', trabajadorController.createTrabajador);
router.put('/:id', trabajadorController.updateTrabajador);
router.delete('/:id', trabajadorController.deleteTrabajador);

module.exports = router;
