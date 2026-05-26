import React from 'react';
import { Box } from '@mui/material';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import { ProfileDialogs } from '../../features/profile/ProfileDialogs';
import { ProfileDialogProvider } from '../../features/profile/ProfileDialogContext';
import { colors } from '../../theme/colors';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <ProfileDialogProvider>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: colors.background,
        }}
      >
        <Sidebar />
        <Box
          component="main"
          className="app-mesh"
          sx={{
            flex: 1,
            marginLeft: `${SIDEBAR_WIDTH}px`,
            minHeight: '100vh',
            backgroundColor: colors.background,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
      <ProfileDialogs />
    </ProfileDialogProvider>
  );
};

export default AppShell;
