import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import { CloudUpload, VideoLibrary, Logout } from '@mui/icons-material';
import { colors } from '../../theme/colors';
import { useAuth } from '../../features/auth/AuthProvider';
import { BrandLogo } from '../brand/BrandLogo';

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

export const SIDEBAR_WIDTH = 240;

type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  { label: 'Tải video', icon: <CloudUpload />, path: '/upload' },
  { label: 'Thư viện', icon: <VideoLibrary />, path: '/library' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const isActive = (path: string) => {
    const base = path.split('/').slice(0, 2).join('/');
    return location.pathname.startsWith(base);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.surfaceContainerLow,
        borderRight: `1px solid ${colors.outlineVariant}22`,
        zIndex: 100,
        py: 2,
        px: 1.5,
      }}
    >
      <Box sx={{ px: 0.5, mb: 3 }}>
        <button type="button" onClick={() => navigate('/upload')} className="cursor-pointer">
          <BrandLogo size="sm" />
        </button>
      </Box>

      <List disablePadding sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={active}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  '&.Mui-selected': {
                    backgroundColor: `${colors.primaryContainer}18`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: 3,
                      backgroundColor: colors.primary,
                      borderRadius: '0 2px 2px 0',
                    },
                  },
                  '&:hover': { backgroundColor: colors.surfaceContainerHigh },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? colors.primary : colors.onSurfaceVariant,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '0.875rem',
                        fontWeight: active ? 600 : 400,
                        color: active ? colors.onSurface : colors.onSurfaceVariant,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 1, opacity: 0.3 }} />

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => void handleLogout()}
          sx={{
            borderRadius: 2,
            '&:hover': { backgroundColor: `${colors.errorContainer}22` },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: colors.error }}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Đăng xuất"
            slotProps={{ primary: { sx: { fontSize: '0.875rem', color: colors.error } } }}
          />
        </ListItemButton>
      </ListItem>

      <Box
        component="button"
        type="button"
        onClick={() => navigate('/profile')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mt: 1.5,
          px: 1,
          py: 1,
          borderRadius: 2,
          backgroundColor: colors.surfaceContainer,
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          '&:hover': { backgroundColor: colors.surfaceContainerHigh },
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            fontSize: '0.75rem',
            fontWeight: 700,
            fontFamily: 'Manrope',
          }}
        >
          {user ? getInitials(user.full_name) : '?'}
        </Avatar>
        <Box className="min-w-0">
          <Typography
            variant="caption"
            sx={{ color: colors.onSurface, fontWeight: 600, display: 'block' }}
          >
            {user?.full_name ?? '—'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: colors.onSurfaceVariant,
              fontSize: '0.65rem',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.email ?? ''}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
