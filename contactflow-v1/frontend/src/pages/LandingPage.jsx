import LandingHero from "../components/landing/Hero.jsx";
import LandingFeatures from "../components/landing/Features.jsx";
import LandingFooter from "../components/landing/Footer.jsx";

export default function LandingPage() {
    return (
        <div className="landing-page">
            <LandingHero />
            <LandingFeatures />
            <LandingFooter />
        </div>
    );
}