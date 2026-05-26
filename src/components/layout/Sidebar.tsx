import { useRef } from 'react';
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
import { CloudUpload, VideoLibrary, ExpandMore } from '@mui/icons-material';
import { colors } from '../../theme/colors';
import { useAuth } from '../../features/auth/AuthProvider';
import { useProfileDialog } from '../../features/profile/ProfileDialogContext';
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
  const { user } = useAuth();
  const { openUserMenu } = useProfileDialog();
  const userButtonRef = useRef<HTMLButtonElement>(null);

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

      <Box
        component="button"
        type="button"
        ref={userButtonRef}
        onClick={() => {
          if (userButtonRef.current) openUserMenu(userButtonRef.current);
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          mt: 0.5,
          px: 1.25,
          py: 1.25,
          borderRadius: 2,
          backgroundColor: colors.surfaceContainer,
          border: `1px solid ${colors.outlineVariant}22`,
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          transition: 'background-color 0.2s',
          '&:hover': { backgroundColor: colors.surfaceContainerHigh },
        }}
      >
        <Avatar
          src={user?.avatar_url || undefined}
          sx={{
            width: 32,
            height: 32,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            fontSize: '0.7rem',
            fontWeight: 700,
            fontFamily: 'Manrope',
          }}
        >
          {user ? getInitials(user.full_name) : '?'}
        </Avatar>
        <Box className="min-w-0" sx={{ flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: colors.onSurface,
              fontWeight: 600,
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.8rem',
            }}
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
            Vigilant Lens
          </Typography>
        </Box>
        <ExpandMore sx={{ fontSize: 18, color: colors.onSurfaceVariant, flexShrink: 0 }} />
      </Box>
    </Box>
  );
}
