import React from 'react';
import { Box } from '@mui/material';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import { colors } from '../../theme/colors';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
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
  );
};

export default AppShell;
