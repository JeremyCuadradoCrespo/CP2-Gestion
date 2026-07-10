const currentYear = new Date().getFullYear();

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div>
          <p className="app-footer-kicker">Proyecto academico</p>
          <p className="app-footer-title">ContactFlow V2</p>
        </div>

        <p className="app-footer-description">
          Agenda de contactos avanzada con arquitectura full stack.
        </p>

        <span className="app-footer-meta">© {currentYear}</span>
      </div>
    </footer>
  );
}
