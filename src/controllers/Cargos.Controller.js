// src/controllers/Cargos.controllers.js
const Cargo = require('../models/Cargos');

exports.getAllCargos = async (req, res) => {
  try {
    const cargos = await Cargo.findAll();
    res.json(cargos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCargoById = async (req, res) => {
  try {
    const cargo = await Cargo.findByPk(req.params.id);
    if (cargo) {
      res.json(cargo);
    } else {
      res.status(404).json({ error: 'Cargo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCargo = async (req, res) => {
  try {
    const newCargo = await Cargo.create(req.body);
    res.status(201).json(newCargo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCargo = async (req, res) => {
  try {
    const cargo = await Cargo.findByPk(req.params.id);
    if (cargo) {
      await cargo.update(req.body);
      res.json(cargo);
    } else {
      res.status(404).json({ error: 'Cargo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCargo = async (req, res) => {
  try {
    const cargo = await Cargo.findByPk(req.params.id);
    if (cargo) {
      await cargo.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Cargo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
