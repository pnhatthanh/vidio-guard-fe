import React from 'react';
import { Chip } from '@mui/material';
import type { SeverityLevel } from '../../types';

interface StatusBadgeProps {
  severity: SeverityLevel;
  label?: string;
  size?: 'small' | 'medium';
}

const severityConfig: Record<
  SeverityLevel,
  { label: string; sx: object }
> = {
  critical: {
    label: 'Vi phạm nghiêm trọng',
    sx: {
      backgroundColor: '#93000a',
      color: '#ffdad6',
      fontWeight: 600,
      '& .MuiChip-label': { px: 1.5 },
    },
  },
  warning: {
    label: 'Cảnh báo',
    sx: {
      backgroundColor: '#3a3010',
      color: '#f5c842',
      fontWeight: 600,
      '& .MuiChip-label': { px: 1.5 },
    },
  },
  safe: {
    label: 'An toàn',
    sx: {
      backgroundColor: '#3a4a5f',
      color: '#a9bad3',
      fontWeight: 600,
      '& .MuiChip-label': { px: 1.5 },
    },
  },
  info: {
    label: 'Info',
    sx: {
      backgroundColor: '#222a3d',
      color: '#c3c5d9',
      fontWeight: 500,
      '& .MuiChip-label': { px: 1.5 },
    },
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  severity,
  label,
  size = 'small',
}) => {
  const config = severityConfig[severity];
  return (
    <Chip
      label={label ?? config.label}
      size={size}
      sx={{ fontSize: '0.6875rem', borderRadius: '4px', ...config.sx }}
    />
  );
};

export default StatusBadge;
