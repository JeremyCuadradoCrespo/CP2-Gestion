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
 * Obtiene la lista de contactos, aceptando filtros opcionales
 * de busqueda (search), categoria (category) y favorito (true/false).
 */
export async function getContacts({ search, category, favorito } = {}) {
  const parametros = new URLSearchParams();

  if (search) {
    parametros.set("search", search);
  }

  if (category) {
    parametros.set("category", category);
  }

  if (favorito !== undefined) {
    parametros.set("favorito", String(favorito));
  }

  const query = parametros.toString();

  try {
    const response = await fetch(`${API_URL}/contacts${query ? `?${query}` : ""}`);
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible obtener los contactos.");
  }
}

export async function getTrash() {
  try {
    const response = await fetch(`${API_URL}/contacts/trash`);
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible obtener la papelera.");
  }
}

export async function getContactById(id) {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`);
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible obtener el contacto.");
  }
}

export async function createContact(contactData) {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    });
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible crear el contacto.");
  }
}

export async function updateContact(id, contactData) {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    });
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible actualizar el contacto.");
  }
}

export async function toggleFavorite(id, favorito) {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}/favorito`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorito })
    });
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible actualizar el contacto favorito.");
  }
}

export async function deleteContact(id) {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: "DELETE"
    });
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible eliminar el contacto.");
  }
}

export async function restoreContact(id) {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}/restaurar`, {
      method: "POST"
    });
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible restaurar el contacto.");
  }
}

export async function deleteContactPermanently(id) {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}/permanente`, {
      method: "DELETE"
    });
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible eliminar el contacto definitivamente.");
  }
}

export async function importContacts(contactos) {
  try {
    const response = await fetch(`${API_URL}/contacts/import`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactos })
    });
    return await manejarRespuesta(response);
  } catch (error) {
    throw new Error(error.message || "No fue posible importar los contactos.");
  }
}
