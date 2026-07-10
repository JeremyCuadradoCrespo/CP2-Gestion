export default function ReportPanel({ resumen, isLoading }) {
  if (isLoading) {
    return <p className="state-message" role="status">Cargando reporte...</p>;
  }

  if (!resumen) {
    return null;
  }

  const tarjetas = [
    { etiqueta: "Total", valor: resumen.total, estilo: "total" },
    { etiqueta: "Personal", valor: resumen.personal, estilo: "personal" },
    { etiqueta: "Trabajo", valor: resumen.trabajo, estilo: "trabajo" },
    { etiqueta: "Universidad", valor: resumen.universidad, estilo: "universidad" },
    { etiqueta: "Familia", valor: resumen.familia, estilo: "familia" },
    { etiqueta: "Otro", valor: resumen.otro, estilo: "otro" }
  ];

  return (
    <section className="report-panel" aria-label="Resumen de contactos">
      <div className="report-panel-heading">
        <span>Resumen de contactos</span>
        <span>{resumen.total} en total</span>
      </div>
      <div className="report-panel-cards">
        {tarjetas.map((tarjeta) => (
          <article className={`report-card report-card--${tarjeta.estilo}`} key={tarjeta.etiqueta}>
            <span className="report-card-label">{tarjeta.etiqueta}</span>
            <strong className="report-card-value">{tarjeta.valor}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
