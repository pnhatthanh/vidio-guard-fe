import React from 'react';
import { BRAND_TAGLINE, HERO_STATS } from '../constants/landingContent';
import { Container } from './marketing/Container';
import { GradientButton } from './marketing/GradientButton';
import { SignupCard } from './SignupCard';
import { useScrollToSection } from '../hooks/useScrollToSection';

export function HeroSection() {
  const scrollTo = useScrollToSection();

  return (
    <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-container/30 bg-primary-container/10 px-4 py-1.5">
              <span
                className="material-symbols-outlined text-sm text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {BRAND_TAGLINE}
              </span>
            </div>

            <h1 className="font-headline text-4xl font-extrabold leading-[1.08] tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
              Kiểm duyệt video thông minh với{' '}
              <span className="bg-gradient-to-r from-primary via-[#7b9fff] to-primary-container bg-clip-text text-transparent">
                AI đa mô hình
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Hệ thống phân tích và kiểm duyệt nội dung video tự động — phát hiện bạo lực, nội
              dung nhạy cảm và ngôn từ toxic với báo cáo chi tiết theo timeline.
            </p>

            <div className="flex flex-wrap gap-4">
              <GradientButton size="lg" onClick={() => scrollTo('signup')}>
                Dùng thử miễn phí
              </GradientButton>
              <GradientButton variant="secondary" size="lg" onClick={() => scrollTo('how-it-works')}>
                Xem quy trình
              </GradientButton>
            </div>

            <div className="flex flex-wrap items-center gap-8 border-t border-outline-variant/30 pt-8">
              {HERO_STATS.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && <div className="hidden h-10 w-px bg-outline-variant/50 sm:block" />}
                  <div>
                    <p className="font-headline text-2xl font-bold text-primary sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                      {stat.label}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="animate-fade-in lg:animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <SignupCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
