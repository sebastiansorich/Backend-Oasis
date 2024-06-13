// src/controllers/Trabajadores.controllers.js
const Trabajador = require('../models/Trabajadores');

exports.getAllTrabajadores = async (req, res) => {
  try {
    const trabajadores = await Trabajador.findAll();
    res.json(trabajadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrabajadorById = async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id);
    if (trabajador) {
      res.json(trabajador);
    } else {
      res.status(404).json({ error: 'Trabajador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTrabajador = async (req, res) => {
  try {
    const newTrabajador = await Trabajador.create(req.body);
    res.status(201).json(newTrabajador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTrabajador = async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id);
    if (trabajador) {
      await trabajador.update(req.body);
      res.json(trabajador);
    } else {
      res.status(404).json({ error: 'Trabajador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTrabajador = async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id);
    if (trabajador) {
      await trabajador.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Trabajador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
