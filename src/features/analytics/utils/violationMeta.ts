import type { Violation, ViolationType } from '../../../types';

export const VIOLATION_TYPE_LABEL: Record<ViolationType, string> = {
  violence: 'Bạo lực',
  explicit: 'Nội dung nhạy cảm',
  toxic: 'Ngôn từ toxic',
};

export const VIOLATION_TYPE_SUMMARY: Record<ViolationType, string> = {
  violence: 'Phát hiện hành vi bạo lực trong khung hình video.',
  explicit: 'Nội dung nhạy cảm được AI xác định với độ tin cậy cao.',
  toxic: 'Ngôn từ toxic trong audio / lời thoại được phát hiện.',
};

export function formatTimestamp(sec?: number): string {
  if (sec == null) return '—';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function formatTimestampRange(start?: number, end?: number): string {
  if (start == null) return '—';
  if (end == null || end <= start) return formatTimestamp(start);
  return `${formatTimestamp(start)} – ${formatTimestamp(end)}`;
}

export function getCategoryScores(violations: Violation[]): Record<ViolationType, number> {
  const scores: Record<ViolationType, number> = { violence: 0, explicit: 0, toxic: 0 };
  for (const v of violations) {
    scores[v.type] = Math.max(scores[v.type], v.confidenceScore);
  }
  return scores;
}

export function getSafetyStatusLabel(score: number, hasViolations: boolean): string {
  if (!hasViolations) return 'Không phát hiện vấn đề nghiêm trọng';
  if (score < 40) return 'Phát hiện vi phạm nghiêm trọng';
  if (score < 70) return 'Cần xem xét thủ công';
  return 'Một số cảnh báo nhẹ';
}
