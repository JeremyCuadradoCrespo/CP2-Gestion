const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4002/api";

async function manejarRespuesta(response) {
  const cuerpo = await response.json().catch(() => ({}));

  if (!response.ok || cuerpo?.success === false) {
    const mensaje = cuerpo?.message || "Ocurrio un error al comunicarse con el servidor.";
    throw new Error(mensaje);
  }

  return cuerpo;
}

/**
 * Obtiene el resumen de contactos por categoria.
 */
export async function getSummaryReport() {
  try {
    const response = await fetch(`${API_URL}/reports/summary`);
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible obtener el reporte.");
  }
}
