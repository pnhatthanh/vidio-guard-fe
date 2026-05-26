export function AuthDivider({ label = 'hoặc' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-outline-variant/35" />
      <span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">{label}</span>
      <div className="h-px flex-1 bg-outline-variant/35" />
    </div>
  );
}
