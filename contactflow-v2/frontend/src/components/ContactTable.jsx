import { useMemo, useRef } from "react";
import ContactRow from "./ContactRow.jsx";
import LoadingState from "./LoadingState.jsx";
import EmptyState from "./EmptyState.jsx";

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ContactTable({
  contacts,
  isLoading,
  view = "todos",
  onEdit,
  onDelete,
  onSelect,
  onToggleFavorite,
  onRestore,
  onPermanentDelete,
  selectedContactId
}) {
  const filasRef = useRef(new Map());

  const letrasDisponibles = useMemo(() => {
    const letras = new Set(
      contacts.map((contacto) => contacto.nombre?.charAt(0).toUpperCase()).filter(Boolean)
    );
    return letras;
  }, [contacts]);

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

    const nodo = filasRef.current.get(contactoEncontrado.id);

    if (nodo) {
      nodo.scrollIntoView({ block: "center" });
    }
  }

  if (isLoading) {
    return <LoadingState mensaje="Cargando contactos..." />;
  }

  if (!contacts || contacts.length === 0) {
    return (
      <EmptyState
        titulo={view === "papelera" ? "La papelera esta vacia" : "No hay contactos"}
        descripcion={
          view === "papelera"
            ? "Los contactos eliminados apareceran aqui y podras restaurarlos o borrarlos definitivamente."
            : "No se encontraron contactos con los filtros actuales. Crea uno nuevo o ajusta la busqueda."
        }
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
            {contacts.map((contacto) => (
              <ContactRow
                key={contacto.id}
                contacto={contacto}
                isSelected={contacto.id === selectedContactId}
                view={view}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
                onToggleFavorite={onToggleFavorite}
                onRestore={onRestore}
                onPermanentDelete={onPermanentDelete}
                rowRef={(nodo) => registrarFila(contacto.id, nodo)}
              />
            ))}
          </tbody>
        </table>
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
