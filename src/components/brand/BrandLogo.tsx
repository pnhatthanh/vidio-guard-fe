import { BRAND_NAME } from '../../constants/brand';

type BrandLogoProps = {
  size?: 'sm' | 'md';
  onDark?: boolean;
};

export function BrandLogo({ size = 'md', onDark = true }: BrandLogoProps) {
  const isSmall = size === 'sm';

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`brand-gradient flex items-center justify-center rounded-xl shadow-lg shadow-primary-container/30 ${
          isSmall ? 'h-8 w-8' : 'h-10 w-10'
        }`}
      >
        <span
          className="material-symbols-outlined text-white"
          style={{ fontVariationSettings: "'FILL' 1", fontSize: isSmall ? 18 : 22 }}
        >
          shield_with_heart
        </span>
      </div>
      <span
        className={`font-headline font-extrabold tracking-tight ${
          onDark ? 'text-on-surface' : 'text-slate-900'
        } ${isSmall ? 'text-lg' : 'text-xl'}`}
      >
        {BRAND_NAME}
      </span>
    </div>
  );
}
