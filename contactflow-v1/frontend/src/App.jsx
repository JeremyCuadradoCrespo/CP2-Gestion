import { useEffect, useState, useCallback } from "react";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";
import { obtenerContactos, crearContacto, eliminarContacto } from "./api/contactApi.js";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarContactos = useCallback(async () => {
    setCargando(true);
    try {
      const respuesta = await obtenerContactos();
      setContactos(respuesta.data);
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarContactos();
  }, [cargarContactos]);

  async function manejarCrear(datos) {
    setGuardando(true);
    setMensaje(null);
    try {
      await crearContacto(datos);
      setMensaje({ tipo: "exito", texto: "Contacto registrado correctamente." });
      await cargarContactos();
      return true;
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(id) {
    setMensaje(null);
    try {
      await eliminarContacto(id);
      setMensaje({ tipo: "exito", texto: "Contacto eliminado correctamente." });
      await cargarContactos();
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
    }
  }

  return (
    <>
      <header className="app-header">
        <h1>ContactFlow DevOps</h1>
        <p className="subtitle">Version 1.0 - Agenda basica de contactos</p>
      </header>

      <main className="app-main">
        {mensaje && (
          <p
            className={`alert alert-${mensaje.tipo}`}
            role="status"
            aria-live="polite"
          >
            {mensaje.texto}
          </p>
        )}

        <section aria-labelledby="form-title" className="panel">
          <h2 id="form-title">Registrar contacto</h2>
          <ContactForm onCrear={manejarCrear} cargando={guardando} />
        </section>

        <section aria-labelledby="contacts-title" className="panel">
          <h2 id="contacts-title">Contactos registrados</h2>
          <ContactList contactos={contactos} cargando={cargando} onEliminar={manejarEliminar} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Proyecto academico - Implementacion de un Entorno DevOps para una Aplicacion Simple.</p>
        <p>ContactFlow V1 - Agenda basica</p>
      </footer>
    </>
  );
}
