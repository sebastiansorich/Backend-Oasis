const HomePage = async (req, res) => {
  res.send(`
    <html>
    <head>
        <title>HomePage</title>
    </head>
    <body>
        <h1>Index</h1>
        <h2>Controladores</h2>
        <p>Proveedores: <a href="https://backend-oasis.onrender.com//proveedores">https://backend-oasis.onrender.com//proveedores</a></p>
        <p>Productos: <a href="https://backend-oasis.onrender.com//productos">https://backend-oasis.onrender.com//productos</a></p>
        <p>Clientes: <a href="https://backend-oasis.onrender.com//clientes">https://backend-oasis.onrender.com//clientes</a></p>
        <p>Trabajadores: <a href="https://backend-oasis.onrender.com//trabajadores">https://backend-oasis.onrender.com//trabajadores</a></p>
        <p>Cargos: <a href="https://backend-oasis.onrender.com//cargos">https://backend-oasis.onrender.com//cargos</a></p>
        <p>NIT: <a href="https://backend-oasis.onrender.com//nit">https://backend-oasis.onrender.com//nit</a></p>
        <p>Notas de Entrega: <a href="https://backend-oasis.onrender.com//notasEntrega">https://backend-oasis.onrender.com//notasEntrega</a></p>
        <p>Pagos: <a href="https://backend-oasis.onrender.com//pagos">https://backend-oasis.onrender.com//pagos</a></p>        
        <p>Facturas de Venta: <a href="https://backend-oasis.onrender.com//facturas">https://backend-oasis.onrender.com//facturas</a></p>
        <p>Notas de Pedido: <a href="https://backend-oasis.onrender.com//NotaPEdidoCompra/">https://backend-oasis.onrender.com//NotaPEdidoCompra/</a></p>
        <br></br>
        <h2>Generacion de reportes</h2>
        <br></br>
        <p>Reportes de inventario: <a href="https://backend-oasis.onrender.com//Reportes/generar_inventario">https://backend-oasis.onrender.com//Reportes/generar_inventario/</a></p>
    </body>
    </html>
  `);
};
module.exports = {
  HomePage
};
