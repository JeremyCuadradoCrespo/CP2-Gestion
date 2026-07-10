export default function HeroSection({ onEnterApp }) {
  return (
    <section className="landing-section hero-section" id="inicio" aria-labelledby="landing-hero-title">
      <div className="hero-copy">
        <p className="landing-eyebrow">ContactFlow DevOps</p>
        <h1 id="landing-hero-title">ContactFlow V2</h1>
        <p className="hero-subtitle">Agenda profesional de contactos con arquitectura DevOps</p>
        <p className="hero-description">
          ContactFlow V2 es una aplicacion full stack para gestionar contactos mediante
          frontend React, backend Express, base de datos PostgreSQL, endpoints REST,
          integracion continua y despliegue continuo.
        </p>
        <div className="hero-actions" aria-label="Acciones principales">
          <button type="button" className="landing-primary-action" onClick={onEnterApp}>
            Ingresar a la agenda
          </button>
          <a className="landing-secondary-action" href="#funcionalidades">
            Ver funcionalidades
          </a>
        </div>
      </div>

      <div className="hero-panel" aria-label="Resumen tecnico de ContactFlow V2">
        <span>React + Vite</span>
        <span>API REST Express</span>
        <span>PostgreSQL</span>
        <span>GitHub Actions</span>
      </div>
    </section>
  );
}
