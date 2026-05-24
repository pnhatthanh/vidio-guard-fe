import { Box, Typography } from '@mui/material';
import { Hub, Sensors } from '@mui/icons-material';
import { colors } from '../../../theme/colors';
import { QueueJobCard } from './QueueJobCard';
import type { PipelineJob } from '../../../types';

type PipelinePanelProps = {
  jobs: PipelineJob[];
  connected: boolean;
};

export function PipelinePanel({ jobs, connected }: PipelinePanelProps) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: colors.surfaceContainerLow,
        border: `1px solid ${colors.outlineVariant}22`,
      }}
    >
      <Box className="flex items-center justify-between" sx={{ mb: 2.5 }}>
        <Box className="flex items-center gap-1.5">
          <Hub sx={{ fontSize: 18, color: colors.primary }} />
          <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface }}>
            Pipeline đang chạy
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1,
            py: 0.35,
            borderRadius: 1,
            bgcolor: connected ? 'rgba(74, 222, 128, 0.12)' : colors.surfaceContainerHigh,
            border: `1px solid ${connected ? 'rgba(74, 222, 128, 0.35)' : colors.outlineVariant}44`,
          }}
        >
          <Sensors sx={{ fontSize: 14, color: connected ? '#4ade80' : colors.onSurfaceVariant }} />
          <Typography variant="caption" sx={{ color: connected ? '#4ade80' : colors.onSurfaceVariant, fontWeight: 700 }}>
            {connected ? 'Realtime' : 'Đang kết nối…'}
          </Typography>
        </Box>
      </Box>

      {jobs.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {jobs.map((job) => (
            <QueueJobCard key={job.videoId} job={job} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            py: 3,
            px: 2,
            textAlign: 'center',
            borderRadius: 2,
            border: `1px dashed ${colors.outlineVariant}55`,
            bgcolor: colors.surfaceContainer,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              mx: 'auto',
              mb: 1.5,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${colors.primaryContainer}18`,
            }}
          >
            <Hub sx={{ fontSize: 22, color: colors.primary, opacity: 0.7 }} />
          </Box>
          <Typography variant="body2" sx={{ color: colors.onSurface, fontWeight: 600, mb: 0.5 }}>
            Hàng đợi trống
          </Typography>
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, lineHeight: 1.5 }}>
            Upload video để bắt đầu phân tích AI
          </Typography>
        </Box>
      )}
    </Box>
  );
}
