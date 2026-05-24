export type LandingSectionId =
  | 'features'
  | 'how-it-works'
  | 'security'
  | 'pricing'
  | 'signup';

export type NavLink = {
  id: LandingSectionId;
  label: string;
};

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
  accent: 'primary' | 'tertiary' | 'secondary' | 'warning';
};

export type WorkflowStep = {
  step: number;
  icon: string;
  title: string;
  description: string;
};

export type TrustBadge = {
  icon: string;
  label: string;
  description: string;
};

export type ValueProp = {
  icon: string;
  title: string;
  description: string;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type HeroStat = {
  value: string;
  label: string;
};
