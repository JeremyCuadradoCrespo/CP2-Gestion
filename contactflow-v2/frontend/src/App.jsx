import { useCallback, useEffect, useState } from "react";
import AppHeader from "./components/layout/AppHeader.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import ContactModal from "./components/contacts/ContactModal.jsx";
import ContactTable from "./components/contacts/ContactTable.jsx";
import ContactDetailsPanel from "./components/contacts/ContactDetailsPanel.jsx";
import ReportPanel from "./components/contacts/ReportPanel.jsx";
import CategoryFilter from "./components/filters/CategoryFilter.jsx";
import StatusMessage from "./components/feedback/StatusMessage.jsx";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from "./api/contactApi.js";
import { getSummaryReport } from "./api/reportApi.js";

const THEME_STORAGE_KEY = "contactflow-theme";

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const respuesta = await getContacts({ search: searchTerm, category: selectedCategory });
      setContacts(respuesta.data);
    } catch (error) {
      setStatusMessage({ tipo: "error", texto: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory]);

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
      setStatusMessage({ tipo: "exito", texto: "Contacto eliminado correctamente." });

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

  function handleSelectContact(contacto) {
    setSelectedContact(contacto);
  }

  function handleCategoryChange(categoria) {
    setSelectedCategory(categoria);
    setIsSidebarOpen(false);
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
      />

      <div className="app-body">
        <Sidebar
          isOpen={isSidebarOpen}
          totalContacts={report ? report.total : contacts.length}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onCreateContact={handleOpenCreateModal}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />

        <main className="main-content">
          <section className="contacts-section" aria-labelledby="contacts-title">
            <StatusMessage message={statusMessage} />

            <ReportPanel resumen={report} isLoading={isReportLoading} />

            <div className="contacts-heading">
              <h1 id="contacts-title">Contactos</h1>
              <span className="contacts-count">{contacts.length} contactos</span>
            </div>

            <div className="contacts-toolbar">
              <CategoryFilter value={selectedCategory} onChange={handleCategoryChange} />
            </div>

            <ContactTable
              contacts={contacts}
              isLoading={isLoading}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteContact}
              onSelect={handleSelectContact}
              selectedContactId={selectedContact?.id}
            />
          </section>
        </main>

        <ContactDetailsPanel
          contact={selectedContact}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteContact}
          onClose={() => setSelectedContact(null)}
        />
      </div>

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
