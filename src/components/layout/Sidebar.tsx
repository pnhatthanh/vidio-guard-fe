import React, { useState } from 'react';
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
  Tooltip,
} from '@mui/material';
import {
  Dashboard,
  CloudUpload,
  VideoLibrary,
  Insights,
  Settings,
  ContactSupport,
  Logout,
} from '@mui/icons-material';
import { colors } from '../../theme/colors';
import { currentUser } from '../../data/mockData';

const SIDEBAR_WIDTH = 220;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Upload', icon: <CloudUpload />, path: '/upload' },
  { label: 'Library', icon: <VideoLibrary />, path: '/library' },
  { label: 'Analytics', icon: <Insights />, path: '/analytics/analytics-main' },
  { label: 'Settings', icon: <Settings />, path: '/settings' },
];

const bottomNavItems: NavItem[] = [
  { label: 'Support', icon: <ContactSupport />, path: '/support' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname.startsWith(path.split('/')[1] === '' ? path : `/${path.split('/')[1]}`);

  const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
    const active = isActive(item.path);
    const hovered = hoveredPath === item.path;

    return (
      <ListItem disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          selected={active}
          onClick={() => navigate(item.path)}
          onMouseEnter={() => setHoveredPath(item.path)}
          onMouseLeave={() => setHoveredPath(null)}
          sx={{
            borderRadius: '8px',
            py: 1,
            px: 1.5,
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
            '&.Mui-selected': {
              backgroundColor: `${colors.primaryContainer}1a`,
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
            '&:hover': {
              backgroundColor: colors.surfaceContainerHigh,
            },
            ...(hovered && !active && {
              backgroundColor: colors.surfaceContainerHigh,
            }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: active ? colors.primary : colors.onSurfaceVariant,
              transition: 'color 0.2s',
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
                  fontFamily: 'Inter',
                  fontWeight: active ? 600 : 400,
                  color: active ? colors.onSurface : colors.onSurfaceVariant,
                  transition: 'color 0.2s, font-weight 0.2s',
                }
              }
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
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
      {/* Logo */}
      <Box sx={{ px: 1, mb: 3 }}>
        <Box className="flex items-center gap-2">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <VideoLibrary sx={{ fontSize: 18, color: colors.onPrimary }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 700,
                color: colors.onSurface,
                lineHeight: 1.2,
                fontSize: '0.875rem',
              }}
            >
              Curator AI
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: colors.onSurfaceVariant, fontSize: '0.625rem' }}
            >
              Luminous Authority
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Nav */}
      <List disablePadding sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavButton key={item.path} item={item} />
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      {/* Bottom Nav */}
      <List disablePadding>
        {bottomNavItems.map((item) => (
          <NavButton key={item.path} item={item} />
        ))}
        <ListItem disablePadding sx={{ mt: 0.5 }}>
          <ListItemButton
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: '8px',
              py: 1,
              px: 1.5,
              '&:hover': { backgroundColor: `${colors.errorContainer}33` },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: colors.error }}>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              slotProps={{
                primary: {
                  sx: {
                    fontSize: '0.875rem',
                    color: colors.error,
                  }
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />

      {/* User Profile */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 1,
          py: 0.5,
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': { backgroundColor: colors.surfaceContainerHigh },
        }}
      >
        <Tooltip title={currentUser.role}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              color: colors.onPrimary,
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'Manrope',
              flexShrink: 0,
            }}
          >
            {currentUser.initials}
          </Avatar>
        </Tooltip>
        <Box className="min-w-0">
          <Typography
            variant="caption"
            sx={{
              color: colors.onSurface,
              fontWeight: 600,
              fontFamily: 'Manrope',
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentUser.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: colors.onSurfaceVariant,
              fontSize: '0.625rem',
              display: 'block',
            }}
          >
            {currentUser.role}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { SIDEBAR_WIDTH };
export default Sidebar;
