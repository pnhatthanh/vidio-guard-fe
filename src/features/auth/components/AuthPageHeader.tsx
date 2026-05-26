import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../landing/components/marketing/BrandLogo';
import { Container } from '../../landing/components/marketing/Container';
import { GradientButton } from '../../landing/components/marketing/GradientButton';

function scrollToSignup() {
  document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function AuthPageHeader() {
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  const goSignup = () => {
    navigate('/');
    window.setTimeout(scrollToSignup, 120);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/20 bg-background/80 backdrop-blur-xl">
      <Container as="div" className="flex h-16 items-center justify-between">
        <button type="button" onClick={goHome} className="rounded-lg outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <BrandLogo size="sm" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <GradientButton variant="ghost" size="sm" onClick={goHome}>
            Trang chủ
          </GradientButton>
          <GradientButton size="sm" onClick={goSignup}>
            Đăng ký
          </GradientButton>
        </div>
      </Container>
    </header>
  );
}
