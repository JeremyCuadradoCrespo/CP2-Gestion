export default function EmptyState({ titulo, descripcion }) {
  return (
    <div className="state-panel">
      <span className="state-icon" aria-hidden="true">&#128101;</span>
      <p><strong>{titulo}</strong></p>
      <p>{descripcion}</p>
    </div>
  );
}
