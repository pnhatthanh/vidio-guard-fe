import { Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { colors } from '../../../theme/colors';

export function UploadSuccessOverlay() {
  return (
    <Box
      className="upload-success-overlay"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2.5,
        bgcolor: 'rgba(6, 14, 32, 0.72)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <Box
        className="upload-success-content"
        sx={{
          textAlign: 'center',
          px: 3,
          py: 2.5,
          borderRadius: 2,
          border: `1px solid rgba(74, 222, 128, 0.35)`,
          bgcolor: 'rgba(74, 222, 128, 0.08)',
        }}
      >
        <CheckCircle sx={{ fontSize: 48, color: '#4ade80', mb: 1 }} />
        <Typography variant="subtitle1" sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface }}>
          Upload thành công
        </Typography>
        <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, mt: 0.5 }}>
          Video đã vào pipeline AI
        </Typography>
      </Box>
    </Box>
  );
}
