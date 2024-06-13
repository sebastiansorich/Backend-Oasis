const NIT = require('../models/Nits');

exports.getAllNITs = async (req, res) => {
  try {
    const nits = await NIT.findAll();
    res.json(nits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNITById = async (req, res) => {
  try {
    const nit = await NIT.findByPk(req.params.nit);
    if (nit) {
      res.json(nit);
    } else {
      res.status(404).json({ error: 'NIT no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNIT = async (req, res) => {
  try {
    const newNIT = await NIT.create(req.body);
    res.status(201).json(newNIT);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNIT = async (req, res) => {
  try {
    const nit = await NIT.findByPk(req.params.nit);
    if (nit) {
      await nit.update(req.body);
      res.json(nit);
    } else {
      res.status(404).json({ error: 'NIT no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNIT = async (req, res) => {
  try {
    const nit = await NIT.findByPk(req.params.nit);
    if (nit) {
      await nit.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'NIT no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
