import type { VideoListItem, VideoStatusResponse, ViolationSegment, VerdictDetail } from '../api/types';
import type { SeverityLevel, Video, VideoStatus, Violation, ViolationType } from '../types';
import { formatBytes, formatDateTime } from './format';
import { isViolatedVerdict, normalizeVerdict, verdictLabelVi } from './verdict';

function mapCategoryToViolationType(category: string): ViolationType {
  switch (category) {
    case 'nudity':
      return 'explicit';
    case 'violence':
      return 'violence';
    case 'hate_speech':
    default:
      return 'toxic';
  }
}

function mapSeverity(peakScore: number, violated: boolean): SeverityLevel {
  if (!violated) return 'safe';
  if (peakScore >= 0.8) return 'critical';
  if (peakScore >= 0.5) return 'warning';
  return 'info';
}

function riskToSafetyScore(riskScore?: number): number {
  if (riskScore == null) return 100;
  return Math.round(Math.max(0, Math.min(100, (1 - riskScore) * 100)));
}

function mapApiStatus(status: string, violated?: boolean): VideoStatus {
  switch (status) {
    case 'processing':
    case 'uploaded':
      return 'processing';
    case 'failed':
      return 'error';
    case 'completed':
      return violated ? 'completed' : 'cleared';
    default:
      return 'completed';
  }
}

function segmentToViolation(seg: ViolationSegment, index: number): Violation {
  const confidence = Math.round(seg.peak_score * 100);
  return {
    id: `${seg.source}-${seg.category}-${index}`,
    type: mapCategoryToViolationType(seg.category),
    description: seg.evidence || `${seg.category} (${seg.source})`,
    confidenceScore: confidence,
    timestamp: Math.floor(seg.start_sec),
    endTimestamp: Math.floor(seg.end_sec),
    severity: mapSeverity(seg.peak_score, true),
  };
}

function verdictFromDetail(verdict?: VerdictDetail) {
  const raw = normalizeVerdict(verdict?.verdict);
  const violated = verdict?.violated ?? isViolatedVerdict(raw);
  return { verdict: raw, violated, label: verdictLabelVi(raw) };
}

export function mapListItemToVideo(item: VideoListItem): Video {
  const verdict = normalizeVerdict(item.verdict);
  const violated = item.violated ?? isViolatedVerdict(verdict);

  return {
    id: item.video_id,
    videoUrl: item.video_url,
    filename: item.original_filename,
    size: formatBytes(item.file_size_bytes),
    resolution: '—',
    status: mapApiStatus(item.status, violated),
    uploadedAt: formatDateTime(item.uploaded_at),
    uploadedAtIso: item.uploaded_at,
    processedAtIso: item.processed_at ?? undefined,
    processedAt: item.processed_at ? formatDateTime(item.processed_at) : undefined,
    violated,
    verdict,
    duration: undefined,
    violations: [],
    violationCount: item.violation_count ?? 0,
    safetyScore: riskToSafetyScore(item.risk_score),
    progressPercent: item.progress_percent,
    stage: item.stage,
    verdictLabel: verdictLabelVi(verdict),
  };
}

export function mapStatusToVideo(data: VideoStatusResponse): Video {
  const { verdict: rawVerdict, violated, label } = verdictFromDetail(data.verdict);
  const segments = data.violation_segments ?? [];

  return {
    id: data.video_id,
    filename: data.original_filename,
    size: '—',
    resolution: '—',
    status: mapApiStatus(data.status, violated),
    uploadedAt: formatDateTime(data.uploaded_at),
    uploadedAtIso: data.uploaded_at,
    processedAtIso: data.processed_at ?? undefined,
    processedAt: data.processed_at ? formatDateTime(data.processed_at) : undefined,
    violated,
    verdict: rawVerdict,
    duration: data.verdict?.video_duration_sec,
    violations: segments.map(segmentToViolation),
    violationCount: segments.length,
    safetyScore: riskToSafetyScore(data.verdict?.risk_score),
    videoUrl: data.video_url,
    transcript: data.verdict?.transcript,
    verdictLabel: label,
    progressPercent: data.progress_percent,
    stage: data.stage,
  };
}

/** Chart data từ violation segments */
export function buildTimelineChartData(
  segments: ViolationSegment[],
  durationSec = 300,
): { second: number; violation: number }[] {
  const points = 30;
  const step = Math.max(1, Math.floor(durationSec / points));
  return Array.from({ length: points }, (_, i) => {
    const second = i * step;
    let max = 0;
    for (const seg of segments) {
      if (second >= seg.start_sec && second <= seg.end_sec) {
        max = Math.max(max, seg.peak_score * 100);
      }
    }
    return { second, violation: max };
  });
}
