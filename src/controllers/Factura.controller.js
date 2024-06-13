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

    // Crear la factura
    const newFactura = await Factura.create({
      id_nota_entrega,
      nit_cliente,
      Iva
    }, { transaction: t });

    // Actualizar el estado de la nota de entrega
    const notaEntrega = await NotaEntrega.findByPk(id_nota_entrega, {
      include: [{ model: DetalleNotaEntrega }]
    });

    if (!notaEntrega) {
      await t.rollback();
      return res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }

    notaEntrega.estado = 'entregado';
    await notaEntrega.save({ transaction: t });

    // Actualizar el stock de los productos
    for (const detalle of notaEntrega.DetalleNotaEntregas) {
      const producto = await Producto.findByPk(detalle.id_producto);
      if (!producto) {
        await t.rollback();
        return res.status(404).json({ error: `Producto con id ${detalle.id_producto} no encontrado` });
      }

      producto.stock_actual -= detalle.cantidad;
      if (producto.stock_actual < 0) {
        await t.rollback();
        return res.status(400).json({ error: `Stock insuficiente para el producto con id ${detalle.id_producto}` });
      }

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
    const factura = await Factura.findByPk(req.params.id, { transaction: t });
    if (!factura) {
      await t.rollback();
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    const notaEntrega = await NotaEntrega.findByPk(factura.id_nota_entrega, {
      include: [{ model: DetalleNotaEntrega }],
      transaction: t
    });

    if (!notaEntrega) {
      await t.rollback();
      return res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }

    // Restaurar el estado de la nota de entrega
    notaEntrega.estado = 'pendiente';
    await notaEntrega.save({ transaction: t });

    // Restaurar el stock de los productos
    for (const detalle of notaEntrega.DetalleNotaEntregas) {
      const producto = await Producto.findByPk(detalle.id_producto, { transaction: t });
      if (producto) {
        producto.stock_actual += detalle.cantidad;
        await producto.save({ transaction: t });
      }
    }

    // Eliminar la factura
    await factura.destroy({ transaction: t });

    await t.commit();
    res.status(204).json();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};
