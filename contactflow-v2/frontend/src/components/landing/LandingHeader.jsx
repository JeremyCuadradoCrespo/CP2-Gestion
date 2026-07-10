const navigationItems = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#arquitectura", label: "Arquitectura" },
  { href: "#devops", label: "DevOps" },
  { href: "#metricas", label: "Metricas" }
];

export default function LandingHeader({ onEnterApp }) {
  return (
    <header className="landing-header" aria-label="Presentacion de ContactFlow V2">
      <a className="landing-brand" href="#inicio" aria-label="ContactFlow V2 - inicio">
        <span className="landing-brand-mark" aria-hidden="true">CF</span>
        <span>ContactFlow V2</span>
      </a>

      <nav className="landing-nav" aria-label="Secciones de la landing">
        {navigationItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <button type="button" className="landing-header-action" onClick={onEnterApp}>
        Ingresar a la agenda
      </button>
    </header>
  );
}
