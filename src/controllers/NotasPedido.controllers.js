const NotaPedido = require('../models/NotasPedido');
const DetalleNotaPedido = require('../models/DetallesNotaPedido');
const Producto = require('../models/Productos'); 
const sequelize = require('../sequelize');

exports.createNotaPedido = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    console.log('Datos recibidos:', req.body); // Log de los datos recibidos

    const { id_trabajador, DetallesNotasPedidos } = req.body;

    // Verificar si los campos requeridos están presentes
    if (!id_trabajador || !DetallesNotasPedidos || !Array.isArray(DetallesNotasPedidos) || DetallesNotasPedidos.length === 0) {
      throw new Error('Faltan campos requeridos o el formato de DetallesNotasPedidos es incorrecto');
    }

    // Crear la nota de pedido
    const newNotaPedido = await NotaPedido.create({
      id_trabajador,
      total: 0 // Inicializar el total con 0
    }, { transaction: t });

    console.log('Nota de pedido creada:', newNotaPedido);

    let total = 0;

    // Crear los detalles de la nota de pedido y calcular el total
    for (const detalle of DetallesNotasPedidos) {
      console.log('Procesando detalle:', detalle);

      // Obtener el producto
      const producto = await Producto.findByPk(detalle.id_producto);
      if (!producto) {
        throw new Error(`Producto con id ${detalle.id_producto} no encontrado`);
      }

      const precioCompra = parseFloat(producto.precio);
      if (isNaN(precioCompra)) {
        throw new Error(`Precio inválido para el producto con ID ${detalle.id_producto}`);
      }

      // Calcular el subtotal del detalle
      const subtotalDetalle = detalle.cantidad * precioCompra;

      // Crear el detalle de la nota de pedido
      const createdDetalle = await DetalleNotaPedido.create({
        id_nota_pedido: newNotaPedido.id_nota_pedido,
        id_producto: detalle.id_producto,
        cantidad: detalle.cantidad,
        precio_compra: precioCompra // Utilizar el precio del producto
      }, { transaction: t });

      console.log('Detalle de nota de pedido creado:', createdDetalle);

      // Actualizar el stock actual del producto
      await Producto.update({
        stock_actual: producto.stock_actual + detalle.cantidad
      }, {
        where: {
          id_Producto: detalle.id_producto
        },
        transaction: t
      });

      // Calcular el total de la nota de pedido
      total += subtotalDetalle;
    }

    // Actualizar el total de la nota de pedido
    newNotaPedido.total = total;
    await newNotaPedido.save({ transaction: t });

    await t.commit();
    console.log('Transacción completada');
    res.status(201).json(newNotaPedido);
  } catch (error) {
    console.error('Error al crear la nota de pedido:', error.message); // Log de errores
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las notas de pedido
exports.getAllNotasPedido = async (req, res) => {
  try {
    const notasPedido = await NotaPedido.findAll({
      include: [DetalleNotaPedido] // Incluir detalles de la nota de pedido
    });
    res.json(notasPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una nota de pedido por ID
exports.getNotaPedidoById = async (req, res) => {
  try {
    const notaPedido = await NotaPedido.findByPk(req.params.id, {
      include: [{ model: DetalleNotaPedido }]
    });
    if (notaPedido) {
      res.json(notaPedido);
    } else {
      res.status(404).json({ error: 'Nota de pedido no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una nota de pedido
exports.updateNotaPedido = async (req, res) => {
  try {
    const notaPedido = await NotaPedido.findByPk(req.params.id);
    if (notaPedido) {
      await notaPedido.update(req.body);
      res.json(notaPedido);
    } else {
      res.status(404).json({ error: 'Nota de pedido no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una nota de pedido
exports.deleteNotaPedido = async (req, res) => {
  try {
    const notaPedido = await NotaPedido.findByPk(req.params.id);
    if (notaPedido) {
      await notaPedido.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Nota de pedido no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
