export default function LandingCTA({ onEnterApp }) {
  return (
    <section className="landing-section landing-cta" aria-labelledby="landing-cta-title">
      <div>
        <p className="landing-eyebrow">Agenda avanzada</p>
        <h2 id="landing-cta-title">
          Gestiona tus contactos con una plataforma moderna, trazable y preparada para DevOps.
        </h2>
      </div>

      <button type="button" className="landing-primary-action" onClick={onEnterApp}>
        Ingresar a la agenda
      </button>
    </section>
  );
}
