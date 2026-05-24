import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { SportsKabaddi, NoAdultContent, RecordVoiceOver, Warning } from '@mui/icons-material';
import { colors } from '../../theme/colors';
import type { Violation } from '../../types';
import ConfidenceBar from './ConfidenceBar';

interface ViolationItemProps {
  violation: Violation;
  showDivider?: boolean;
}

const violationIconMap: Record<string, React.ReactNode> = {
  violence: <SportsKabaddi sx={{ fontSize: 18 }} />,
  explicit: <NoAdultContent sx={{ fontSize: 18 }} />,
  toxic: <RecordVoiceOver sx={{ fontSize: 18 }} />,
};

const severityColor: Record<string, string> = {
  critical: colors.tertiary,
  warning: '#f5c842',
  safe: '#4caf7d',
  info: colors.onSurfaceVariant,
};

const violationLabel: Record<string, string> = {
  violence: 'Bạo lực',
  explicit: 'Nội dung nhạy cảm',
  toxic: 'Ngôn từ toxic',
};

const ViolationItem: React.FC<ViolationItemProps> = ({
  violation,
  showDivider = true,
}) => {
  const icon = violationIconMap[violation.type] ?? <Warning sx={{ fontSize: 18 }} />;
  const color = severityColor[violation.severity] ?? colors.onSurfaceVariant;
  const label = violationLabel[violation.type] ?? violation.type;

  return (
    <>
      <Box
        className="violation-card animate-fade-in"
        sx={{
          p: 1.5,
          borderRadius: 1,
          borderLeft: `4px solid ${color}`,
          backgroundColor:
            violation.severity === 'critical'
              ? `${colors.errorContainer}22`
              : `${colors.surfaceContainerHigh}`,
          mb: showDivider ? 1 : 0,
        }}
      >
        <Box className="flex items-start gap-2">
          <Box sx={{ color, mt: 0.25, flexShrink: 0 }}>{icon}</Box>
          <Box className="flex-1 min-w-0">
            <Box className="flex items-center justify-between gap-2 mb-0.5">
              <Typography
                variant="body2"
                sx={{ color: colors.onSurface, fontWeight: 600 }}
              >
                {label}
              </Typography>
              {violation.timestamp !== undefined && (
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.onSurfaceVariant,
                    fontFamily: 'Manrope',
                    flexShrink: 0,
                  }}
                >
                  {Math.floor(violation.timestamp / 60)}:
                  {String(violation.timestamp % 60).padStart(2, '0')}
                </Typography>
              )}
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: colors.onSurfaceVariant,
                display: 'block',
                mb: 1,
                lineHeight: 1.5,
              }}
            >
              {violation.description}
            </Typography>
            <ConfidenceBar value={violation.confidenceScore} label="Độ tin cậy" segmented />
          </Box>
        </Box>
      </Box>
      {showDivider && <Divider sx={{ my: 0.5, opacity: 0.1 }} />}
    </>
  );
};

export default ViolationItem;
