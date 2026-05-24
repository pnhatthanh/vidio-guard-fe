import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import { Panel } from '../../components/ui/Panel';
import { useAuth } from '../../features/auth/AuthProvider';
import { usersApi } from '../../api/users';
import { getErrorMessage } from '../../api/errors';
import { colors } from '../../theme/colors';

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setAvatarUrl(user.avatar_url ?? '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setProfileMsg(null);
    setProfileErr(null);
    setSavingProfile(true);
    try {
      await usersApi.updateMe({
        full_name: fullName.trim(),
        avatar_url: avatarUrl.trim() || undefined,
      });
      await refreshProfile();
      setProfileMsg('Đã cập nhật hồ sơ.');
    } catch (err) {
      setProfileErr(getErrorMessage(err));
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setPwdMsg(null);
    setPwdErr(null);
    if (newPassword !== confirmPassword) {
      setPwdErr('Mật khẩu xác nhận không khớp.');
      return;
    }
    setSavingPwd(true);
    try {
      await usersApi.updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPwdMsg('Đã đổi mật khẩu.');
    } catch (err) {
      setPwdErr(getErrorMessage(err));
    } finally {
      setSavingPwd(false);
    }
  };

  if (!user) {
    return (
      <AppShell>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
          <CircularProgress sx={{ color: colors.primary }} />
        </Box>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar title="Hồ sơ" subtitle="Quản lý thông tin tài khoản" />

      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 720, mx: 'auto' }}>
        <Panel title="Thông tin cá nhân">
          <TextField
            label="Họ và tên"
            fullWidth
            size="small"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            size="small"
            value={user.email}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="Avatar URL (tuỳ chọn)"
            fullWidth
            size="small"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            sx={{ mb: 2 }}
          />

          {profileErr && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {profileErr}
            </Alert>
          )}
          {profileMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {profileMsg}
            </Alert>
          )}

          <Button
            variant="contained"
            disabled={savingProfile}
            onClick={() => void handleSaveProfile()}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            {savingProfile ? 'Đang lưu…' : 'Lưu thay đổi'}
          </Button>
        </Panel>

        <Divider sx={{ my: 4, opacity: 0.2 }} />

        <Panel title="Đổi mật khẩu">
          <TextField
            label="Mật khẩu hiện tại"
            type="password"
            fullWidth
            size="small"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mật khẩu mới"
            type="password"
            fullWidth
            size="small"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Xác nhận mật khẩu mới"
            type="password"
            fullWidth
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          {pwdErr && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {pwdErr}
            </Alert>
          )}
          {pwdMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {pwdMsg}
            </Alert>
          )}

          <Button
            variant="outlined"
            disabled={savingPwd || !currentPassword || !newPassword}
            onClick={() => void handleChangePassword()}
            sx={{ textTransform: 'none', borderColor: colors.outlineVariant, color: colors.onSurface }}
          >
            {savingPwd ? 'Đang đổi…' : 'Đổi mật khẩu'}
          </Button>
        </Panel>

        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, mt: 3, display: 'block' }}>
          Tham gia: {new Date(user.created_at).toLocaleDateString('vi-VN')}
        </Typography>
      </Box>
    </AppShell>
  );
}
