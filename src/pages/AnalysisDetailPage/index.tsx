import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import {
  PlayArrow,
  InfoOutlined,
  Block,
  Fullscreen,
} from '@mui/icons-material';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import ViolationItem from '../../components/common/ViolationItem';
import { analysisDetailVideo } from '../../data/mockData';
import { colors } from '../../theme/colors';

const AnalysisDetailPage: React.FC = () => {
  const video = analysisDetailVideo;

  return (
    <AppShell>
      <TopBar title={`Analysis: ${video.filename}`} />

      <Box sx={{ p: { xs: 2, lg: 4 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Full-width Video Player Placeholder */}
        <Box
          sx={{
            width: '100%',
            aspectRatio: '21/9',
            backgroundColor: '#000000',
            borderRadius: 3,
            position: 'relative',
            mb: 4,
            overflow: 'hidden',
            border: `1px solid ${colors.outlineVariant}44`,
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />

          {/* Overlay Box in middle */}
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: `2px solid ${colors.tertiary}`, width: '20%', height: '40%', borderRadius: 1 }}>
            <Box sx={{ position: 'absolute', top: -20, left: 0, backgroundColor: colors.tertiary, color: colors.onTertiary, px: 1, fontSize: 10, fontWeight: 700, borderRadius: 0.5 }}>Weapon Detected: 91%</Box>
          </Box>

          {/* Bottom controls */}
          <Box className="absolute bottom-0 left-0 right-0 p-4" sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
            <Box sx={{ width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, mb: 2, position: 'relative' }}>
              <Box sx={{ width: '60%', height: '100%', backgroundColor: colors.primary, borderRadius: 2 }} />
              {/* Markers */}
              <Box className="timeline-marker-violation" sx={{ position: 'absolute', left: '33%', top: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%' }} />
              <Box className="timeline-marker-violation" sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%' }} />
            </Box>
            <Box className="flex justify-between items-center text-white">
              <Box className="flex items-center gap-2">
                <IconButton size="small" color="inherit"><PlayArrow /></IconButton>
                <Typography variant="body2" sx={{ fontFamily: 'Manrope', ml: 1 }}>04:00 / 12:00</Typography>
              </Box>
              <IconButton size="small" color="inherit"><Fullscreen /></IconButton>
            </Box>
          </Box>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left info column */}
          <Box className="flex flex-col gap-6">
            <Box sx={{ p: 3, backgroundColor: colors.surfaceContainerLow, borderRadius: 2, border: `1px solid ${colors.outlineVariant}22` }}>
              <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, mb: 2 }}>
                Key Violations Log
              </Typography>
              <Box className="flex flex-col gap-2">
                {video.violations.map((violation, idx) => (
                  <ViolationItem
                    key={violation.id}
                    violation={violation}
                    showDivider={idx < video.violations.length - 1}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right info column */}
          <Box className="flex flex-col gap-6">
            <Box sx={{ p: 3, backgroundColor: colors.surfaceContainerHigh, borderRadius: 2, border: `1px solid ${colors.tertiary}44` }}>
              <Box className="flex items-start gap-3">
                <InfoOutlined sx={{ color: colors.tertiary, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 0.5 }}>
                    CURATOR'S NOTE
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
                    AI high-confidence match on weapon detection and aggressive movement patterns during the 3-minute mark. Immediate intervention recommended.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 3, backgroundColor: colors.surfaceContainerLow, borderRadius: 2, border: `1px solid ${colors.outlineVariant}22` }}>
              <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, mb: 2 }}>
                Moderation Action
              </Typography>
              <Box className="flex flex-col gap-2.5">
                <Button variant="contained" color="error" fullWidth startIcon={<Block />} sx={{ fontWeight: 700, py: 1.5 }}>
                  Take Down (Violation)
                </Button>
                <Button variant="outlined" fullWidth sx={{ borderColor: colors.outlineVariant, color: colors.onSurface }}>
                  Age Restrict (18+)
                </Button>
                <Button variant="outlined" fullWidth sx={{ borderColor: colors.outlineVariant, color: colors.onSurface }}>
                  Mark as Safe (False Positive)
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
};

export default AnalysisDetailPage;
