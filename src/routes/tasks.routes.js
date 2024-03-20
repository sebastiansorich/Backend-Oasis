const { Router } = require('express');
const { GetProductos, DeleteProducto, actualizarProducto, GetProductosByID, CrearProducto, HomePage } = require('../controlers/task.controllers');
const router = Router();

router.get('/', HomePage);
router.get('/productos', GetProductos);
router.get('/productos/:id', GetProductosByID); // Corregido el uso de parámetros
router.post('/productos/create', CrearProducto);
router.delete('/productos/:id', DeleteProducto); // Corregido el uso de parámetros
router.put('/productos/:id', actualizarProducto); // Corregido el uso de parámetros


module.exports = router;
