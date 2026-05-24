import { TRUST_BADGES } from '../constants/landingContent';
import { Container } from './marketing/Container';

export function SecuritySection() {
  return (
    <section id="security" className="relative border-y border-outline-variant/20 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="font-headline text-2xl font-bold text-on-surface sm:text-3xl">
              Bảo mật cấp doanh nghiệp
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
              Video và metadata được mã hóa, xử lý trong môi trường cách ly — đáp ứng chuẩn bảo mật
              quốc tế cho nền tảng UGC và streaming.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="landing-card flex flex-col items-center rounded-2xl border border-outline-variant/25 px-5 py-6 text-center transition-colors hover:border-primary-container/30"
              >
                <span className="material-symbols-outlined mb-3 text-3xl text-primary">
                  {badge.icon}
                </span>
                <span className="font-headline text-sm font-bold text-on-surface">{badge.label}</span>
                <span className="mt-1 text-[10px] uppercase tracking-wider text-on-surface-variant">
                  {badge.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
