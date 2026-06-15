import { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, LinearProgress, Slider } from '@mui/material';
import { Pause, PlayArrow, VolumeUp, VolumeOff, Fullscreen } from '@mui/icons-material';
import StatusBadge from '../../../components/common/StatusBadge';
import { colors } from '../../../theme/colors';
import { formatDuration } from '../../../lib/format';
import type { Video } from '../../../types';

type VideoPlayerProps = {
  video: Video;
  showDetectionBox?: boolean;
  /** Nhảy tới giây (vd. từ danh sách vi phạm) */
  seekToSec?: number | null;
};

export function VideoPlayer({ video, showDetectionBox: _showDetectionBox = false, seekToSec }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.duration ?? 0);
  const [muted, setMuted] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  const isProcessing = video.status === 'processing' || video.status === 'uploaded';
  const verdictSeverity =
    video.verdict === 'violation' ? 'critical' : video.verdict === 'warning' ? 'warning' : 'safe';
  const hasStream = Boolean(video.videoUrl) && !isProcessing;

  useEffect(() => {
    setCurrentTime(0);
    setDuration(video.duration ?? 0);
    setPlaying(false);
  }, [video.id, video.videoUrl, video.duration]);

  useEffect(() => {
    if (seekToSec == null || !videoRef.current || !hasStream) return;
    const t = Math.max(0, Math.min(seekToSec, duration || seekToSec));
    videoRef.current.currentTime = t;
    setCurrentTime(t);
  }, [seekToSec, hasStream, duration]);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      await el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeekChange = (_: unknown, value: number | number[]) => {
    setIsSeeking(true);
    setCurrentTime(value as number);
  };

  const handleSeekCommit = (_: unknown, value: number | number[]) => {
    const t = value as number;
    if (videoRef.current) videoRef.current.currentTime = t;
    setCurrentTime(t);
    setIsSeeking(false);
  };

  const maxDuration = duration > 0 ? duration : 1;

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: 2.5,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#000',
        border: `1px solid ${colors.outlineVariant}44`,
      }}
    >
      {hasStream ? (
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-contain"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setDuration(d);
          }}
          onTimeUpdate={(e) => {
            if (!isSeeking) setCurrentTime(e.currentTarget.currentTime);
          }}
          onEnded={() => setPlaying(false)}
          muted={muted}
          playsInline
          controls={false}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 40% 40%, #1a2848 0%, #060e20 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            p: 3,
          }}
        >
          {isProcessing && (
            <>
              <Typography variant="body2" sx={{ color: colors.primary }}>
                Đang xử lý AI… {video.progressPercent ?? 0}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={video.progressPercent ?? 0}
                sx={{ width: '60%', height: 6, borderRadius: 3 }}
              />
            </>
          )}
          {!isProcessing && !video.videoUrl && (
            <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
              Video chưa sẵn sàng để phát
            </Typography>
          )}
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
          pointerEvents: 'none',
        }}
      >
        {isProcessing ? (
          <StatusBadge severity="info" label="Đang phân tích" />
        ) : (
          <StatusBadge severity={verdictSeverity} label={video.verdictLabel} />
        )}
      </Box>

      {hasStream && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            px: 2,
            pt: 3,
            pb: 1.5,
            background: 'linear-gradient(to top, rgba(0,0,0,0.92), transparent)',
          }}
        >
          <Slider
            size="small"
            min={0}
            max={maxDuration}
            step={0.1}
            value={Math.min(currentTime, maxDuration)}
            onChange={handleSeekChange}
            onChangeCommitted={handleSeekCommit}
            sx={{
              py: 0.5,
              color: colors.primary,
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                '&:hover, &.Mui-focusVisible': { boxShadow: `0 0 0 6px ${colors.primaryContainer}44` },
              },
              '& .MuiSlider-rail': { opacity: 0.35, bgcolor: '#fff' },
              '& .MuiSlider-track': { border: 'none' },
            }}
          />

          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-0.5">
              <IconButton size="small" onClick={() => void togglePlay()} sx={{ color: '#fff' }}>
                {playing ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
              </IconButton>
              <IconButton size="small" onClick={toggleMute} sx={{ color: '#fff' }}>
                {muted ? <VolumeOff fontSize="small" /> : <VolumeUp fontSize="small" />}
              </IconButton>
              <Typography variant="caption" sx={{ color: '#fff', ml: 0.5, fontFamily: 'Manrope', minWidth: 72 }}>
                {formatDuration(currentTime)} / {formatDuration(duration)}
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
      )}
    </Box>
  );
}
