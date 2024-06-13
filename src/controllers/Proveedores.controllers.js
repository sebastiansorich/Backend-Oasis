const Proveedor = require('../models/Proveedores');


exports.getAllProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProveedor = async (req, res) => {
  try {
    const newProveedor = await Proveedor.create(req.body);
    res.status(201).json(newProveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (proveedor) {
      await proveedor.update(req.body);
      res.json(proveedor);
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (proveedor) {
      await proveedor.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
