const PDFDocument = require('pdfkit');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Producto = require('../models/Productos');

const width = 600;
const height = 400;

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
const fechaActual = new Date();

// Obtener los componentes individuales de la fecha
const dia = fechaActual.getDate(); // Día del mes
const mes = fechaActual.getMonth() + 1; // Mes (nota: los meses en JavaScript son 0-indexados, por eso se suma 1)
const anio = fechaActual.getFullYear(); // Año
const horas = fechaActual.getHours(); // Horas
const minutos = fechaActual.getMinutes(); // Minutos
const segundos = fechaActual.getSeconds(); // Segundos

// Formatear la fecha como un string
const fechaString = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

console.log(fechaString); // Imprimir la fecha formateada
const generateInventoryReport = async () => {
  // Obtener datos de productos desde la base de datos
  const productos = await Producto.findAll({
    attributes: ['nombre', 'stock_actual']  // Asumiendo que estos son los nombres de los campos en tu modelo
  });

  const inventoryData = productos.map(producto => ({
    productName: producto.nombre,
    stock_actual: producto.stock_actual,
    stock_minimo: producto.stock_minimo,
    precio: producto.precio

  }));

  const doc = new PDFDocument({ margin: 50 });

  const labels = inventoryData.map(item => item.productName);
  const data = inventoryData.map(item => item.stock_actual);

  const chartConfig = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stock Actual',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  const chartConfig2 = {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Inventario',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Distribución de Stock por Producto'
        }
      }
    }
  };

  const chartImage = await chartJSNodeCanvas.renderToBuffer(chartConfig);
  const chartImage2 = await chartJSNodeCanvas.renderToBuffer(chartConfig2);

  // Configurar el margen para la imagen
  const imageMargin = 50;
  const imageWidth = width - 2 * imageMargin;
  const imageHeight = height - 2 * imageMargin;

  doc.fontSize(16);
  doc.text('Inventario Oasis', { align: 'left', continued: true });
  doc.text( fechaString , { align: 'right' });
  doc.moveDown(); 
  doc.text('Reporte de Inventario', { align: 'center' });
  doc.moveDown();

  // Ajustar la posición y el tamaño de la imagen
  doc.image(chartImage, {
    fit: [imageWidth, imageHeight],
    align: 'center',
    valign: 'center'
  });
  doc.addPage();
  doc.image(chartImage2, {
    fit: [imageWidth, imageHeight],
    align: 'center',
    valign: 'center'
  });
  doc.addPage();

  // Tamaño de la fuente para el documento
  doc.fontSize(12);

  // Encabezado de la tabla
  doc.text('Nombre del Producto', { underline: true });
  doc.text('Stock Actual', { underline: true, align: 'right' });


  doc.moveDown(); // Mover hacia abajo para dejar espacio después del encabezado

  // Datos del inventario
  inventoryData.forEach(item => {
    doc.text(item.productName, { continued: true });
    doc.text(item.stock_actual.toString(), { align: 'right' });
    doc.moveDown(); // Mover hacia abajo para la siguiente línea
  });

  // Finalizamos el documento
  doc.end();

  // Retornamos el documento para poder manejarlo fuera de esta función si es necesario
  return doc;
};

module.exports = {
  generateInventoryReport,
};
