import { Link } from "react-router-dom";

export default function LandingHero() {
    return (
        <header className="landing-hero">
            <nav className="landing-navbar">
                <div className="landing-brand">
                    <span className="landing-brand-mark">CF</span>
                    <span className="landing-brand-name">ContactFlow</span>
                </div>

                <Link to="/contactos" className="landing-nav-link">
                    Ir a la agenda
                </Link>
            </nav>

            <section className="landing-hero-content">
                <div className="landing-hero-text">
                    <span className="landing-badge">ContactFlow V1</span>

                    <h1 className="landing-title">
                        Agenda de contactos simple con enfoque DevOps
                    </h1>

                    <p className="landing-description">
                        Registra, consulta y administra contactos desde una aplicación full
                        stack construida con React, Node.js, Express y PostgreSQL.
                    </p>

                    <div className="landing-actions">
                        <Link to="/contactos" className="landing-primary-button">
                            Gestionar contactos
                        </Link>

                        <a href="#caracteristicas" className="landing-secondary-button">
                            Ver características
                        </a>
                    </div>
                </div>

                <div className="landing-hero-card" aria-label="Resumen del sistema">
                    <div className="landing-card-header">
                        <span className="landing-card-dot"></span>
                        <span className="landing-card-dot"></span>
                        <span className="landing-card-dot"></span>
                    </div>

                    <div className="landing-card-body">
                        <p className="landing-card-label">Arquitectura</p>
                        <h2>React + Express + PostgreSQL</h2>

                        <ul className="landing-stack-list">
                            <li>Frontend con React + Vite</li>
                            <li>Backend con Node.js + Express</li>
                            <li>Base de datos PostgreSQL</li>
                            <li>Integración continua con GitHub Actions</li>
                        </ul>
                    </div>
                </div>
            </section>
        </header>
    );
}