import {
  Popover,
  Box,
  Typography,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ChevronRight,
  PersonOutlined,
  LockOutlined,
  Logout,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { colors } from '../../theme/colors';
import { useProfileDialog } from './ProfileDialogContext';

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

type MenuRowProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

function MenuRow({ icon, label, onClick, danger }: MenuRowProps) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        py: 1.1,
        px: 1.5,
        borderRadius: 1.5,
        mx: 0.75,
        '&:hover': { bgcolor: colors.surfaceContainerHigh },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 32,
          color: danger ? colors.error : colors.onSurfaceVariant,
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        slotProps={{
          primary: {
            sx: {
              fontSize: '0.875rem',
              fontWeight: 500,
              color: danger ? colors.error : colors.onSurface,
            },
          },
        }}
      />
    </ListItemButton>
  );
}

export function UserAccountMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    menuAnchor,
    closeUserMenu,
    openEditProfile,
    openChangePassword,
  } = useProfileDialog();

  const open = Boolean(menuAnchor);

  const handleLogout = async () => {
    closeUserMenu();
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <Popover
      open={open}
      anchorEl={menuAnchor}
      onClose={closeUserMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      slotProps={{
        paper: {
          sx: {
            width: 280,
            borderRadius: 2.5,
            bgcolor: colors.surfaceBright,
            border: `1px solid ${colors.outlineVariant}33`,
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
            backgroundImage: 'none',
            overflow: 'hidden',
            py: 0.75,
          },
        },
      }}
    >
      <ListItemButton
        onClick={openEditProfile}
        sx={{
          py: 1.25,
          px: 1.5,
          '&:hover': { bgcolor: colors.surfaceContainerHigh },
        }}
      >
        <Avatar
          src={user?.avatar_url || undefined}
          sx={{
            width: 36,
            height: 36,
            mr: 1.5,
            bgcolor: colors.primaryContainer,
            fontSize: '0.8rem',
            fontWeight: 700,
            fontFamily: 'Manrope',
          }}
        >
          {user ? getInitials(user.full_name) : '?'}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: colors.onSurface }}>
            {user?.full_name ?? '—'}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
            {user?.email ?? ''}
          </Typography>
        </Box>
        <ChevronRight sx={{ fontSize: 18, color: colors.onSurfaceVariant }} />
      </ListItemButton>

      <Divider sx={{ my: 0.75, opacity: 0.25 }} />

      <List disablePadding>
        <MenuRow
          icon={<PersonOutlined sx={{ fontSize: 20 }} />}
          label="Hồ sơ"
          onClick={openEditProfile}
        />
        {user?.has_password && (
          <MenuRow
            icon={<LockOutlined sx={{ fontSize: 20 }} />}
            label="Đổi mật khẩu"
            onClick={openChangePassword}
          />
        )}
      </List>

      <Divider sx={{ my: 0.75, opacity: 0.25 }} />

      <MenuRow
        icon={<Logout sx={{ fontSize: 20 }} />}
        label="Đăng xuất"
        onClick={() => void handleLogout()}
        danger
      />
    </Popover>
  );
}
