const features = [
  "Registro de contactos.",
  "Busqueda avanzada.",
  "Filtro por categorias.",
  "Edicion y eliminacion.",
  "Reportes por categoria.",
  "Panel de detalles.",
  "API REST.",
  "Persistencia en PostgreSQL."
];

export default function FeatureSection() {
  return (
    <section className="landing-section feature-section" id="funcionalidades" aria-labelledby="features-title">
      <div className="section-heading">
        <p className="landing-eyebrow">Funcionalidades</p>
        <h2 id="features-title">Capacidades principales de ContactFlow V2</h2>
        <p>
          La version avanzada mantiene la gestion de contactos y agrega una presentacion
          clara de sus modulos, datos y servicios.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <article className="feature-card" key={feature}>
            <span className="feature-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{feature}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
