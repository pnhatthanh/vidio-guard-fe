import { Box, Skeleton } from '@mui/material';
import { colors } from '../../../theme/colors';

export function LibrarySkeleton({ count = 8 }: { count?: number }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2.5,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: colors.surfaceContainerLow,
            border: `1px solid ${colors.outlineVariant}22`,
          }}
        >
          <Skeleton variant="rectangular" sx={{ aspectRatio: '16/9', bgcolor: colors.surfaceContainer }} />
          <Box sx={{ p: 2 }}>
            <Skeleton width="85%" height={20} sx={{ bgcolor: colors.surfaceContainer, mb: 1 }} />
            <Skeleton width="50%" height={14} sx={{ bgcolor: colors.surfaceContainer }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
