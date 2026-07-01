import { Box, Typography } from '@mui/material';
import { colors } from '../../../theme/colors';
import { getSafetyStatusLabel } from '../utils/violationMeta';

type SafetyOverviewProps = {
  safetyScore: number;
  verdictLabel?: string;
  verdict?: 'safe' | 'warning' | 'violation';
  hasViolations: boolean;
};

export function SafetyOverview({ safetyScore, verdictLabel, verdict, hasViolations }: SafetyOverviewProps) {
  const scoreColor =
    verdict === 'violation' || safetyScore < 50
      ? colors.tertiary
      : verdict === 'warning' || safetyScore < 80
        ? '#e8a838'
        : '#4ade80';

  const badgeColor =
    verdict === 'violation' ? colors.tertiary : verdict === 'warning' ? '#e8a838' : '#4ade80';
  const badgeBg =
    verdict === 'violation'
      ? `${colors.tertiaryContainer}22`
      : verdict === 'warning'
        ? 'rgba(232, 168, 56, 0.15)'
        : `${colors.primaryContainer}22`;

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
        {safetyScore}
      </Typography>

      <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, fontWeight: 500, mb: 1 }}>
        {getSafetyStatusLabel(safetyScore, hasViolations, verdict)}
      </Typography>

      {verdictLabel && (
        <Box
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: badgeBg,
            color: badgeColor,
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
