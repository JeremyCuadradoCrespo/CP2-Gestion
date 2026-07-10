export default function LandingFeatures() {
    const features = [
        {
            title: "Registro de contactos",
            description:
                "Permite guardar contactos con nombre, apellido, teléfono y correo.",
        },
        {
            title: "Listado dinámico",
            description:
                "Consulta los contactos registrados directamente desde el backend.",
        },
        {
            title: "Persistencia real",
            description:
                "Los datos se almacenan en PostgreSQL mediante una API REST.",
        },
        {
            title: "Entorno DevOps",
            description:
                "Proyecto preparado para control de versiones, CI y despliegue.",
        },
    ];

    return (
        <main id="caracteristicas" className="landing-features">
            <div className="landing-section-heading">
                <span className="landing-section-kicker">Características</span>
                <h2>Una agenda básica, clara y desplegable</h2>
                <p>
                    ContactFlow V1 representa la primera versión funcional del sistema,
                    enfocada en operaciones esenciales de gestión de contactos.
                </p>
            </div>

            <div className="landing-feature-grid">
                {features.map((feature) => (
                    <article key={feature.title} className="landing-feature-card">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </article>
                ))}
            </div>
        </main>
    );
}