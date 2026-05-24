import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '../../theme/colors';
import { panelTitleSx } from './panelStyles';

type PanelProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function Panel({ title, action, children }: PanelProps) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        backgroundColor: colors.surfaceContainerLow,
        border: `1px solid ${colors.outlineVariant}22`,
      }}
    >
      {(title || action) && (
        <Box className="flex items-center justify-between mb-3">
          {title && (
            <Typography variant="subtitle2" sx={panelTitleSx}>
              {title}
            </Typography>
          )}
          {action}
        </Box>
      )}
      {children}
    </Box>
  );
}
