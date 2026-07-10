
import AppFooter from "./components/layout/AppFooter.jsx";
import AppHeader from "./components/layout/AppHeader.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import ContactModal from "./components/contacts/ContactModal.jsx";
import ContactTable from "./components/contacts/ContactTable.jsx";
import ContactDetailsPanel from "./components/contacts/ContactDetailsPanel.jsx";
import ReportPanel from "./components/contacts/ReportPanel.jsx";
import CategoryFilter from "./components/filters/CategoryFilter.jsx";
import StatusMessage from "./components/feedback/StatusMessage.jsx";
import useContactFlow from "./hooks/useContactFlow.js";

export default function App() {
  const { state, actions } = useContactFlow();

  return (
    <div className="app-shell">
      <AppHeader
        searchTerm={state.searchTerm}
        onSearchChange={actions.handleSearchChange}
        onToggleSidebar={actions.handleToggleSidebar}
        theme={state.theme}
        onToggleTheme={actions.handleToggleTheme}
      />

      <div className="app-body">
        <Sidebar
          isOpen={state.isSidebarOpen}
          totalContacts={state.report ? state.report.total : state.contacts.length}
          selectedCategory={state.selectedCategory}
          onCategoryChange={actions.handleCategoryChange}
          onCreateContact={actions.handleOpenCreateModal}
          onCloseSidebar={actions.handleCloseSidebar}
        />

        <main className="main-content">
          <section className="contacts-section" aria-labelledby="contacts-title">
            <StatusMessage message={state.statusMessage} />

            <ReportPanel resumen={state.report} isLoading={state.isReportLoading} />

            <div className="contacts-heading">
              <h1 id="contacts-title">Contactos</h1>
              <span className="contacts-count">{state.contacts.length} contactos</span>
            </div>

            <div className="contacts-toolbar">
              <CategoryFilter
                value={state.selectedCategory}
                onChange={actions.handleCategoryChange}
              />
            </div>

            <ContactTable
              contacts={state.contacts}
              isLoading={state.isLoading}
              onEdit={actions.handleOpenEditModal}
              onDelete={actions.handleDeleteContact}
              onSelect={actions.handleSelectContact}
              selectedContactId={state.selectedContact?.id}
            />
          </section>
        </main>

        <ContactDetailsPanel
          contact={state.selectedContact}
          onEdit={actions.handleOpenEditModal}
          onDelete={actions.handleDeleteContact}
          onClose={actions.handleCloseDetails}
        />
      </div>

      <ContactModal
        isOpen={state.isModalOpen}
        mode={state.editingContact ? "edit" : "create"}
        initialData={state.editingContact}
        onSubmit={actions.handleFormSubmit}
        onCancel={actions.handleCloseModal}
        isSaving={state.isSaving}
      />

      <AppFooter />
    </div>
  );

import { useState } from "react";
import ContactsApp from "./components/contacts/ContactsApp.jsx";
import LandingPage from "./components/landing/LandingPage.jsx";

export default function App() {
  const [currentView, setCurrentView] = useState("landing");

  if (currentView === "contacts") {
    return <ContactsApp onBackToLanding={() => setCurrentView("landing")} />;
  }

  return <LandingPage onEnterApp={() => setCurrentView("contacts")} />;
}
}