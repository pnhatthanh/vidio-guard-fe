import { useEffect, useState } from 'react';

/** Vẽ frame video lên canvas giữ đúng tỷ lệ (object-fit: cover) */
export function drawVideoCover(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  w: number,
  h: number,
) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return;

  const scale = Math.max(w / vw, h / vh);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (vw - sw) / 2;
  const sy = (vh - sh) / 2;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
}

type UseVideoPosterOptions = {
  width?: number;
  height?: number;
  enabled?: boolean;
};

/** Lấy poster JPEG từ URL video (presigned MinIO hoặc blob local) */
export function useVideoPoster(
  src: string | undefined,
  { width = 320, height = 180, enabled = true }: UseVideoPosterOptions = {},
) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(src && enabled));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src || !enabled) {
      setPosterUrl(null);
      setLoading(false);
      setFailed(false);
      return;
    }

    let cancelled = false;
    setPosterUrl(null);
    setLoading(true);
    setFailed(false);

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.src = src;

    const releaseVideo = () => {
      video.onloadedmetadata = null;
      video.onseeked = null;
      video.onerror = null;
      video.pause();
      video.removeAttribute('src');
      video.load();
    };

    const captureFrame = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx || video.videoWidth === 0) {
          setFailed(true);
          return;
        }
        drawVideoCover(ctx, video, width, height);
        setPosterUrl(canvas.toDataURL('image/jpeg', 0.82));
      } catch {
        setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
        releaseVideo();
      }
    };

    video.onloadedmetadata = () => {
      if (cancelled) return;
      const t = Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(1, video.duration * 0.05)
        : 0;
      video.currentTime = t;
    };

    video.onseeked = captureFrame;

    video.onerror = () => {
      if (!cancelled) {
        setFailed(true);
        setLoading(false);
        releaseVideo();
      }
    };

    return () => {
      cancelled = true;
      releaseVideo();
    };
  }, [src, width, height, enabled]);

  return { posterUrl, loading, failed };
}
