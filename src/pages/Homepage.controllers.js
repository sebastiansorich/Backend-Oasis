const HomePage = async (req, res) => {
  res.send(`
    <html>
    <head>
        <title>HomePage</title>
    </head>
    <body>
        <h1>Index</h1>
        <p>Proveedores: <a href="http://localhost:3000/proveedores">http://localhost:3000/proveedores</a></p>
        <p>Productos: <a href="http://localhost:3000/productos">http://localhost:3000/productos</a></p>
        <p>Clientes: <a href="http://localhost:3000/clientes">http://localhost:3000/clientes</a></p>
        <p>Trabajadores: <a href="http://localhost:3000/trabajadores">http://localhost:3000/trabajadores</a></p>
        <p>Cargos: <a href="http://localhost:3000/cargos">http://localhost:3000/cargos</a></p>
        <p>NIT: <a href="http://localhost:3000/nit">http://localhost:3000/nit</a></p>
        <p>Notas de Entrega: <a href="http://localhost:3000/notasEntrega">http://localhost:3000/notasEntrega</a></p>
        <p>Pagos: <a href="http://localhost:3000/pagos">http://localhost:3000/pagos</a></p>        
        <p>Facturas de Venta: <a href="http://localhost:3000/facturas">http://localhost:3000/facturas</a></p>
         <br></br>
        <p>Notas de Pedido: <a href="http://localhost:3000/NotaPEdidoCompra/">http://localhost:3000/NotaPEdidoCompra/</a></p>
    </body>
    </html>
  `);
};
module.exports = {
  HomePage
};
