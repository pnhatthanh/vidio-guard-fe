import { Box, Typography } from '@mui/material';
import { colors } from '../../../theme/colors';
import { getSafetyStatusLabel } from '../utils/violationMeta';

type SafetyOverviewProps = {
  safetyScore: number;
  verdictLabel?: string;
  hasViolations: boolean;
};

export function SafetyOverview({ safetyScore, verdictLabel, hasViolations }: SafetyOverviewProps) {
  const scoreColor = safetyScore >= 80 ? '#4ade80' : safetyScore >= 50 ? '#e8a838' : colors.tertiary;

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: colors.surfaceContainerLow,
        border: `1px solid ${colors.outlineVariant}22`,
        textAlign: 'center',
      }}
    >
      <Typography variant="overline" sx={{ color: colors.onSurfaceVariant, fontWeight: 700, letterSpacing: 1 }}>
        Overall Status
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontFamily: 'Manrope',
          fontWeight: 800,
          color: scoreColor,
          my: 1,
          lineHeight: 1,
        }}
      >
        {safetyScore}%
      </Typography>

      <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, fontWeight: 500, mb: 1 }}>
        {getSafetyStatusLabel(safetyScore, hasViolations)}
      </Typography>

      {verdictLabel && (
        <Box
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: hasViolations ? `${colors.tertiaryContainer}22` : `${colors.primaryContainer}22`,
            color: hasViolations ? colors.tertiary : '#4ade80',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          {verdictLabel}
        </Box>
      )}
    </Box>
  );
}
