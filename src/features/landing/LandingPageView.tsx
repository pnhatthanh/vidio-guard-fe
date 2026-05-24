import { CtaSection } from './components/CtaSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LandingBackground } from './components/LandingBackground';
import { LandingFooter } from './components/LandingFooter';
import { LandingNav } from './components/LandingNav';
import { SecuritySection } from './components/SecuritySection';

export function LandingPageView() {
  return (
    <div className="landing-page min-h-screen bg-background font-body text-on-surface">
      <LandingBackground />
      <LandingNav />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SecuritySection />
        <CtaSection />
      </main>

      <LandingFooter />
    </div>
  );
}
