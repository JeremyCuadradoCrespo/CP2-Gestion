import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import ContactForm from "../components/contact/ContactForm.jsx";
import ContactList from "../components/contact/ContactList.jsx";
import {
    obtenerContactos,
    crearContacto,
    eliminarContacto,
} from "../api/contactApi.js";

export default function ContactsPage() {
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
            setMensaje({
                tipo: "exito",
                texto: "Contacto registrado correctamente.",
            });

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
            setMensaje({
                tipo: "exito",
                texto: "Contacto eliminado correctamente.",
            });

            await cargarContactos();
        } catch (error) {
            setMensaje({ tipo: "error", texto: error.message });
        }
    }

    return (
        <div className="contacts-page">
            <header className="contacts-header">
                <nav className="contacts-nav">
                    <Link to="/" className="contacts-back-link">
                        ← Volver al inicio
                    </Link>
                </nav>

                <div className="contacts-header-content">
                    <span className="contacts-badge">Agenda básica</span>
                    <h1>ContactFlow DevOps</h1>
                    <p className="contacts-subtitle">
                        Versión 1.0 - Gestión básica de contactos
                    </p>
                </div>
            </header>

            <main className="contacts-main">
                {mensaje && (
                    <p
                        className={`contacts-alert contacts-alert-${mensaje.tipo}`}
                        role="status"
                        aria-live="polite"
                    >
                        {mensaje.texto}
                    </p>
                )}

                <section aria-labelledby="form-title" className="contacts-panel">
                    <div className="contacts-panel-heading">
                        <h2 id="form-title">Registrar contacto</h2>
                        <p>Completa los datos principales para agregar un nuevo contacto.</p>
                    </div>

                    <ContactForm onCrear={manejarCrear} cargando={guardando} />
                </section>

                <section aria-labelledby="contacts-title" className="contacts-panel">
                    <div className="contacts-panel-heading">
                        <h2 id="contacts-title">Contactos registrados</h2>
                        <p>Listado de contactos almacenados en la base de datos.</p>
                    </div>

                    <ContactList
                        contactos={contactos}
                        cargando={cargando}
                        onEliminar={manejarEliminar}
                    />
                </section>
            </main>

            <footer className="contacts-footer">
                <p>ContactFlow V1 - Agenda básica con React, Express y PostgreSQL.</p>
            </footer>
        </div>
    );
}