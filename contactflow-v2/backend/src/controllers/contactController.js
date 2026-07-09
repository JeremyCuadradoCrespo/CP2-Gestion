import {
  listarContactos,
  obtenerContactoPorId,
  obtenerContactoPorCorreo,
  crearContacto,
  actualizarContacto,
  eliminarContacto
} from "../services/contactService.js";
import { validarContacto, validarId } from "../validators/contactValidator.js";

export async function getContacts(req, res) {
  try {
    const { search, category } = req.query;
    const contactos = await listarContactos({ search, category });
    return res.status(200).json({ success: true, data: contactos });
  } catch (error) {
    console.error("[contactController] getContacts:", error.message);
    return res.status(500).json({ success: false, message: "Error al obtener los contactos." });
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

    await eliminarContacto(id);
    return res.status(200).json({ success: true, data: { id: Number(id) } });
  } catch (error) {
    console.error("[contactController] deleteContact:", error.message);
    return res.status(500).json({ success: false, message: "Error al eliminar el contacto." });
  }
}
