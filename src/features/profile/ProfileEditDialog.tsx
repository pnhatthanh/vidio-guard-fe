import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Avatar,
  IconButton,
  CircularProgress,
  Collapse,
} from '@mui/material';
import { PhotoCamera, DeleteOutlined } from '@mui/icons-material';
import { useAuth } from '../auth/AuthProvider';
import { usersApi } from '../../api/users';
import { getErrorMessage } from '../../api/errors';
import { colors } from '../../theme/colors';
import { useProfileDialog } from './ProfileDialogContext';

const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
const AVATAR_ACCEPT = 'image/jpeg,image/png,image/webp';

function getInitials(fullName: string) {
  return (
    fullName
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?'
  );
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    bgcolor: colors.surfaceContainer,
  },
};

function isValidAvatarFile(file: File) {
  const okType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
  return okType && file.size > 0 && file.size <= AVATAR_MAX_BYTES;
}

export function ProfileEditDialog() {
  const { editOpen, closeEditProfile } = useProfileDialog();
  const { user, refreshProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initializedForOpenRef = useRef(false);

  const [fullName, setFullName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editOpen) {
      initializedForOpenRef.current = false;
      setSaving(false);
      return;
    }
    if (!user || initializedForOpenRef.current) return;

    initializedForOpenRef.current = true;
    setFullName(user.full_name);
    setAvatarPreview(user.avatar_url ?? '');
    setAvatarFile(null);
    setRemoveAvatar(false);
    setErr(null);
  }, [editOpen, user]);

  useEffect(() => {
    if (!avatarFile) return;
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const handlePickAvatar = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!isValidAvatarFile(file)) {
      setErr('Ảnh phải là JPEG, PNG hoặc WebP và tối đa 5 MB.');
      return;
    }
    setErr(null);
    setAvatarFile(file);
    setRemoveAvatar(false);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setRemoveAvatar(true);
    setAvatarPreview('');
    setErr(null);
  };

  const trimmedName = fullName.trim();
  const canSave = trimmedName.length >= 2;
  const showAvatar = Boolean(avatarPreview) && !removeAvatar;

  const handleSave = async () => {
    if (!canSave || saving) return;
    setErr(null);
    setSaving(true);
    try {
      await usersApi.updateMe({
        full_name: trimmedName,
        avatar: avatarFile ?? undefined,
        remove_avatar: removeAvatar || undefined,
      });
      await refreshProfile();
      closeEditProfile();
    } catch (e) {
      setErr(getErrorMessage(e));
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={editOpen}
      onClose={saving ? undefined : closeEditProfile}
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
          sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 3 }}
        >
          Chỉnh sửa hồ sơ
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
          <Avatar
            src={showAvatar ? avatarPreview : undefined}
            sx={{
              width: 88,
              height: 88,
              bgcolor: colors.primaryContainer,
              fontSize: '1.75rem',
              fontWeight: 700,
              fontFamily: 'Manrope',
            }}
          >
            {user ? getInitials(trimmedName || user.full_name) : '?'}
          </Avatar>
          <IconButton
            size="small"
            onClick={handlePickAvatar}
            disabled={saving}
            aria-label="Chọn ảnh đại diện"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 'calc(50% - 52px)',
              bgcolor: colors.surfaceBright,
              border: `1px solid ${colors.outlineVariant}55`,
              width: 32,
              height: 32,
              '&:hover': { bgcolor: colors.surfaceContainerHigh },
            }}
          >
            <PhotoCamera sx={{ fontSize: 16, color: colors.onSurface }} />
          </IconButton>
          <input
            ref={fileInputRef}
            type="file"
            accept={AVATAR_ACCEPT}
            hidden
            onChange={handleAvatarChange}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2.5 }}>
          <Button
            size="small"
            disabled={saving}
            onClick={handlePickAvatar}
            sx={{ textTransform: 'none', color: colors.primary, fontWeight: 600 }}
          >
            Tải ảnh lên
          </Button>
          {(showAvatar || user?.avatar_url) && (
            <Button
              size="small"
              disabled={saving}
              startIcon={<DeleteOutlined sx={{ fontSize: 16 }} />}
              onClick={handleRemoveAvatar}
              sx={{ textTransform: 'none', color: colors.onSurfaceVariant }}
            >
              Xóa ảnh
            </Button>
          )}
        </Box>

        <TextField
          label="Tên hiển thị"
          fullWidth
          size="small"
          value={fullName}
          disabled={saving}
          onChange={(e) => setFullName(e.target.value)}
          helperText={trimmedName.length > 0 && trimmedName.length < 2 ? 'Tối thiểu 2 ký tự' : ' '}
          error={trimmedName.length > 0 && trimmedName.length < 2}
          sx={{ ...fieldSx, mb: 2 }}
        />

        <TextField
          label="Email"
          fullWidth
          size="small"
          value={user?.email ?? ''}
          disabled
          sx={{ ...fieldSx, mb: 1.5 }}
        />

        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, lineHeight: 1.6, display: 'block', mb: 2 }}>
          Ảnh đại diện: JPEG, PNG hoặc WebP, tối đa 5 MB.
        </Typography>

        <Collapse in={Boolean(err)}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {err}
          </Alert>
        </Collapse>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1, minHeight: 40, alignItems: 'center' }}>
          <Button
            variant="outlined"
            disabled={saving}
            onClick={closeEditProfile}
            sx={{
              textTransform: 'none',
              borderRadius: 5,
              px: 2.5,
              minWidth: 88,
              borderColor: colors.outlineVariant,
              color: colors.onSurface,
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            disabled={saving || !canSave}
            onClick={() => void handleSave()}
            sx={{
              textTransform: 'none',
              borderRadius: 5,
              px: 2.5,
              minWidth: 100,
              fontWeight: 600,
              bgcolor: colors.onSurface,
              color: colors.background,
              '&:hover': { bgcolor: colors.primaryFixed },
              '&.Mui-disabled': {
                bgcolor: `${colors.onSurface}99`,
                color: `${colors.background}99`,
              },
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                minWidth: 48,
              }}
            >
              {saving && (
                <CircularProgress size={16} sx={{ color: colors.background }} aria-hidden />
              )}
              Lưu
            </Box>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
