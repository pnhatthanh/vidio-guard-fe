import { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import {
  Close,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
} from '@mui/icons-material';
import type { UploadItem } from '../hooks/useUploadSession';
import { colors } from '../../../theme/colors';

type VideoPreviewPlayerProps = {
  item: UploadItem;
  onDuration: (id: string, sec: number) => void;
  onRemove: (id: string) => void;
};

function formatDuration(sec: number) {
  if (!Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function VideoPreviewPlayer({ item, onDuration, onRemove }: VideoPreviewPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);
  const [durationSec, setDurationSec] = useState(item.durationSec ?? 0);

  // Reset hoàn toàn khi đổi video (component remount qua key, nhưng đảm bảo thêm)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
    setProgress(0);
    setCurrentSec(0);
    setDurationSec(item.durationSec ?? 0);
  }, [item.id, item.previewUrl, item.durationSec]);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        await el.play();
      } else {
        el.pause();
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        border: `1px solid ${colors.outlineVariant}33`,
        bgcolor: '#000',
        position: 'relative',
      }}
    >
      <video
        ref={videoRef}
        src={item.previewUrl}
        className="w-full aspect-video object-contain bg-black"
        preload="metadata"
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;
          const dur = el.duration;
          if (!Number.isFinite(dur)) return;
          setDurationSec(dur);
          onDuration(item.id, dur);
        }}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (!el.duration) return;
          setCurrentSec(el.currentTime);
          setProgress((el.currentTime / el.duration) * 100);
        }}
        onEnded={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        playsInline
      />

      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: 12,
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <Chip
          size="small"
          label="Xem trước"
          sx={{
            bgcolor: 'rgba(0,0,0,0.65)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
        <IconButton
          size="small"
          onClick={() => onRemove(item.id)}
          sx={{
            pointerEvents: 'auto',
            bgcolor: 'rgba(0,0,0,0.55)',
            color: '#fff',
            '&:hover': { bgcolor: colors.errorContainer },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92), transparent)',
        }}
      >
        <Box
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.2)',
            mb: 1.5,
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            const el = videoRef.current;
            if (!el?.duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
            el.currentTime = ratio * el.duration;
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${progress}%`,
              bgcolor: colors.primary,
              borderRadius: 2,
            }}
          />
        </Box>

        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-0.5">
            <IconButton size="small" onClick={() => void togglePlay()} sx={{ color: '#fff' }}>
              {playing ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                const el = videoRef.current;
                if (!el) return;
                el.muted = !el.muted;
                setMuted(el.muted);
              }}
              sx={{ color: '#fff' }}
            >
              {muted ? <VolumeOff fontSize="small" /> : <VolumeUp fontSize="small" />}
            </IconButton>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.85)', ml: 1, fontFamily: 'Manrope' }}
            >
              {formatDuration(currentSec)} / {formatDuration(durationSec)}
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{ color: '#fff' }}
            onClick={() => void videoRef.current?.requestFullscreen?.()}
          >
            <Fullscreen fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
