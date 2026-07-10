import { useCallback, useEffect, useState } from "react";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact
} from "../api/contactApi.js";
import { getSummaryReport } from "../api/reportApi.js";

const THEME_STORAGE_KEY = "contactflow-theme";

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function useContactFlow() {
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

  async function handleFormSubmit(datos) {
    if (editingContact) {
      await handleUpdateContact(editingContact.id, datos);
      return;
    }

    await handleCreateContact(datos);
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

  function handleSearchChange(valor) {
    setSearchTerm(valor);
  }

  function handleSelectContact(contacto) {
    setSelectedContact(contacto);
  }

  function handleCloseDetails() {
    setSelectedContact(null);
  }

  function handleCategoryChange(categoria) {
    setSelectedCategory(categoria);
    setIsSidebarOpen(false);
  }

  function handleToggleSidebar() {
    setIsSidebarOpen((previo) => !previo);
  }

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return {
    state: {
      contacts,
      editingContact,
      isLoading,
      isModalOpen,
      isReportLoading,
      isSaving,
      isSidebarOpen,
      report,
      searchTerm,
      selectedCategory,
      selectedContact,
      statusMessage,
      theme
    },
    actions: {
      handleCategoryChange,
      handleCloseDetails,
      handleCloseModal,
      handleCloseSidebar,
      handleDeleteContact,
      handleFormSubmit,
      handleOpenCreateModal,
      handleOpenEditModal,
      handleSearchChange,
      handleSelectContact,
      handleToggleSidebar,
      handleToggleTheme
    }
  };
}
