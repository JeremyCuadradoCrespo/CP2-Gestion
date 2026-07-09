const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001/api";

async function manejarRespuesta(response) {
  const cuerpo = await response.json().catch(() => ({}));

  if (!response.ok) {
    const mensaje = cuerpo?.message || "Ocurrio un error al comunicarse con el servidor.";
    throw new Error(mensaje);
  }

  return cuerpo;
}

export async function obtenerContactos() {
  const response = await fetch(`${API_URL}/contacts`);
  return manejarRespuesta(response);
}

export async function crearContacto(datos) {
  const response = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  return manejarRespuesta(response);
}

export async function eliminarContacto(id) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: "DELETE"
  });
  return manejarRespuesta(response);
}
