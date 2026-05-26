import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';
import { usersApi } from '../../api/users';
import { getErrorMessage } from '../../api/errors';
import { colors } from '../../theme/colors';
import { useProfileDialog } from './ProfileDialogContext';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    bgcolor: colors.surfaceContainer,
  },
};

export function PasswordDialog() {
  const { passwordOpen, closeChangePassword } = useProfileDialog();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!passwordOpen) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMsg(null);
    setErr(null);
  }, [passwordOpen]);

  const handleSave = async () => {
    setMsg(null);
    setErr(null);
    if (newPassword !== confirmPassword) {
      setErr('Mật khẩu xác nhận không khớp.');
      return;
    }
    setSaving(true);
    try {
      await usersApi.updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      setMsg('Đã đổi mật khẩu.');
      setTimeout(() => closeChangePassword(), 600);
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={passwordOpen}
      onClose={closeChangePassword}
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
          sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 2.5 }}
        >
          Đổi mật khẩu
        </Typography>

        <TextField
          label="Mật khẩu hiện tại"
          type="password"
          fullWidth
          size="small"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ ...fieldSx, mb: 2 }}
        />
        <TextField
          label="Mật khẩu mới"
          type="password"
          fullWidth
          size="small"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ ...fieldSx, mb: 2 }}
        />
        <TextField
          label="Xác nhận mật khẩu mới"
          type="password"
          fullWidth
          size="small"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ ...fieldSx, mb: 2 }}
        />

        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
        {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
          <Button
            variant="outlined"
            onClick={closeChangePassword}
            sx={{
              textTransform: 'none',
              borderRadius: 5,
              px: 2.5,
              borderColor: colors.outlineVariant,
              color: colors.onSurface,
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            disabled={saving || !currentPassword || !newPassword}
            onClick={() => void handleSave()}
            sx={{
              textTransform: 'none',
              borderRadius: 5,
              px: 2.5,
              fontWeight: 600,
              bgcolor: colors.onSurface,
              color: colors.background,
              '&:hover': { bgcolor: colors.primaryFixed },
            }}
          >
            {saving ? 'Đang lưu…' : 'Lưu'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
