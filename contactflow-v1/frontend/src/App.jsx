import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import ContactsPage from "./pages/ContactPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contactos" element={<ContactsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}