import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './features/auth/AuthProvider';
import { PipelineProvider } from './features/pipeline/PipelineProvider';
import { getGoogleClientId } from './lib/googleAuth';
import './index.css';
import App from './App.tsx';

function AppProviders({ children }: { children: ReactNode }) {
  const googleClientId = getGoogleClientId();
  const tree = (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <PipelineProvider>{children}</PipelineProvider>
      </AuthProvider>
    </ThemeProvider>
  );

  if (googleClientId) {
    return <GoogleOAuthProvider clientId={googleClientId}>{tree}</GoogleOAuthProvider>;
  }

  return tree;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
