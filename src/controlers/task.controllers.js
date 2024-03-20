const { pool } = require('../db');
const HomePage = async (req, res) => {
    res.send("Hola")

}



const GetProductos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Productos;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const GetProductosByID = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM Productos WHERE id_Producto = $1;', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).send('Error interno del servidor');
    }
    res.send("Producto creado")
};

const CrearProducto = async (req, res) => {
    const { nombre } = req.body;
    try {
        const result = await pool.query('INSERT INTO Productos (Nombre) VALUES ($1) RETURNING *;', [nombre]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const DeleteProducto = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM Productos WHERE id_Producto = $1;', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const actualizarProducto = async (req, res) => {
    const id = req.params.id;
    const { nombre } = req.body;
    try {
        const result = await pool.query('UPDATE Productos SET Nombre = $1 WHERE id_Producto = $2 RETURNING *;', [nombre, id]);
        if (result.rows.length === 0) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = { GetProductos, GetProductosByID, CrearProducto, DeleteProducto, actualizarProducto };

module.exports = {
    GetProductos,
    CrearProducto,
    GetProductosByID,
    DeleteProducto,
    actualizarProducto,
    HomePage
};