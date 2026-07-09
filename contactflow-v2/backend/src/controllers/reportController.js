import { obtenerResumen } from "../services/reportService.js";

export async function getSummary(req, res) {
  try {
    const resumen = await obtenerResumen();
    return res.status(200).json({ success: true, data: resumen });
  } catch (error) {
    console.error("[reportController] getSummary:", error.message);
    return res.status(500).json({ success: false, message: "Error al generar el reporte." });
  }
}
