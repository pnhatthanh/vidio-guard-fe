import { VALUE_PROPS } from '../constants/landingContent';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { Container } from './marketing/Container';
import { GradientButton } from './marketing/GradientButton';

export function CtaSection() {
  const scrollTo = useScrollToSection();

  return (
    <section id="pricing" className="relative py-24 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="landing-cta-panel relative overflow-hidden rounded-3xl p-10 lg:col-span-3 lg:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="relative space-y-6">
              <h2 className="font-headline text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Không chỉ chặn nội dung — hiểu sức khỏe nền tảng
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-blue-100/90">
                Vigilant Lens cung cấp ngữ cảnh, điểm tin cậy và xu hướng vi phạm — giúp đội Trust &
                Safety ra quyết định nhanh và chính xác hơn.
              </p>
              <GradientButton
                variant="secondary"
                size="lg"
                className="!bg-white !text-primary-container hover:!bg-blue-50 border-0"
                onClick={() => scrollTo('signup')}
              >
                Bắt đầu dùng thử
              </GradientButton>
            </div>
          </div>

          <div className="grid gap-5 lg:col-span-2">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className="landing-card flex gap-5 rounded-2xl border border-outline-variant/25 p-6"
              >
                <span className="material-symbols-outlined shrink-0 text-3xl text-primary">
                  {prop.icon}
                </span>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">{prop.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                    {prop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
