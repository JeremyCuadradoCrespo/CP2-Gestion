import { useEffect, useMemo, useRef, useState } from "react";
import ContactRow from "./ContactRow.jsx";
import LoadingState from "../feedback/LoadingState.jsx";
import EmptyState from "../feedback/EmptyState.jsx";

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const CONTACTOS_POR_PAGINA = 8;

export default function ContactTable({
  contacts,
  isLoading,
  onEdit,
  onDelete,
  onSelect,
  selectedContactId
}) {
  const filasRef = useRef(new Map());
  const contactoPendienteRef = useRef(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const letrasDisponibles = useMemo(() => {
    const letras = new Set(
      contacts.map((contacto) => contacto.nombre?.charAt(0).toUpperCase()).filter(Boolean)
    );
    return letras;
  }, [contacts]);

  const totalPaginas = Math.max(1, Math.ceil((contacts?.length || 0) / CONTACTOS_POR_PAGINA));
  const paginaSegura = Math.min(paginaActual, totalPaginas);
  const indiceInicio = (paginaSegura - 1) * CONTACTOS_POR_PAGINA;
  const indiceFin = indiceInicio + CONTACTOS_POR_PAGINA;
  const contactosPaginados = useMemo(
    () => contacts.slice(indiceInicio, indiceFin),
    [contacts, indiceInicio, indiceFin]
  );
  const primerContactoVisible = indiceInicio + 1;
  const ultimoContactoVisible = Math.min(indiceFin, contacts.length);

  const paginasVisibles = useMemo(() => {
    const inicio = Math.max(1, paginaSegura - 2);
    const fin = Math.min(totalPaginas, inicio + 4);
    const inicioAjustado = Math.max(1, fin - 4);

    return Array.from({ length: fin - inicioAjustado + 1 }, (_, indice) => inicioAjustado + indice);
  }, [paginaSegura, totalPaginas]);

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [paginaActual, totalPaginas]);

  useEffect(() => {
    const contactoId = contactoPendienteRef.current;

    if (!contactoId) {
      return;
    }

    const nodo = filasRef.current.get(contactoId);

    if (nodo) {
      nodo.scrollIntoView({ block: "center" });
      contactoPendienteRef.current = null;
    }
  }, [contactosPaginados]);

  function registrarFila(id, nodo) {
    if (nodo) {
      filasRef.current.set(id, nodo);
    } else {
      filasRef.current.delete(id);
    }
  }

  function irALetra(letra) {
    const contactoEncontrado = contacts.find(
      (contacto) => contacto.nombre?.charAt(0).toUpperCase() === letra
    );

    if (!contactoEncontrado) {
      return;
    }

    const indiceContacto = contacts.findIndex((contacto) => contacto.id === contactoEncontrado.id);
    const paginaDestino = Math.floor(indiceContacto / CONTACTOS_POR_PAGINA) + 1;
    const nodo = filasRef.current.get(contactoEncontrado.id);

    contactoPendienteRef.current = contactoEncontrado.id;
    setPaginaActual(paginaDestino);

    if (nodo) {
      nodo.scrollIntoView({ block: "center" });
      contactoPendienteRef.current = null;
    }
  }

  if (isLoading) {
    return <LoadingState mensaje="Cargando contactos..." />;
  }

  if (!contacts || contacts.length === 0) {
    return (
      <EmptyState
        titulo="No hay contactos"
        descripcion="No se encontraron contactos con los filtros actuales. Crea uno nuevo o ajusta la busqueda."
      />
    );
  }

  return (
    <div className="contacts-table-wrapper">
      <div className="contacts-table-container">
        <table className="contacts-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col" className="col-phone">Numero de telefono</th>
              <th scope="col" className="col-category">Categoria</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactosPaginados.map((contacto) => (
              <ContactRow
                key={contacto.id}
                contacto={contacto}
                isSelected={contacto.id === selectedContactId}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
                rowRef={(nodo) => registrarFila(contacto.id, nodo)}
              />
            ))}
          </tbody>
        </table>

        {totalPaginas > 1 && (
          <div className="contacts-pagination" aria-label="Paginacion de contactos">
            <p className="pagination-summary">
              Mostrando {primerContactoVisible}-{ultimoContactoVisible} de {contacts.length}
            </p>

            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setPaginaActual((pagina) => Math.max(1, pagina - 1))}
                disabled={paginaSegura === 1}
                aria-label="Ir a la pagina anterior"
              >
                &lsaquo;
              </button>

              {paginasVisibles.map((pagina) => (
                <button
                  key={pagina}
                  type="button"
                  className={`pagination-btn${pagina === paginaSegura ? " is-active" : ""}`}
                  onClick={() => setPaginaActual(pagina)}
                  aria-label={`Ir a la pagina ${pagina}`}
                  aria-current={pagina === paginaSegura ? "page" : undefined}
                >
                  {pagina}
                </button>
              ))}

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setPaginaActual((pagina) => Math.min(totalPaginas, pagina + 1))}
                disabled={paginaSegura === totalPaginas}
                aria-label="Ir a la pagina siguiente"
              >
                &rsaquo;
              </button>
            </div>
          </div>
        )}
      </div>

      <nav className="alphabet-nav" aria-label="Navegacion alfabetica de contactos">
        {ALFABETO.map((letra) => (
          <button
            key={letra}
            type="button"
            className={letrasDisponibles.has(letra) ? "" : "is-disabled"}
            disabled={!letrasDisponibles.has(letra)}
            onClick={() => irALetra(letra)}
            aria-label={`Ir a contactos que empiezan con ${letra}`}
          >
            {letra}
          </button>
        ))}
      </nav>
    </div>
  );
}
