import { useCallback, useEffect, useState } from "react";
import AppHeader from "../AppHeader.jsx";
import Sidebar from "../Sidebar.jsx";
import ContactModal from "../ContactModal.jsx";
import ImportModal from "../ImportModal.jsx";
import ContactTable from "../ContactTable.jsx";
import ContactDetailsPanel from "../ContactDetailsPanel.jsx";
import ReportPanel from "../ReportPanel.jsx";
import CategoryFilter from "../CategoryFilter.jsx";
import StatusMessage from "../StatusMessage.jsx";
import {
  getContacts,
  getTrash,
  createContact,
  updateContact,
  toggleFavorite,
  deleteContact,
  restoreContact,
  deleteContactPermanently,
  importContacts
} from "../../api/contactApi.js";
import { getSummaryReport } from "../../api/reportApi.js";

const THEME_STORAGE_KEY = "contactflow-theme";

const VISTA_TITULOS = {
  todos: "Contactos",
  frecuentes: "Frecuentes",
  otros: "Otros contactos",
  papelera: "Papelera"
};

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ContactsApp({ onBackToLanding }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [view, setView] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReportLoading, setIsReportLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      if (view === "papelera") {
        const respuesta = await getTrash();
        setContacts(respuesta.data);
      } else {
        const favorito = view === "frecuentes" ? true : view === "otros" ? false : undefined;
        const respuesta = await getContacts({ search: searchTerm, category: selectedCategory, favorito });
        setContacts(respuesta.data);
      }
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, view]);

  const loadReport = useCallback(async () => {
    setIsReportLoading(true);
    try {
      const respuesta = await getSummaryReport();
      setReport(respuesta.data);
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    } finally {
      setIsReportLoading(false);
    }
  }, []);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      loadContacts();
    }, 300);

    return () => clearTimeout(temporizador);
  }, [loadContacts]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  function handleOpenCreateModal() {
    setEditingContact(null);
    setIsModalOpen(true);
    setIsSidebarOpen(false);
  }

  function handleOpenEditModal(contacto) {
    setEditingContact(contacto);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingContact(null);
  }

  async function handleCreateContact(datos) {
    setIsSaving(true);
    try {
      await createContact(datos);
      setStatusMessage({ tipo: "exito", texto: "Contacto creado correctamente." });
      handleCloseModal();
      await Promise.all([loadContacts(), loadReport()]);
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateContact(id, datos) {
    setIsSaving(true);
    try {
      const respuesta = await updateContact(id, datos);
      setStatusMessage({ tipo: "exito", texto: "Contacto actualizado correctamente." });
      handleCloseModal();

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(respuesta.data);
      }

      await Promise.all([loadContacts(), loadReport()]);
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    } finally {
      setIsSaving(false);
    }
  }

  function handleFormSubmit(datos) {
    if (editingContact) {
      handleUpdateContact(editingContact.id, datos);
    } else {
      handleCreateContact(datos);
    }
  }

  async function handleDeleteContact(id) {
    setStatusMessage(null);
    try {
      await deleteContact(id);
      setStatusMessage({ tipo: "exito", texto: "Contacto movido a la papelera." });

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
      }

      if (editingContact && editingContact.id === id) {
        handleCloseModal();
      }

      await Promise.all([loadContacts(), loadReport()]);
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    }
  }

  async function handleToggleFavorite(contacto) {
    setStatusMessage(null);
    try {
      const respuesta = await toggleFavorite(contacto.id, !contacto.favorito);

      if (selectedContact && selectedContact.id === contacto.id) {
        setSelectedContact(respuesta.data);
      }

      await loadContacts();
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    }
  }

  async function handleRestoreContact(id) {
    setStatusMessage(null);
    try {
      await restoreContact(id);
      setStatusMessage({ tipo: "exito", texto: "Contacto restaurado correctamente." });

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
      }

      await Promise.all([loadContacts(), loadReport()]);
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    }
  }

  async function handlePermanentDelete(id) {
    setStatusMessage(null);
    try {
      await deleteContactPermanently(id);
      setStatusMessage({ tipo: "exito", texto: "Contacto eliminado definitivamente." });

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
      }

      await loadContacts();
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    }
  }

  function handleSelectContact(contacto) {
    setSelectedContact(contacto);
  }

  function handleCategoryChange(categoria) {
    setSelectedCategory(categoria);
    setIsSidebarOpen(false);
  }

  function handleViewChange(nuevaVista) {
    setView(nuevaVista);
    setSelectedContact(null);
    setIsSidebarOpen(false);
  }

  function handleOpenImport() {
    setImportResult(null);
    setIsImportModalOpen(true);
    setIsSidebarOpen(false);
  }

  function handleCloseImport() {
    setIsImportModalOpen(false);
    setImportResult(null);
  }

  async function handleImportContacts(contactos) {
    setIsImporting(true);
    setStatusMessage(null);
    try {
      const respuesta = await importContacts(contactos);
      setImportResult(respuesta.data);
      setStatusMessage({
        tipo: "exito",
        texto: `${respuesta.data.creados.length} contactos importados correctamente.`
      });
      await Promise.all([loadContacts(), loadReport()]);
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    } finally {
      setIsImporting(false);
    }
  }

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app-shell">
      <AppHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onToggleSidebar={() => setIsSidebarOpen((previo) => !previo)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onBackToLanding={onBackToLanding}
      />

      <div className="app-body">
        <Sidebar
          isOpen={isSidebarOpen}
          totalContacts={report ? report.total : contacts.length}
          activeView={view}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onViewChange={handleViewChange}
          onCreateContact={handleOpenCreateModal}
          onOpenImport={handleOpenImport}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />

        <main className="main-content">
          <section className="contacts-section" aria-labelledby="contacts-title">
            <StatusMessage message={statusMessage} />

            <ReportPanel resumen={report} isLoading={isReportLoading} />

            <div className="contacts-heading">
              <h1 id="contacts-title">{VISTA_TITULOS[view]}</h1>
              <span className="contacts-count">{contacts.length} contactos</span>
            </div>

            {view !== "papelera" && (
              <div className="contacts-toolbar">
                <CategoryFilter value={selectedCategory} onChange={handleCategoryChange} />
              </div>
            )}

            <ContactTable
              contacts={contacts}
              isLoading={isLoading}
              view={view}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteContact}
              onSelect={handleSelectContact}
              onToggleFavorite={handleToggleFavorite}
              onRestore={handleRestoreContact}
              onPermanentDelete={handlePermanentDelete}
              selectedContactId={selectedContact?.id}
            />
          </section>
        </main>

        <ContactDetailsPanel
          contact={selectedContact}
          view={view}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteContact}
          onRestore={handleRestoreContact}
          onPermanentDelete={handlePermanentDelete}
          onClose={() => setSelectedContact(null)}
        />
      </div>

      <ImportModal
        isOpen={isImportModalOpen}
        onImport={handleImportContacts}
        onCancel={handleCloseImport}
        isImporting={isImporting}
        resultado={importResult}
      />

      <ContactModal
        isOpen={isModalOpen}
        mode={editingContact ? "edit" : "create"}
        initialData={editingContact}
        onSubmit={handleFormSubmit}
        onCancel={handleCloseModal}
        isSaving={isSaving}
      />

      <footer className="app-footer">
        <p>Proyecto academico - ContactFlow V2, agenda de contactos avanzada con arquitectura full stack.</p>
      </footer>
    </div>
  );
}
