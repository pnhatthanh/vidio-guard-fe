import { Box, Typography } from '@mui/material';
import { colors } from '../../../theme/colors';
import type { ViolationType } from '../../../types';
import { VIOLATION_TYPE_LABEL } from '../utils/violationMeta';

type DetectionSummaryProps = {
  scores: Record<ViolationType, number>;
};

const BAR_COLORS: Record<ViolationType, string> = {
  violence: colors.tertiaryContainer,
  explicit: '#c45c8a',
  toxic: colors.primaryContainer,
};

const ORDER: ViolationType[] = ['violence', 'explicit', 'toxic'];

export function DetectionSummary({ scores }: DetectionSummaryProps) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: colors.surfaceContainerLow,
        border: `1px solid ${colors.outlineVariant}22`,
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: colors.onSurfaceVariant, fontWeight: 700, letterSpacing: 1.2, display: 'block', mb: 2 }}
      >
        Phân loại phát hiện
      </Typography>

      <Box className="flex flex-col gap-2.5">
        {ORDER.map((type) => {
          const value = scores[type];
          const color = BAR_COLORS[type];
          return (
            <Box key={type}>
              <Box className="flex justify-between mb-0.75">
                <Typography
                  variant="caption"
                  sx={{ color: colors.onSurfaceVariant, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}
                >
                  {VIOLATION_TYPE_LABEL[type]}
                </Typography>
                <Typography variant="caption" sx={{ color, fontWeight: 800, fontFamily: 'Manrope' }}>
                  {value}% match
                </Typography>
              </Box>
              <Box sx={{ height: 6, borderRadius: 3, bgcolor: colors.surfaceContainerHigh, overflow: 'hidden' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: `${value}%`,
                    borderRadius: 3,
                    bgcolor: color,
                    transition: 'width 0.5s ease',
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
