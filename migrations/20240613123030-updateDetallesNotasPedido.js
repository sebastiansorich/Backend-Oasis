'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Añadir columna id_nota_pedido a la tabla DetallesNotasPedidos
    await queryInterface.addColumn('DetallesNotasPedidos', 'id_nota_pedido', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'NotasPedido',
        key: 'id_nota_pedido'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Otros cambios que desees aplicar en esta migración

    // Ejemplo: Modificar el tipo de una columna
    // await queryInterface.changeColumn('DetallesNotasPedidos', 'precio_venta', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   allowNull: false
    // });

    // Ejemplo: Añadir índices o restricciones adicionales
    // await queryInterface.addIndex('DetallesNotasPedidos', ['id_producto']);

    // Ejemplo: Crear una nueva tabla
    // await queryInterface.createTable('nueva_tabla', { id: Sequelize.INTEGER });

  },

  async down(queryInterface, Sequelize) {
    // Agrega los comandos de reversión aquí si es necesario
    await queryInterface.removeColumn('DetallesNotasPedidos', 'id_nota_pedido');
    // Aquí deberías revertir los cambios hechos en el método up, si es posible
  }
};
