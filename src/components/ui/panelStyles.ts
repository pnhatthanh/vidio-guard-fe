import type { SxProps, Theme } from '@mui/material';
import { colors } from '../../theme/colors';

export const panelSx: SxProps<Theme> = {
  p: 2.5,
  borderRadius: 2.5,
  backgroundColor: colors.surfaceContainerLow,
  border: `1px solid ${colors.outlineVariant}22`,
};

export const panelTitleSx: SxProps<Theme> = {
  fontFamily: 'Manrope',
  fontWeight: 700,
  color: colors.onSurface,
};
