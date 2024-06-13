const Producto = require('../models/Productos');

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const newProducto = await Producto.create(req.body);
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto existente
exports.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      await producto.update(req.body);
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      await producto.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

