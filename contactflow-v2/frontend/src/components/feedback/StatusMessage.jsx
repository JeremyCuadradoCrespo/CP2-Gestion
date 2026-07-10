export default function StatusMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={`status-message status-${message.tipo}`}
      role="status"
      aria-live="polite"
    >
      {message.texto}
    </p>
  );
}
