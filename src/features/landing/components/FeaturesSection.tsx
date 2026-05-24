import { FEATURES } from '../constants/landingContent';
import { getFeatureAccentClasses } from '../utils/accentClasses';
import { Container } from './marketing/Container';
import { SectionHeader } from './marketing/SectionHeader';

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Khả năng AI"
          title="Phát hiện vi phạm đa chiều"
          description="Ba mô hình AI chuyên biệt — bạo lực, nội dung nhạy cảm và ngôn từ toxic — bắt được rủi ro mà bộ lọc thông thường bỏ sót."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const accent = getFeatureAccentClasses(feature.accent);
            return (
              <article
                key={feature.title}
                className={`landing-card group flex flex-col rounded-2xl border border-outline-variant/25 p-6 transition-all duration-300 hover:-translate-y-1 ${accent.glow} ${accent.border}`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${accent.icon}`}
                >
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface">{feature.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
