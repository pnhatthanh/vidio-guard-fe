import type { VerdictLabel } from '../api/types';

export function normalizeVerdict(raw?: string | null): VerdictLabel | undefined {
  if (raw === 'safe' || raw === 'warning' || raw === 'violation') return raw;
  return undefined;
}

export function verdictLabelVi(verdict?: VerdictLabel | string | null): string {
  switch (verdict) {
    case 'safe':
      return 'An toàn';
    case 'warning':
      return 'Cảnh báo';
    case 'violation':
      return 'Vi phạm';
    default:
      return '—';
  }
}

export function isViolatedVerdict(verdict?: VerdictLabel | string | null, violated?: boolean): boolean {
  if (violated != null) return violated;
  return verdict === 'warning' || verdict === 'violation';
}
