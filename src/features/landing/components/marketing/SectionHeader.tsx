type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl space-y-4 mb-16 ${alignClass}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-on-surface-variant text-base leading-relaxed">{description}</p>
      )}
    </div>
  );
}
