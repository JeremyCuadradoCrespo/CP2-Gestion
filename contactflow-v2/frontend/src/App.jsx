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
