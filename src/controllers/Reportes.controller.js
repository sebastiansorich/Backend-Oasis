const { generateInventoryReport } = require('../services/reportService');

exports.generateInventoryReportController = async (req, res) => {
  try {
    const pdfDoc = await generateInventoryReport();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ReporteInventario.pdf');

    pdfDoc.pipe(res);
  } catch (error) {
    console.error('Error al generar el reporte de inventario', error);
    res.status(500).json({ error: 'Error al generar el reporte de inventario' });
  }
};
