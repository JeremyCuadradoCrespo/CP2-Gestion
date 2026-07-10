const architectureSteps = [
  {
    title: "Frontend React + Vite",
    detail: "Interfaz dinamica para consultar, crear, editar y filtrar contactos."
  },
  {
    title: "API REST con Express",
    detail: "Servicios HTTP que conectan la experiencia de usuario con la logica del backend."
  },
  {
    title: "Base de datos PostgreSQL",
    detail: "Persistencia relacional para contactos, categorias y reportes."
  },
  {
    title: "GitHub Actions",
    detail: "Automatizacion del flujo de integracion continua del proyecto."
  },
  {
    title: "Despliegue continuo",
    detail: "Preparacion del sistema para publicar cambios de forma controlada."
  }
];

export default function ArchitectureSection() {
  return (
    <section className="landing-section architecture-section" id="arquitectura" aria-labelledby="architecture-title">
      <div className="section-heading">
        <p className="landing-eyebrow">Arquitectura</p>
        <h2 id="architecture-title">Flujo tecnico full stack</h2>
        <p>
          ContactFlow V2 separa responsabilidades entre cliente, servicios REST,
          persistencia y automatizacion DevOps.
        </p>
      </div>

      <div className="architecture-flow" aria-label="Flujo de arquitectura de ContactFlow V2">
        {architectureSteps.map((step, index) => (
          <article className="architecture-step" key={step.title}>
            <span className="architecture-number">{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
            {index < architectureSteps.length - 1 ? (
              <span className="architecture-connector" aria-hidden="true">&darr;</span>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
