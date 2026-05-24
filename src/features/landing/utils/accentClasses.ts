import type { FeatureItem } from '../types/landing.types';

const ACCENT_MAP: Record<
  FeatureItem['accent'],
  { icon: string; glow: string; border: string }
> = {
  primary: {
    icon: 'bg-primary-container/20 text-primary group-hover:bg-primary-container group-hover:text-white',
    glow: 'group-hover:shadow-[0_0_24px_rgba(0,82,255,0.35)]',
    border: 'group-hover:border-primary-container/40',
  },
  tertiary: {
    icon: 'bg-tertiary-container/20 text-tertiary group-hover:bg-tertiary-container group-hover:text-white',
    glow: 'group-hover:shadow-[0_0_24px_rgba(205,0,60,0.3)]',
    border: 'group-hover:border-tertiary-container/40',
  },
  secondary: {
    icon: 'bg-secondary-container/40 text-secondary group-hover:bg-secondary-container group-hover:text-on-surface',
    glow: 'group-hover:shadow-[0_0_24px_rgba(58,74,95,0.5)]',
    border: 'group-hover:border-secondary-container/50',
  },
  warning: {
    icon: 'bg-amber-500/15 text-amber-300 group-hover:bg-amber-500 group-hover:text-slate-900',
    glow: 'group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
    border: 'group-hover:border-amber-500/30',
  },
};

export function getFeatureAccentClasses(accent: FeatureItem['accent']) {
  return ACCENT_MAP[accent];
}
