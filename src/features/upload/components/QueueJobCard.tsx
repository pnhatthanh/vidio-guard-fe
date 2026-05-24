import { Box, Typography, LinearProgress } from '@mui/material';
import { Movie, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../theme/colors';
import { formatStageLabel } from '../../../lib/format';
import type { PipelineJob } from '../../../types';

type QueueJobCardProps = {
  job: PipelineJob;
};

export function QueueJobCard({ job }: QueueJobCardProps) {
  const navigate = useNavigate();
  const isFailed = job.status === 'failed';

  return (
    <Box
      onClick={() => navigate(`/analytics/${job.videoId}`)}
      sx={{
        p: 1.75,
        borderRadius: 2,
        bgcolor: colors.surfaceContainer,
        border: `1px solid ${isFailed ? `${colors.tertiaryContainer}44` : `${colors.primaryContainer}33`}`,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: colors.primary },
      }}
    >
      <Box className="flex items-center gap-2" sx={{ mb: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.25,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${colors.primaryContainer}22`,
            color: colors.primary,
          }}
        >
          <Movie sx={{ fontSize: 18 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
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
            {job.filename}
          </Typography>
          <Typography variant="caption" sx={{ color: isFailed ? colors.tertiary : colors.primary, fontWeight: 600 }}>
            {formatStageLabel(job.stage)}
          </Typography>
        </Box>

        <Box className="flex items-center gap-0.5" sx={{ color: colors.onSurfaceVariant }}>
          <Typography variant="caption" sx={{ fontFamily: 'Manrope', fontWeight: 800, color: colors.primary }}>
            {job.progress}%
          </Typography>
          <ChevronRight sx={{ fontSize: 16 }} />
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={job.progress}
        sx={{
          height: 5,
          borderRadius: 3,
          bgcolor: colors.surfaceVariant,
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            background: isFailed
              ? colors.tertiaryContainer
              : `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
          },
        }}
      />
    </Box>
  );
}
