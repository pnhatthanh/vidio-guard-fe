import { useCallback, useEffect, useState } from 'react';
import { videosApi } from '../../../api/videos';
import { getErrorMessage } from '../../../api/errors';
import { buildTimelineChartData, mapStatusToVideo } from '../../../lib/videoMappers';
import type { Video } from '../../../types';

const POLL_MS = 3000;

export function useVideoDetail(videoId: string | undefined) {
  const [video, setVideo] = useState<Video | null>(null);
  const [chartData, setChartData] = useState<{ second: number; violation: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!videoId) return null;
    const data = await videosApi.getStatus(videoId);
    const mapped = mapStatusToVideo(data);
    setChartData(
      buildTimelineChartData(
        data.violation_segments ?? [],
        data.verdict?.video_duration_sec ?? mapped.duration ?? 300,
      ),
    );
    setVideo(mapped);
    return data.status;
  }, [videoId]);

  useEffect(() => {
    if (!videoId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setInterval>;

    const load = async () => {
      try {
        setError(null);
        const status = await fetchDetail();
        if (cancelled) return;
        if (status === 'processing' || status === 'uploaded') {
          timer = setInterval(async () => {
            try {
              const s = await fetchDetail();
              if (s === 'completed' || s === 'failed') clearInterval(timer);
            } catch {
              /* keep polling */
            }
          }, POLL_MS);
        }
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    setLoading(true);
    load();

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [videoId, fetchDetail]);

  return { video, chartData, loading, error, refetch: fetchDetail };
}
