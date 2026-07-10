export default function LoadingState({ mensaje }) {
  return (
    <div className="state-panel" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{mensaje || "Cargando..."}</p>
    </div>
  );
}
