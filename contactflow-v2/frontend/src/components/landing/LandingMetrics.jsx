const metrics = [
  { value: "2", label: "versiones del sistema" },
  { value: "7", label: "endpoints principales" },
  { value: "5", label: "categorias de contactos" },
  { value: "4", label: "modulos: frontend, backend, base de datos y CI/CD" },
  { value: "1", label: "flujo DevOps automatizado" }
];

export default function LandingMetrics() {
  return (
    <section className="landing-section metrics-section" id="metricas" aria-labelledby="metrics-title">
      <div className="section-heading">
        <p className="landing-eyebrow">Metricas</p>
        <h2 id="metrics-title">Indicadores visuales del avance de ContactFlow</h2>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
