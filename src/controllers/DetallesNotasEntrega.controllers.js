const { pool } = require('../db');

const GetDetallesNotasEntrega = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM DetallesNotasEntrega;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener detalles de notas de entrega:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const GetDetalleNotaEntregaByID = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM DetallesNotasEntrega WHERE id_detalle = $1;', [id]);
        if (result.rows.length === 0) {
            res.status(404).send('Detalle de nota de entrega no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener detalle de nota de entrega por ID:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const CrearDetalleNotaEntrega = async (req, res) => {
    const { id_nota_entrega, id_producto, cantidad, precio_venta } = req.body;
    try {
        const result = await pool.query('INSERT INTO DetallesNotasEntrega (id_nota_entrega, id_producto, cantidad, precio_venta) VALUES ($1, $2, $3, $4) RETURNING *;', [id_nota_entrega, id_producto, cantidad, precio_venta]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear detalle de nota de entrega:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const DeleteDetalleNotaEntrega = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM DetallesNotasEntrega WHERE id_detalle = $1;', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar detalle de nota de entrega:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const EditarDetalleNotaEntrega = async (req, res) => {
    const id = req.params.id;
    const { id_nota_entrega, id_producto, cantidad, precio_venta } = req.body;
    try {
        const result = await pool.query('UPDATE DetallesNotasEntrega SET id_nota_entrega = $1, id_producto = $2, cantidad = $3, precio_venta = $4 WHERE id_detalle = $5 RETURNING *;', [id_nota_entrega, id_producto, cantidad, precio_venta, id]);
        if (result.rows.length === 0) {
            res.status(404).send('Detalle de nota de entrega no encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar detalle de nota de entrega:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = { GetDetallesNotasEntrega, GetDetalleNotaEntregaByID, CrearDetalleNotaEntrega, DeleteDetalleNotaEntrega, EditarDetalleNotaEntrega };
