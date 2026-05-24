import { Box, Typography } from '@mui/material';
import { colors } from '../../theme/colors';

type TopBarProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export default function TopBar({ title, subtitle, action }: TopBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        py: 2.5,
        px: { xs: 2, md: 3 },
        borderBottom: `1px solid ${colors.outlineVariant}22`,
        backgroundColor: `${colors.surfaceContainerLow}cc`,
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, lineHeight: 1.3 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, mt: 0.25, display: 'block' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  );
}
