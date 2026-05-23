import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '../../theme/colors';

interface ConfidenceBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  segmented?: boolean;
}

const getBarColor = (value: number): string => {
  if (value >= 80) return colors.tertiary;
  if (value >= 50) return '#f5c842';
  return colors.secondary;
};

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  value,
  label,
  showValue = true,
  segmented = false,
}) => {
  const color = getBarColor(value);

  return (
    <Box className="w-full">
      {(label || showValue) && (
        <Box className="flex justify-between items-center mb-1">
          {label && (
            <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography
              variant="caption"
              sx={{ color, fontWeight: 600, fontFamily: 'Manrope' }}
            >
              {value.toFixed(1)}%
            </Typography>
          )}
        </Box>
      )}

      {segmented ? (
        // Segmented bar — implies discrete data points
        <Box className="flex gap-0.5 h-1.5">
          {Array.from({ length: 20 }, (_, i) => {
            const threshold = (i + 1) * 5;
            const filled = threshold <= value;
            return (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: filled ? color : colors.surfaceVariant,
                  borderRadius: 1,
                  transition: 'background-color 0.3s ease',
                }}
              />
            );
          })}
        </Box>
      ) : (
        // Continuous bar
        <Box
          sx={{
            width: '100%',
            height: 4,
            backgroundColor: colors.surfaceVariant,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${value}%`,
              background: `linear-gradient(90deg, ${color}88 0%, ${color} 100%)`,
              borderRadius: 2,
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ConfidenceBar;
