const Factura = require('../models/Factura');
const NotaEntrega = require('../models/NotasEntrega');
const Producto = require('../models/Productos');
const DetalleNotaEntrega = require('../models/DetallesNotasEntrega');
const sequelize = require('../sequelize');

exports.getAllFacturas = async (req, res) => {
  try {
    const facturas = await Factura.findAll();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createFactura = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id_nota_entrega, nit_cliente, Iva } = req.body;

    // Verificar si la nota de entrega ya está en estado entregado
    const notaEntrega = await NotaEntrega.findByPk(id_nota_entrega, {
      include: DetalleNotaEntrega // Incluir los detalles de la nota de entrega
    });

    if (!notaEntrega) {
      await t.rollback();
      return res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }

    if (notaEntrega.estado === 'entregado') {
      await t.rollback();
      return res.status(400).json({ error: 'No se puede crear una factura para una nota de entrega ya entregada' });
    }

    // Crear la factura
    const newFactura = await Factura.create({
      id_nota_entrega,
      nit_cliente,
      Iva
    }, { transaction: t });

    // Actualizar el estado de la nota de entrega
    notaEntrega.estado = 'entregado';
    await notaEntrega.save({ transaction: t });

    // Actualizar el stock de los productos
    for (const detalle of notaEntrega.DetallesNotasEntregas) {
      const producto = await Producto.findByPk(detalle.id_producto, { transaction: t });
      if (!producto) {
        await t.rollback();
        return res.status(404).json({ error: `Producto con id ${detalle.id_producto} no encontrado` });
      }

      // Verificar si hay suficiente stock
      if (producto.stock_actual < detalle.cantidad) {
        await t.rollback();
        return res.status(400).json({ error: `Stock insuficiente para el producto con id ${detalle.id_producto}` });
      }

      // Actualizar el stock del producto
      producto.stock_actual -= detalle.cantidad;
      await producto.save({ transaction: t });
    }

    await t.commit();
    res.status(201).json(newFactura);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};


exports.deleteFactura = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const facturaId = req.params.id;

    // Encontrar la factura por su ID
    const factura = await Factura.findByPk(facturaId, { transaction: t });

    if (!factura) {
      await t.rollback();
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    // Eliminar la factura
    await factura.destroy({ transaction: t });

    // Confirmar la transacción si la eliminación fue exitosa
    await t.commit();

    res.status(204).json();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

