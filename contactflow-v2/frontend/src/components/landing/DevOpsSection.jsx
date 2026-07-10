const devopsPractices = [
  {
    title: "Gestion de cambios",
    detail: "Cada mejora se incorpora de forma incremental para preservar la agenda existente."
  },
  {
    title: "Control de versiones",
    detail: "El codigo se organiza en commits trazables sobre la rama de desarrollo definida."
  },
  {
    title: "Integracion continua",
    detail: "El proyecto puede validar el frontend y el backend antes de publicar cambios."
  },
  {
    title: "Despliegue continuo",
    detail: "La arquitectura facilita preparar entregas repetibles para ambientes posteriores."
  },
  {
    title: "Reutilizacion de componentes",
    detail: "La interfaz se divide en piezas mantenibles para contactos y presentacion."
  },
  {
    title: "Variabilidad entre V1 y V2",
    detail: "La V2 representa una evolucion con reportes, categorias, REST y PostgreSQL."
  }
];

export default function DevOpsSection() {
  return (
    <section className="landing-section devops-section" id="devops" aria-labelledby="devops-title">
      <div className="section-heading">
        <p className="landing-eyebrow">DevOps</p>
        <h2 id="devops-title">Practicas aplicadas al ciclo de vida del sistema</h2>
        <p>
          La landing presenta ContactFlow V2 como evidencia de una aplicacion
          mantenible, versionada y preparada para automatizacion.
        </p>
      </div>

      <div className="devops-grid">
        {devopsPractices.map((practice) => (
          <article className="devops-item" key={practice.title}>
            <h3>{practice.title}</h3>
            <p>{practice.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
