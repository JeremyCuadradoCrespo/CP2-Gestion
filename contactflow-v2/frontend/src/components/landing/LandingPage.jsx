import LandingHeader from "./LandingHeader.jsx";
import HeroSection from "./HeroSection.jsx";
import ProblemSolutionSection from "./ProblemSolutionSection.jsx";
import FeatureSection from "./FeatureSection.jsx";
import ArchitectureSection from "./ArchitectureSection.jsx";
import DevOpsSection from "./DevOpsSection.jsx";
import LandingMetrics from "./LandingMetrics.jsx";
import LandingCTA from "./LandingCTA.jsx";
import LandingFooter from "./LandingFooter.jsx";

export default function LandingPage({ onEnterApp }) {
  return (
    <div className="landing-page">
      <LandingHeader onEnterApp={onEnterApp} />
      <main>
        <section className="landing-entry" aria-labelledby="landing-entry-title">
          <p className="landing-eyebrow">ContactFlow DevOps</p>
          <h1 id="landing-entry-title">ContactFlow V2</h1>
          <p>Presentacion profesional del sistema antes de ingresar a la agenda de contactos.</p>
          <button type="button" className="landing-primary-action" onClick={onEnterApp}>
            Ingresar a la agenda
          </button>
        </section>
        <HeroSection />
        <ProblemSolutionSection />
        <FeatureSection />
        <ArchitectureSection />
        <DevOpsSection />
        <LandingMetrics />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
