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
      <a className="landing-skip-link" href="#contenido-landing">
        Saltar al contenido
      </a>
      <LandingHeader onEnterApp={onEnterApp} />
      <main id="contenido-landing">
        <HeroSection onEnterApp={onEnterApp} />
        <ProblemSolutionSection />
        <FeatureSection />
        <ArchitectureSection />
        <DevOpsSection />
        <LandingMetrics />
        <LandingCTA onEnterApp={onEnterApp} />
      </main>
      <LandingFooter />
    </div>
  );
}
