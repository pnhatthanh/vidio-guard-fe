import { useRef, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Movie, PlayArrow } from '@mui/icons-material';
import { colors } from '../../theme/colors';
import { useVideoPoster } from '../../lib/videoPoster';

type VideoPosterProps = {
  videoUrl?: string;
  height?: number;
  /** Lấp đầy container cha (cần cha có chiều cao / aspect-ratio) */
  fill?: boolean;
  showPlayOnHover?: boolean;
};

function seekToPreviewFrame(video: HTMLVideoElement) {
  const t =
    Number.isFinite(video.duration) && video.duration > 0
      ? Math.min(1, video.duration * 0.05)
      : 0;
  video.currentTime = t;
}

/** Blob URL — capture JPEG; HTTP presigned — dùng thẻ video (tránh lỗi CORS canvas) */
function StreamVideoPoster({ videoUrl, height, fill }: { videoUrl: string; height: number; fill?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <Box
      sx={{
        height: fill ? '100%' : height,
        bgcolor: '#000',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!failed && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            seekToPreviewFrame(e.currentTarget);
          }}
          onSeeked={() => setReady(true)}
          onError={() => setFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {!ready && !failed && (
        <CircularProgress
          size={28}
          sx={{ position: 'absolute', color: colors.primary, opacity: 0.6 }}
        />
      )}

      {(failed || (!ready && !videoUrl)) && (
        <Movie sx={{ color: colors.onSurfaceVariant, fontSize: 36, opacity: 0.5 }} />
      )}
    </Box>
  );
}

export function VideoPoster({ videoUrl, height = 120, fill = false, showPlayOnHover = true }: VideoPosterProps) {
  const isBlob = videoUrl?.startsWith('blob:') ?? false;
  const { posterUrl, loading } = useVideoPoster(isBlob ? videoUrl : undefined, {
    width: 400,
    height: Math.round((height / 120) * 225),
  });

  const inner = isBlob && videoUrl ? (
    <Box
      sx={{
        height: fill ? '100%' : height,
        bgcolor: '#000',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {posterUrl ? (
        <Box
          component="img"
          src={posterUrl}
          alt=""
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : loading ? (
        <CircularProgress size={28} sx={{ color: colors.primary, opacity: 0.6 }} />
      ) : (
        <Movie sx={{ color: colors.onSurfaceVariant, fontSize: 36, opacity: 0.5 }} />
      )}
    </Box>
  ) : videoUrl ? (
    <StreamVideoPoster videoUrl={videoUrl} height={height} fill={fill} />
  ) : (
    <Box
      sx={{
        height: fill ? '100%' : height,
        bgcolor: colors.surfaceContainerLow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Movie sx={{ color: colors.onSurfaceVariant, fontSize: 36, opacity: 0.5 }} />
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', height: fill ? '100%' : undefined }}>
      {inner}
      {showPlayOnHover && videoUrl && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.35)',
            opacity: 0,
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
            '.group:hover &': { opacity: 1 },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'rgba(183, 196, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayArrow sx={{ color: colors.primary, fontSize: 22 }} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
