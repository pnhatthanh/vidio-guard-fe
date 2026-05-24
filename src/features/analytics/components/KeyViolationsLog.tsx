import { Box, Typography } from '@mui/material';
import { colors } from '../../../theme/colors';
import type { Violation } from '../../../types';
import { KeyViolationCard } from './KeyViolationCard';

type KeyViolationsLogProps = {
  violations: Violation[];
  isProcessing?: boolean;
  onSeek?: (seconds: number) => void;
};

export function KeyViolationsLog({ violations, isProcessing, onSeek }: KeyViolationsLogProps) {
  const sorted = [...violations].sort((a, b) => b.confidenceScore - a.confidenceScore);

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: colors.surfaceContainerLow,
        border: `1px solid ${colors.outlineVariant}22`,
      }}
    >
      <Box className="flex items-baseline justify-between" sx={{ mb: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface }}>
          Key Violations Log
        </Typography>
        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
          {sorted.length} sự kiện
        </Typography>
      </Box>

      {isProcessing ? (
        <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, py: 2 }}>
          Đang chờ kết quả phân tích AI…
        </Typography>
      ) : sorted.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            maxHeight: 420,
            overflowY: 'auto',
            pr: 0.5,
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: colors.outlineVariant,
              borderRadius: 3,
            },
          }}
        >
          {sorted.map((v) => (
            <KeyViolationCard key={v.id} violation={v} onSeek={onSeek} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: `${colors.primaryContainer}12`,
            border: `1px dashed ${colors.outlineVariant}44`,
          }}
        >
          <Typography variant="body2" sx={{ color: '#4ade80', fontWeight: 600 }}>
            Không phát hiện vi phạm
          </Typography>
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, mt: 0.5, display: 'block' }}>
            Video đạt chuẩn kiểm duyệt
          </Typography>
        </Box>
      )}
    </Box>
  );
}
