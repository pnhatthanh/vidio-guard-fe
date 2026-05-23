import React from 'react';
import { Box, Typography, Badge, IconButton, Tooltip } from '@mui/material';
import { Notifications, Search } from '@mui/icons-material';
import { colors } from '../../theme/colors';

interface TopBarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, subtitle, action }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2.5,
        px: 3,
        borderBottom: `1px solid ${colors.outlineVariant}22`,
        backgroundColor: `${colors.surfaceContainerLow}90`,
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Manrope',
            fontWeight: 700,
            color: colors.onSurface,
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box className="flex items-center gap-2">
        {action}
        <Tooltip title="Search">
          <IconButton
            size="small"
            sx={{
              color: colors.onSurfaceVariant,
              '&:hover': {
                backgroundColor: colors.surfaceContainerHigh,
                color: colors.onSurface,
              },
            }}
          >
            <Search fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton
            size="small"
            sx={{
              color: colors.onSurfaceVariant,
              '&:hover': {
                backgroundColor: colors.surfaceContainerHigh,
                color: colors.onSurface,
              },
            }}
          >
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}>
              <Notifications fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TopBar;
