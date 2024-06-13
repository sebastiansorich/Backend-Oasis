const Pago = require('../models/Pagos');
const NotaEntrega = require('../models/NotasEntrega');
const sequelize = require('../sequelize');

exports.getAllPagos = async (req, res) => {
  try {
    const pagos = await Pago.findAll();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPagoById = async (req, res) => {
  try {
    const pago = await Pago.findByPk(req.params.id);
    if (pago) {
      res.json(pago);
    } else {
      res.status(404).json({ error: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPago = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { codigo_nota_entrega, monto_pagado, fecha_pago } = req.body;

    const notaEntrega = await NotaEntrega.findByPk(codigo_nota_entrega);
    if (!notaEntrega) {
      throw new Error('La nota de entrega especificada no existe');
    }

    const newPago = await Pago.create({
      codigo_nota_entrega,
      monto_pagado,
      fecha_pago
    }, { transaction: t });

    await t.commit();
    res.status(201).json(newPago);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.updatePago = async (req, res) => {
  try {
    const pago = await Pago.findByPk(req.params.id);
    if (pago) {
      await pago.update(req.body);
      res.json(pago);
    } else {
      res.status(404).json({ error: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePago = async (req, res) => {
  try {
    const pago = await Pago.findByPk(req.params.id);
    if (pago) {
      await pago.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
