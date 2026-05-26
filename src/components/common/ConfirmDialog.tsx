import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { colors } from '../../theme/colors';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  loading = false,
  danger = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: colors.surfaceContainerLow,
            border: `1px solid ${colors.outlineVariant}33`,
            backgroundImage: 'none',
          },
        },
        backdrop: { sx: { bgcolor: 'rgba(6, 14, 32, 0.75)', backdropFilter: 'blur(6px)' } },
      }}
    >
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, mb: 3, lineHeight: 1.6 }}>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={onClose}
            sx={{
              textTransform: 'none',
              borderRadius: 5,
              borderColor: colors.outlineVariant,
              color: colors.onSurface,
            }}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            onClick={onConfirm}
            sx={{
              textTransform: 'none',
              borderRadius: 5,
              fontWeight: 600,
              bgcolor: danger ? colors.error : colors.onSurface,
              color: danger ? '#fff' : colors.background,
              '&:hover': {
                bgcolor: danger ? colors.error : colors.primaryFixed,
              },
            }}
          >
            {loading ? 'Đang xử lý…' : confirmLabel}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
