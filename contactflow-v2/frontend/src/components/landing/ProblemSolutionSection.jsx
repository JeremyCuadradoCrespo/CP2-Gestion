export default function ProblemSolutionSection() {
  return (
    <section className="landing-section problem-solution-section" aria-labelledby="problem-solution-title">
      <div className="section-heading">
        <p className="landing-eyebrow">Problema y solucion</p>
        <h2 id="problem-solution-title">Una agenda con enfoque de gestion de configuracion</h2>
      </div>

      <div className="problem-solution-grid">
        <article className="landing-card">
          <span className="landing-card-label">Problema</span>
          <h3>Agendas simples con poca trazabilidad</h3>
          <p>
            Muchas agendas permiten guardar datos, pero no muestran una estructura clara
            para clasificar contactos, consultar reportes o automatizar el ciclo de
            desarrollo del sistema.
          </p>
        </article>

        <article className="landing-card landing-card-accent">
          <span className="landing-card-label">Solucion</span>
          <h3>ContactFlow como sistema estructurado</h3>
          <p>
            ContactFlow V2 organiza contactos por categorias, mantiene persistencia en
            PostgreSQL y demuestra practicas de Gestion de Configuracion de Software
            aplicadas a una aplicacion full stack.
          </p>
        </article>
      </div>
    </section>
  );
}
