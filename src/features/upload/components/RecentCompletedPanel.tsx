import { Box, Typography, Chip } from '@mui/material';
import { CheckCircleOutlined, ErrorOutlined, Movie } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../theme/colors';
import type { Video } from '../../../types';

type RecentCompletedPanelProps = {
  videos: Video[];
};

function getStatusMeta(video: Video) {
  const hasViolation = video.violated ?? (video.violationCount ?? 0) > 0;
  if (hasViolation) {
    return {
      label: 'Vi phạm',
      chipColor: colors.tertiary,
      chipBg: `${colors.tertiaryContainer}28`,
      icon: <ErrorOutlined sx={{ fontSize: 20 }} />,
      iconColor: colors.tertiary,
      scoreColor: colors.tertiary,
    };
  }
  return {
    label: 'An toàn',
    chipColor: '#4ade80',
    chipBg: 'rgba(74, 222, 128, 0.12)',
    icon: <CheckCircleOutlined sx={{ fontSize: 20 }} />,
    iconColor: '#4ade80',
    scoreColor: '#4ade80',
  };
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
      <Box className="flex items-center justify-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface }}>
          Hoàn tất gần đây
        </Typography>
        {videos.length > 0 && (
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, fontWeight: 600 }}>
            {videos.length} video
          </Typography>
        )}
      </Box>

      {videos.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {videos.map((video) => {
            const meta = getStatusMeta(video);
            return (
              <Box
                key={video.id}
                onClick={() => navigate(`/analytics/${video.id}`)}
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor: colors.surfaceContainer,
                  border: `1px solid ${colors.outlineVariant}22`,
                  transition: 'border-color 0.2s, background-color 0.2s',
                  '&:hover': {
                    borderColor: `${colors.primary}44`,
                    bgcolor: colors.surfaceContainerHigh,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: meta.chipBg,
                    color: meta.iconColor,
                  }}
                >
                  {meta.icon}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box className="flex items-start justify-between gap-1 mb-0.5">
                    <Box className="flex items-center gap-1 min-w-0">
                      <Movie sx={{ fontSize: 14, color: colors.onSurfaceVariant, flexShrink: 0 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: colors.onSurface,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {video.filename}
                      </Typography>
                    </Box>
                    <Chip
                      label={meta.label}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        color: meta.chipColor,
                        bgcolor: meta.chipBg,
                        border: `1px solid ${meta.chipColor}33`,
                      }}
                    />
                  </Box>

                  <Box className="flex flex-wrap gap-x-2 gap-y-0.5">
                    {video.uploadedAt && (
                      <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                        <Box component="span" sx={{ color: colors.outline, mr: 0.5 }}>
                          Bắt đầu:
                        </Box>
                        {video.uploadedAt}
                      </Typography>
                    )}
                    {video.processedAt && (
                      <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                        <Box component="span" sx={{ color: colors.outline, mr: 0.5 }}>
                          Kết thúc:
                        </Box>
                        {video.processedAt}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'right', flexShrink: 0, alignSelf: 'center' }}>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.onSurfaceVariant, display: 'block', fontSize: '0.65rem', mb: 0.25 }}
                  >
                    An toàn
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: 'Manrope', fontWeight: 800, color: meta.scoreColor, lineHeight: 1 }}
                  >
                    {video.safetyScore}%
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            py: 3,
            textAlign: 'center',
            borderRadius: 2,
            border: `1px dashed ${colors.outlineVariant}55`,
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
