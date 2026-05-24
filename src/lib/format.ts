export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export function formatDateTime(iso?: string | null): string {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatDuration(sec?: number | null): string {
  if (sec == null || !Number.isFinite(sec)) return '--:--';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function formatStageLabel(stage: string): string {
  const map: Record<string, string> = {
    starting: 'Khởi động',
    frame_extraction: 'Trích frame',
    audio_extraction: 'Trích âm thanh',
    frame_analysis: 'Phân tích hình',
    audio_analysis: 'Phân tích âm thanh',
    aggregation: 'Tổng hợp',
    completed: 'Hoàn tất',
    failed: 'Thất bại',
  };
  return map[stage] ?? stage;
}
