const express = require('express');
const router = express.Router();

const productoRoutes = require('./routes/Productos.routes');
const proveedorRoutes = require('./routes/Proveedores.routes');
const clienteRoutes = require('./routes/Clientes.routes');
const cargoRoutes = require('./routes/Cargos.routes');
const trabajadorRoutes = require('./routes/Trabajadores.routes');
const nitRoutes = require('./routes/Nit.routes');  // Ruta para NIT
const NotasEntregaRoutes = require('./routes/NotasEntrega.routes');
const PagosRoutes = require('./routes/Pagos.router');
const FacturasRoutes = require('./routes/Factura.routes');
const NotasPedido = require('./routes/NotasPedido.route');  // Ruta comentada

// Asignación de rutas a los diferentes módulos
router.use('/productos', productoRoutes);
router.use('/proveedores', proveedorRoutes);
router.use('/clientes', clienteRoutes);
router.use('/cargos', cargoRoutes);
router.use('/trabajadores', trabajadorRoutes);
router.use('/nit', nitRoutes);  // Ruta para NIT
router.use('/notasentrega', NotasEntregaRoutes);
router.use('/pagos', PagosRoutes);
router.use('/facturas', FacturasRoutes);
 router.use('/NotaPEdidoCompra', NotasPedido);  // Ruta comentada

module.exports = router;
