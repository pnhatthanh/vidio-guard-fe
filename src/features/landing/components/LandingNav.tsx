import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants/landingContent';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollToSection } from '../hooks/useScrollToSection';
import type { LandingSectionId } from '../types/landing.types';
import { BrandLogo } from './marketing/BrandLogo';
import { Container } from './marketing/Container';
import { GradientButton } from './marketing/GradientButton';

const SPY_SECTIONS: LandingSectionId[] = ['features', 'how-it-works', 'security', 'pricing'];

export function LandingNav() {
  const navigate = useNavigate();
  const scrollTo = useScrollToSection();
  const activeId = useScrollSpy(SPY_SECTIONS);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/20 bg-background/75 backdrop-blur-xl">
      <Container as="div" className="flex h-16 items-center justify-between">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="sm" />
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeId === link.id
                  ? 'bg-primary-container/15 text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <GradientButton variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Đăng nhập
          </GradientButton>
          <GradientButton size="sm" onClick={() => scrollTo('signup')}>
            Bắt đầu
          </GradientButton>
        </div>
      </Container>
    </nav>
  );
}
