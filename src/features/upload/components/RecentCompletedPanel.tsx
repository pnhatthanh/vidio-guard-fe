import { Box, Typography, Tooltip } from '@mui/material';
import { ChevronRight, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../theme/colors';
import { formatProcessingWindow } from '../../../lib/format';
import { VideoPoster } from '../../../components/common/VideoPoster';
import type { Video } from '../../../types';

type RecentCompletedPanelProps = {
  videos: Video[];
};

function scoreTheme(score: number, violated: boolean) {
  if (violated || score < 70) {
    return { color: colors.tertiary, ring: `${colors.tertiaryContainer}55`, bg: `${colors.tertiaryContainer}18` };
  }
  if (score >= 80) {
    return { color: '#4ade80', ring: 'rgba(74, 222, 128, 0.4)', bg: 'rgba(74, 222, 128, 0.1)' };
  }
  return { color: '#e8a838', ring: 'rgba(232, 168, 56, 0.35)', bg: 'rgba(232, 168, 56, 0.1)' };
}

function RecentCompletedRow({ video, onOpen }: { video: Video; onOpen: () => void }) {
  const violated = video.violated ?? (video.violationCount ?? 0) > 0;
  const theme = scoreTheme(video.safetyScore, violated);
  const timeLabel = formatProcessingWindow(video.uploadedAtIso, video.processedAtIso);

  return (
    <Box
      onClick={onOpen}
      sx={{
        display: 'grid',
        gridTemplateColumns: '88px 1fr auto',
        gap: 1.5,
        alignItems: 'center',
        p: 1.25,
        borderRadius: 2,
        cursor: 'pointer',
        bgcolor: colors.surfaceContainer,
        border: `1px solid ${colors.outlineVariant}22`,
        borderLeft: `3px solid ${violated ? colors.tertiaryContainer : 'transparent'}`,
        transition: 'background-color 0.2s, border-color 0.2s',
        '&:hover': {
          bgcolor: colors.surfaceContainerHigh,
          borderColor: `${colors.primary}44`,
        },
      }}
    >
      <Box
        sx={{
          width: 88,
          height: 52,
          borderRadius: 1.25,
          overflow: 'hidden',
          flexShrink: 0,
          border: `1px solid ${colors.outlineVariant}33`,
        }}
      >
        <VideoPoster videoUrl={video.videoUrl} height={52} showPlayOnHover={false} />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Tooltip title={video.filename} placement="top-start">
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: colors.onSurface,
              fontFamily: 'Manrope',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mb: 0.35,
            }}
          >
            {video.filename}
          </Typography>
        </Tooltip>
        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, display: 'block' }}>
          {timeLabel}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.outline, fontSize: '0.65rem' }}>
          {video.size}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: theme.bg,
            border: `2px solid ${theme.ring}`,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontFamily: 'Manrope', fontWeight: 800, color: theme.color, lineHeight: 1, fontSize: '0.8rem' }}
          >
            {video.safetyScore}%
          </Typography>
        </Box>
        <ChevronRight sx={{ fontSize: 18, color: colors.onSurfaceVariant, opacity: 0.6 }} />
      </Box>
    </Box>
  );
}

export function RecentCompletedPanel({ videos }: RecentCompletedPanelProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: colors.surfaceContainerLow,
        border: `1px solid ${colors.outlineVariant}22`,
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => navigate('/library')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          width: '100%',
          p: 0,
          border: 'none',
          bgcolor: 'transparent',
          cursor: 'pointer',
          textAlign: 'left',
          borderRadius: 1,
          '&:hover .recent-completed-title': { color: colors.primary },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <History sx={{ fontSize: 18, color: colors.primary }} />
          <Typography
            className="recent-completed-title"
            variant="subtitle2"
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 700,
              color: colors.onSurface,
              transition: 'color 0.2s',
            }}
          >
            Hoàn tất gần đây
          </Typography>
          <ChevronRight sx={{ fontSize: 16, color: colors.onSurfaceVariant, opacity: 0.7 }} />
        </Box>
        {videos.length > 0 && (
          <Typography
            variant="caption"
            sx={{
              color: colors.onSurfaceVariant,
              fontWeight: 600,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              bgcolor: colors.surfaceContainerHigh,
            }}
          >
            {videos.length}
          </Typography>
        )}
      </Box>

      {videos.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {videos.map((video) => (
            <RecentCompletedRow
              key={video.id}
              video={video}
              onOpen={() => navigate(`/analytics/${video.id}`)}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            py: 3.5,
            textAlign: 'center',
            borderRadius: 2,
            border: `1px dashed ${colors.outlineVariant}44`,
            bgcolor: colors.surfaceContainer,
          }}
        >
          <Typography variant="body2" sx={{ color: colors.onSurfaceVariant }}>
            Chưa có video hoàn tất
          </Typography>
        </Box>
      )}
    </Box>
  );
}
