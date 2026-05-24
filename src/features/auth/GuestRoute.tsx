import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from './AuthProvider';
import { colors } from '../../theme/colors';

type GuestRouteProps = {
  children: React.ReactNode;
};

/** Trang login/landing: đã đăng nhập thì chuyển vào app */
export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: colors.background,
        }}
      >
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/upload" replace />;
  }

  return children;
}
