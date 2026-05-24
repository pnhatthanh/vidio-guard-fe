import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { videosApi } from '../../api/videos';
import type { VideoProgressEvent } from '../../api/types';
import { getPipelineWebSocketUrl } from '../../lib/wsUrl';
import type { PipelineJob } from '../../types';
import { useAuth } from '../auth/AuthProvider';

/**
 * Pipeline realtime qua WebSocket `GET /api/v1/ws/pipeline?token=...` (docs §6).
 * Chỉ poll REST khi WebSocket chưa kết nối được (fallback).
 */
type PipelineContextValue = {
  jobs: PipelineJob[];
  registerJob: (videoId: string, filename: string) => void;
  refreshProcessing: () => Promise<void>;
  connected: boolean;
};

const PipelineContext = createContext<PipelineContextValue | null>(null);

const POLL_FALLBACK_MS = 10_000;
const RECONNECT_MS = 4_000;

export function PipelineProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [jobsMap, setJobsMap] = useState<Map<string, PipelineJob>>(new Map());
  const [connected, setConnected] = useState(false);
  const filenamesRef = useRef<Map<string, string>>(new Map());
  const wsRef = useRef<WebSocket | null>(null);
  const wsConnectedRef = useRef(false);

  const upsertJob = useCallback((event: VideoProgressEvent, filename?: string) => {
    if (filename) filenamesRef.current.set(event.video_id, filename);

    setJobsMap((prev) => {
      const next = new Map(prev);
      const name = filename ?? filenamesRef.current.get(event.video_id) ?? event.video_id.slice(0, 8);

      if (event.status === 'completed' || event.status === 'failed') {
        next.delete(event.video_id);
        return next;
      }

      next.set(event.video_id, {
        videoId: event.video_id,
        filename: name,
        status: event.status,
        stage: event.stage,
        progress: event.progress_percent,
      });
      return next;
    });
  }, []);

  const registerJob = useCallback((videoId: string, filename: string) => {
    filenamesRef.current.set(videoId, filename);
    setJobsMap((prev) => {
      const next = new Map(prev);
      next.set(videoId, {
        videoId,
        filename,
        status: 'processing',
        stage: 'starting',
        progress: 0,
      });
      return next;
    });
  }, []);

  /** Đồng bộ danh sách đang xử lý — chỉ khi load trang / WS mất / fallback */
  const refreshProcessing = useCallback(async () => {
    try {
      const res = await videosApi.list({ status: 'processing', limit: 20 });
      setJobsMap((prev) => {
        const next = new Map<string, PipelineJob>();
        for (const item of res.items) {
          filenamesRef.current.set(item.video_id, item.original_filename);
          next.set(item.video_id, {
            videoId: item.video_id,
            filename: item.original_filename,
            status: item.status,
            stage: item.stage,
            progress: item.progress_percent,
          });
        }
        // Giữ job vừa upload, chưa kịp có trong API
        for (const [id, job] of prev) {
          if (!next.has(id)) next.set(id, job);
        }
        return next;
      });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setJobsMap(new Map());
      setConnected(false);
      wsRef.current?.close();
      wsRef.current = null;
      return;
    }

    let reconnectTimer: ReturnType<typeof setTimeout>;
    let pollTimer: ReturnType<typeof setInterval>;
    let closed = false;

    const stopPoll = () => clearInterval(pollTimer);

    const startPollFallback = () => {
      stopPoll();
      if (wsConnectedRef.current) return;
      pollTimer = setInterval(() => void refreshProcessing(), POLL_FALLBACK_MS);
    };

    const connect = () => {
      const wsUrl = getPipelineWebSocketUrl();
      if (!wsUrl) {
        wsConnectedRef.current = false;
        setConnected(false);
        void refreshProcessing();
        startPollFallback();
        return;
      }

      wsRef.current?.close();
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        wsConnectedRef.current = true;
        setConnected(true);
        stopPoll();
        // Một lần khi connect — bắt kịp job đang chạy (F5, reconnect)
        void refreshProcessing();
      };

      ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data as string) as VideoProgressEvent;
          if (data.type === 'video.progress') upsertJob(data);
        } catch {
          /* ignore */
        }
      };

      ws.onclose = () => {
        wsConnectedRef.current = false;
        setConnected(false);
        if (!closed) {
          void refreshProcessing();
          startPollFallback();
          reconnectTimer = setTimeout(connect, RECONNECT_MS);
        }
      };

      ws.onerror = () => ws.close();
    };

    const forceReconnect = () => {
      if (!closed) {
        wsRef.current?.close();
        connect();
      }
    };

    void refreshProcessing();
    connect();

    window.addEventListener('auth:tokens-updated', forceReconnect);

    return () => {
      closed = true;
      clearTimeout(reconnectTimer);
      stopPoll();
      window.removeEventListener('auth:tokens-updated', forceReconnect);
      wsRef.current?.close();
      wsRef.current = null;
      wsConnectedRef.current = false;
      setConnected(false);
    };
  }, [isAuthenticated, refreshProcessing, upsertJob]);

  const jobs = useMemo(() => Array.from(jobsMap.values()), [jobsMap]);

  const value = useMemo(
    () => ({ jobs, registerJob, refreshProcessing, connected }),
    [jobs, registerJob, refreshProcessing, connected],
  );

  return <PipelineContext.Provider value={value}>{children}</PipelineContext.Provider>;
}

export function usePipeline() {
  const ctx = useContext(PipelineContext);
  if (!ctx) throw new Error('usePipeline must be used within PipelineProvider');
  return ctx;
}
