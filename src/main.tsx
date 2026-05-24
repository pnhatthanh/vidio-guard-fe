import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './features/auth/AuthProvider';
import { PipelineProvider } from './features/pipeline/PipelineProvider';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <PipelineProvider>
          <App />
        </PipelineProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
