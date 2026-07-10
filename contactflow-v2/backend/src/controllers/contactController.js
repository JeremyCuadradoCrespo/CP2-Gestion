import {
  listarContactos,
  listarPapelera,
  obtenerContactoPorId,
  obtenerContactoPorCorreo,
  crearContacto,
  actualizarContacto,
  marcarFavorito,
  moverAPapelera,
  restaurarContacto,
  eliminarContactoPermanente,
  importarContactos
} from "../services/contactService.js";
import { validarContacto, validarId } from "../validators/contactValidator.js";

function parsearFavorito(valor) {
  if (valor === "true") return true;
  if (valor === "false") return false;
  return undefined;
}

export async function getContacts(req, res) {
  try {
    const { search, category, favorito } = req.query;
    const contactos = await listarContactos({ search, category, favorito: parsearFavorito(favorito) });
    return res.status(200).json({ success: true, data: contactos });
  } catch (error) {
    console.error("[contactController] getContacts:", error.message);
    return res.status(500).json({ success: false, message: "Error al obtener los contactos." });
  }
}

export async function getTrash(req, res) {
  try {
    const contactos = await listarPapelera();
    return res.status(200).json({ success: true, data: contactos });
  } catch (error) {
    console.error("[contactController] getTrash:", error.message);
    return res.status(500).json({ success: false, message: "Error al obtener la papelera." });
  }
}

export async function getContactById(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({ success: false, message: "El ID proporcionado no es valido." });
    }

    const contacto = await obtenerContactoPorId(id);

    if (!contacto) {
      return res.status(404).json({ success: false, message: "Contacto no encontrado" });
    }

    return res.status(200).json({ success: true, data: contacto });
  } catch (error) {
    console.error("[contactController] getContactById:", error.message);
    return res.status(500).json({ success: false, message: "Error al obtener el contacto." });
  }
}

export async function createContact(req, res) {
  try {
    const { valido, errores } = validarContacto(req.body);

    if (!valido) {
      return res.status(400).json({ success: false, message: errores.join(" ") });
    }

    const correoExistente = await obtenerContactoPorCorreo(req.body.correo.trim().toLowerCase());

    if (correoExistente) {
      return res.status(409).json({ success: false, message: "Ya existe un contacto con ese correo" });
    }

    const nuevoContacto = await crearContacto(req.body);
    return res.status(201).json({ success: true, data: nuevoContacto });
  } catch (error) {
    console.error("[contactController] createContact:", error.message);
    return res.status(500).json({ success: false, message: "Error al crear el contacto." });
  }
}

export async function updateContact(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({ success: false, message: "El ID proporcionado no es valido." });
    }

    const contactoExistente = await obtenerContactoPorId(id);

    if (!contactoExistente) {
      return res.status(404).json({ success: false, message: "Contacto no encontrado" });
    }

    const { valido, errores } = validarContacto(req.body, { esParcial: true });

    if (!valido) {
      return res.status(400).json({ success: false, message: errores.join(" ") });
    }

    if (req.body.correo && req.body.correo.trim().toLowerCase() !== contactoExistente.correo) {
      const correoExistente = await obtenerContactoPorCorreo(req.body.correo.trim().toLowerCase());
      if (correoExistente) {
        return res.status(409).json({ success: false, message: "Ya existe un contacto con ese correo" });
      }
    }

    const contactoActualizado = await actualizarContacto(id, req.body);
    return res.status(200).json({ success: true, data: contactoActualizado });
  } catch (error) {
    console.error("[contactController] updateContact:", error.message);
    return res.status(500).json({ success: false, message: "Error al actualizar el contacto." });
  }
}

export async function toggleFavorite(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({ success: false, message: "El ID proporcionado no es valido." });
    }

    if (typeof req.body.favorito !== "boolean") {
      return res.status(400).json({ success: false, message: "El campo favorito debe ser booleano." });
    }

    const contacto = await marcarFavorito(id, req.body.favorito);

    if (!contacto) {
      return res.status(404).json({ success: false, message: "Contacto no encontrado" });
    }

    return res.status(200).json({ success: true, data: contacto });
  } catch (error) {
    console.error("[contactController] toggleFavorite:", error.message);
    return res.status(500).json({ success: false, message: "Error al actualizar el contacto favorito." });
  }
}

export async function deleteContact(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({ success: false, message: "El ID proporcionado no es valido." });
    }

    const contacto = await obtenerContactoPorId(id);

    if (!contacto) {
      return res.status(404).json({ success: false, message: "Contacto no encontrado" });
    }

    await moverAPapelera(id);
    return res.status(200).json({ success: true, data: { id: Number(id) } });
  } catch (error) {
    console.error("[contactController] deleteContact:", error.message);
    return res.status(500).json({ success: false, message: "Error al eliminar el contacto." });
  }
}

export async function restoreContact(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({ success: false, message: "El ID proporcionado no es valido." });
    }

    const contacto = await restaurarContacto(id);

    if (!contacto) {
      return res.status(404).json({ success: false, message: "El contacto no esta en la papelera." });
    }

    return res.status(200).json({ success: true, data: contacto });
  } catch (error) {
    console.error("[contactController] restoreContact:", error.message);
    return res.status(500).json({ success: false, message: "Error al restaurar el contacto." });
  }
}

export async function permanentlyDeleteContact(req, res) {
  try {
    const { id } = req.params;

    if (!validarId(id)) {
      return res.status(400).json({ success: false, message: "El ID proporcionado no es valido." });
    }

    const eliminado = await eliminarContactoPermanente(id);

    if (!eliminado) {
      return res.status(404).json({ success: false, message: "El contacto no esta en la papelera." });
    }

    return res.status(200).json({ success: true, data: { id: Number(id) } });
  } catch (error) {
    console.error("[contactController] permanentlyDeleteContact:", error.message);
    return res.status(500).json({ success: false, message: "Error al eliminar el contacto definitivamente." });
  }
}

export async function importContacts(req, res) {
  try {
    const { contactos } = req.body;

    if (!Array.isArray(contactos) || contactos.length === 0) {
      return res.status(400).json({ success: false, message: "Debes enviar una lista de contactos para importar." });
    }

    if (contactos.length > 500) {
      return res.status(400).json({ success: false, message: "No se pueden importar mas de 500 contactos a la vez." });
    }

    const validos = [];
    const errores = [];

    contactos.forEach((contacto, indice) => {
      const { valido, errores: erroresFila } = validarContacto(contacto);

      if (valido) {
        validos.push(contacto);
      } else {
        errores.push({ fila: indice + 1, motivo: erroresFila.join(" ") });
      }
    });

    const { creados, omitidos } = await importarContactos(validos);

    return res.status(200).json({
      success: true,
      data: {
        creados,
        omitidos: [...omitidos, ...errores.map((e) => ({ fila: e.fila, motivo: e.motivo }))]
      }
    });
  } catch (error) {
    console.error("[contactController] importContacts:", error.message);
    return res.status(500).json({ success: false, message: "Error al importar los contactos." });
  }
}
