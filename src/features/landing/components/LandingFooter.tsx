import { BRAND_NAME, FOOTER_COLUMNS } from '../constants/landingContent';
import { BrandLogo } from './marketing/BrandLogo';
import { Container } from './marketing/Container';

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-outline-variant/25 bg-surface-container-lowest/80">
      <Container as="div" className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 sm:col-span-2 lg:col-span-2">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-on-surface-variant">
              Hệ thống phân tích và kiểm duyệt nội dung video bằng AI — giúp nền tảng giữ môi
              trường an toàn cho cộng đồng.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-on-surface-variant transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-outline-variant/20 pt-8 sm:flex-row">
          <p className="text-xs text-on-surface-variant">
            © {year} {BRAND_NAME}. Giải pháp kiểm duyệt video thông minh.
          </p>
          <div className="flex gap-4">
            {['public', 'alternate_email', 'code'].map((icon) => (
              <button
                key={icon}
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant/30 text-outline transition-colors hover:border-primary/40 hover:text-primary"
                aria-label={icon}
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
