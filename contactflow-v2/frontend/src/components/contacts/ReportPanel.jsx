export default function ReportPanel({ resumen, isLoading }) {
  if (isLoading) {
    return <p className="state-message" role="status">Cargando reporte...</p>;
  }

  if (!resumen) {
    return null;
  }

  const tarjetas = [
    { etiqueta: "Total", valor: resumen.total },
    { etiqueta: "Personal", valor: resumen.personal },
    { etiqueta: "Trabajo", valor: resumen.trabajo },
    { etiqueta: "Universidad", valor: resumen.universidad },
    { etiqueta: "Familia", valor: resumen.familia },
    { etiqueta: "Otro", valor: resumen.otro }
  ];

  return (
    <div className="report-panel">
      {tarjetas.map((tarjeta) => (
        <article className="report-card" key={tarjeta.etiqueta}>
          <span className="report-card-label">{tarjeta.etiqueta}</span>
          <span className="report-card-value">{tarjeta.valor}</span>
        </article>
      ))}
    </div>
  );
}
