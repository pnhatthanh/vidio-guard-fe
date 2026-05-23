import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.background,
      paper: colors.surfaceContainer,
    },
    primary: {
      main: colors.primary,
      contrastText: colors.onPrimary,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.onSecondary,
    },
    error: {
      main: colors.error,
      contrastText: colors.onError,
    },
    text: {
      primary: colors.onSurface,
      secondary: colors.onSurfaceVariant,
    },
    divider: colors.outlineVariant,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Manrope', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Manrope', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Manrope', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Manrope', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Manrope', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Manrope', sans-serif", fontWeight: 600 },
    subtitle1: { fontFamily: "'Inter', sans-serif", fontWeight: 500 },
    subtitle2: { fontFamily: "'Inter', sans-serif", fontWeight: 500 },
    body1: { fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem' },
    body2: { fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' },
    caption: { fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem' },
    button: { fontFamily: "'Inter', sans-serif", fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
          color: colors.onSurface,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 20px',
          fontWeight: 600,
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
          color: colors.onPrimary,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primaryFixed} 0%, ${colors.primaryContainer} 100%)`,
            boxShadow: '0 4px 16px rgba(0, 82, 255, 0.35)',
          },
        },
        outlinedPrimary: {
          borderColor: colors.outline,
          color: colors.primary,
          '&:hover': {
            backgroundColor: colors.surfaceBright,
            borderColor: colors.primary,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surfaceContainer,
          backgroundImage: 'none',
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.surfaceContainerHigh,
            '& fieldset': {
              borderColor: colors.outlineVariant,
            },
            '&:hover fieldset': {
              borderColor: colors.outline,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.onSurfaceVariant,
          },
          '& .MuiInputBase-input': {
            color: colors.onSurface,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 500,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.surfaceContainerHighest,
          color: colors.onSurface,
          fontSize: '0.75rem',
          border: `1px solid ${colors.outlineVariant}`,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surfaceVariant,
          borderRadius: 2,
          height: 4,
        },
        bar: {
          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
          borderRadius: 2,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.surfaceContainerLow,
          borderRight: `1px solid ${colors.outlineVariant}22`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.outlineVariant,
          opacity: 0.3,
        },
      },
    },
  },
});

export default theme;
