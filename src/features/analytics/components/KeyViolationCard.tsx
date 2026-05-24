import { Box, Typography } from '@mui/material';
import { SportsKabaddi, NoAdultContent, RecordVoiceOver } from '@mui/icons-material';
import { colors } from '../../../theme/colors';
import type { Violation, ViolationType } from '../../../types';
import {
  VIOLATION_TYPE_LABEL,
  VIOLATION_TYPE_SUMMARY,
  formatTimestampRange,
} from '../utils/violationMeta';

const ICONS: Record<ViolationType, React.ReactNode> = {
  violence: <SportsKabaddi sx={{ fontSize: 22 }} />,
  explicit: <NoAdultContent sx={{ fontSize: 22 }} />,
  toxic: <RecordVoiceOver sx={{ fontSize: 22 }} />,
};

const ACCENT: Record<ViolationType, string> = {
  violence: colors.tertiaryContainer,
  explicit: '#c45c8a',
  toxic: '#7c6cf0',
};

type KeyViolationCardProps = {
  violation: Violation;
  onSeek?: (seconds: number) => void;
};

export function KeyViolationCard({ violation, onSeek }: KeyViolationCardProps) {
  const accent = ACCENT[violation.type];
  const isCritical = violation.severity === 'critical';

  return (
    <Box
      onClick={() => violation.timestamp != null && onSeek?.(violation.timestamp)}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: colors.surfaceContainer,
        border: `1px solid ${colors.outlineVariant}33`,
        transition: 'border-color 0.2s',
        cursor: onSeek && violation.timestamp != null ? 'pointer' : 'default',
        '&:hover': { borderColor: `${accent}66` },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          bgcolor: `${accent}22`,
          color: accent,
        }}
      >
        {ICONS[violation.type]}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box className="flex items-start justify-between gap-2 mb-0.5">
          <Typography variant="body2" sx={{ fontWeight: 700, color: colors.onSurface }}>
            {VIOLATION_TYPE_LABEL[violation.type]}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'Manrope',
              fontWeight: 700,
              color: colors.onSurfaceVariant,
              flexShrink: 0,
            }}
          >
            {formatTimestampRange(violation.timestamp, violation.endTimestamp)}
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, lineHeight: 1.6, display: 'block', mb: 1.5 }}>
          {VIOLATION_TYPE_SUMMARY[violation.type]}
        </Typography>

        <Box className="flex items-center justify-between gap-2">
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
            Độ tin cậy AI
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              fontFamily: 'Manrope',
              color: isCritical ? colors.tertiary : colors.onSurface,
            }}
          >
            {violation.confidenceScore}%
          </Typography>
        </Box>

        <Box sx={{ mt: 0.75, height: 4, borderRadius: 2, bgcolor: colors.surfaceVariant, overflow: 'hidden' }}>
          <Box
            sx={{
              height: '100%',
              width: `${violation.confidenceScore}%`,
              borderRadius: 2,
              bgcolor: accent,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
