const NotaEntrega = require('../models/NotasEntrega');
const DetalleNotaEntrega = require('../models/DetallesNotasEntrega');
const Producto = require('../models/Productos'); 
const sequelize = require('../sequelize');


exports.createNotaEntrega = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    console.log('Datos recibidos:', req.body); // Log de los datos recibidos

    const { id_trabajador, id_cliente, estado, DetallesNotasEntrega } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!id_trabajador || !id_cliente || !DetallesNotasEntrega) {
      throw new Error('Faltan campos requeridos');
    }

    // Crear la nota de entrega
    const newNotaEntrega = await NotaEntrega.create({
      id_trabajador,
      id_cliente,
      estado,
      total: 0 // Inicializar el total con 0
    }, { transaction: t });

    console.log('Nota de entrega creada:', newNotaEntrega);

    let total = 0;

    // Crear los detalles de la nota de entrega y calcular el total
    if (DetallesNotasEntrega && DetallesNotasEntrega.length > 0) {
      for (const detalle of DetallesNotasEntrega) {
        console.log('Procesando detalle:', detalle);

        // Obtener el precio del producto
        const producto = await Producto.findByPk(detalle.id_producto);
        if (!producto) {
          throw new Error(`Producto con id ${detalle.id_producto} no encontrado`);
        }

        const precioVenta = parseFloat(producto.precio);
        if (isNaN(precioVenta)) {
          throw new Error(`Precio inválido para el producto con ID ${detalle.id_producto}`);
        }

        const createdDetalle = await DetalleNotaEntrega.create({
          id_nota_entrega: newNotaEntrega.id_nota_entrega,
          id_producto: detalle.id_producto,
          cantidad: detalle.cantidad,
          precio_venta: precioVenta // Utilizar el precio del producto
        }, { transaction: t });

        console.log('Detalle de nota de entrega creado:', createdDetalle);

        // Calcular el total
        total += detalle.cantidad * precioVenta;
      }
    }

    // Actualizar el total de la nota de entrega
    newNotaEntrega.total = total;
    await newNotaEntrega.save({ transaction: t });

    await t.commit();
    console.log('Transacción completada');
    res.status(201).json(newNotaEntrega);
  } catch (error) {
    console.error('Error al crear la nota de entrega:', error.message); // Log de errores
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};
exports.getAllNotasEntrega = async (req, res) => {
  try {
    const notasEntrega = await NotaEntrega.findAll({
      include: [DetalleNotaEntrega] // Incluir detalles de la nota de entrega
    });
    res.json(notasEntrega);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllNotasEntregaPendientes = async (req, res) => {
  try {
    const notasPendientes = await NotaEntrega.findAll({
      where: {
        estado: 'pendiente'
      }
    });
    res.json(notasPendientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getNotaEntregaById = async (req, res) => {
  try {
    const notaEntrega = await NotaEntrega.findByPk(req.params.id, {
      include: [{ model: DetalleNotaEntrega }]
    });
    if (notaEntrega) {
      res.json(notaEntrega);
    } else {
      res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNotaEntrega = async (req, res) => {
  try {
    const notaEntrega = await NotaEntrega.findByPk(req.params.id);
    if (notaEntrega) {
      await notaEntrega.update(req.body);
      res.json(notaEntrega);
    } else {
      res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNotaEntrega = async (req, res) => {
  try {
    const notaEntrega = await NotaEntrega.findByPk(req.params.id);
    if (notaEntrega) {
      await notaEntrega.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Nota de entrega no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
