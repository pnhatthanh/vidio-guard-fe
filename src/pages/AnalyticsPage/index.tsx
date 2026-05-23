import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import {
  VolumeUp,
  Fullscreen,
  Pause,
  SkipNext,
  SkipPrevious,
  Warning,
  InsertDriveFile,
  Schedule,
} from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import ViolationItem from '../../components/common/ViolationItem';
import StatusBadge from '../../components/common/StatusBadge';
import { analyticsVideo, timelineChartData } from '../../data/mockData';
import { colors } from '../../theme/colors';

const AnalyticsPage: React.FC = () => {
  const video = analyticsVideo;

  return (
    <AppShell>
      <TopBar title={video.filename} subtitle={`Recorded: ${video.processedAt}`} />

      <Box sx={{ p: { xs: 2, lg: 4 }, maxWidth: 1600, mx: 'auto' }}>
        <Box className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ── Left/Main Column: Player & Timeline ── */}
          <Box className="col-span-1 xl:col-span-2 flex flex-col gap-6">
            {/* Custom Video Player Placeholder */}
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#000000',
                borderRadius: 2,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                border: `1px solid ${colors.outlineVariant}44`,
              }}
            >
              {/* Fake Video Content */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, #1a233a 0%, #000000 100%)',
                }}
              />

              {/* Top info bar */}
              <Box className="relative z-10 flex justify-between p-4" sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
                <StatusBadge severity="critical" label="Critical Violation Detected" />
                <Typography variant="body2" sx={{ fontFamily: 'Manrope', fontWeight: 700 }}>
                  03:02 / 09:00
                </Typography>
              </Box>

              {/* Bottom controls */}
              <Box className="relative z-10 p-4" sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                {/* Timeline bar */}
                <Box sx={{ width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, mb: 2, position: 'relative', cursor: 'pointer' }}>
                  <Box sx={{ width: '33%', height: '100%', backgroundColor: colors.primary, borderRadius: 2 }} />
                  {/* Markers */}
                  <Box className="timeline-marker-violation" sx={{ position: 'absolute', left: '33%', top: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%' }} />
                  <Box className="timeline-marker-neutral" sx={{ position: 'absolute', left: '60%', top: '50%', transform: 'translate(-50%, -50%)', width: 8, height: 8, borderRadius: '50%' }} />
                </Box>

                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <IconButton size="small" sx={{ color: 'white' }}><SkipPrevious fontSize="small" /></IconButton>
                    <IconButton size="small" sx={{ color: 'white', backgroundColor: `${colors.primary}44`, '&:hover': { backgroundColor: `${colors.primary}66` } }}>
                      <Pause />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}><SkipNext fontSize="small" /></IconButton>
                    <Box sx={{ mx: 1, width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                    <IconButton size="small" sx={{ color: 'white' }}><VolumeUp fontSize="small" /></IconButton>
                  </Box>
                  <IconButton size="small" sx={{ color: 'white' }}><Fullscreen fontSize="small" /></IconButton>
                </Box>
              </Box>
            </Box>

            {/* Moderation Timeline Chart */}
            <Box
              sx={{
                p: 3,
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: 2,
                border: `1px solid ${colors.outlineVariant}22`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, mb: 3 }}>
                Moderation Timeline
              </Typography>
              <Box sx={{ width: '100%', height: 180 }}>
                <ResponsiveContainer>
                  <AreaChart data={timelineChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.tertiary} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={colors.tertiary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="second"
                      stroke={colors.outlineVariant}
                      tick={{ fill: colors.onSurfaceVariant, fontSize: 10 }}
                      tickFormatter={(val) => `${Math.floor(val / 60)}:${String(val % 60).padStart(2, '0')}`}
                    />
                    <YAxis stroke={colors.outlineVariant} tick={{ fill: colors.onSurfaceVariant, fontSize: 10 }} />
                    <Area
                      type="monotone"
                      dataKey="violation"
                      stroke={colors.tertiary}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorConfidence)"
                    />
                    <ReferenceLine x={180} stroke={colors.error} strokeDasharray="3 3" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Typography variant="caption" sx={{ color: colors.tertiary, display: 'block', mt: 1 }}>
                * Suspicious Content Spike at 03:02 (84% Confidence)
              </Typography>
            </Box>
          </Box>

          {/* ── Right Column: Sidebar Data ── */}
          <Box className="col-span-1 flex flex-col gap-6">
            {/* Safety Score */}
            <Box
              sx={{
                p: 3,
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: 2,
                border: `1px solid ${colors.tertiary}44`,
                borderLeft: `4px solid ${colors.tertiary}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background gradient hint */}
              <Box sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', background: `linear-gradient(to left, ${colors.errorContainer}44, transparent)`, pointerEvents: 'none' }} />

              <Typography variant="overline" sx={{ color: colors.tertiary, fontWeight: 700, letterSpacing: 1 }}>
                Safety Confidence
              </Typography>
              <Typography variant="h3" sx={{ fontFamily: 'Manrope', fontWeight: 800, color: colors.onSurface, mt: 0.5 }}>
                {video.safetyScore}%
              </Typography>
              <Typography variant="body2" sx={{ color: colors.tertiary, mt: 1, fontWeight: 600 }}>
                Critical Violation
              </Typography>
              <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, display: 'block', mt: 0.5 }}>
                Human intervention required immediately.
              </Typography>
            </Box>

            {/* Key Violations Log */}
            <Box
              sx={{
                p: 3,
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: 2,
                border: `1px solid ${colors.outlineVariant}22`,
                flex: 1,
              }}
            >
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

            {/* Metadata */}
            <Box
              sx={{
                p: 3,
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: 2,
                border: `1px solid ${colors.outlineVariant}22`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontFamily: 'Manrope', fontWeight: 700, mb: 2 }}>
                Metadata
              </Typography>
              <Box className="flex flex-col gap-2">
                {[
                  { icon: <InsertDriveFile sx={{ fontSize: 16 }} />, label: 'File Size', value: video.size },
                  { icon: <Fullscreen sx={{ fontSize: 16 }} />, label: 'Resolution', value: video.resolution },
                  { icon: <Schedule sx={{ fontSize: 16 }} />, label: 'Duration', value: '09:00' },
                ].map((item) => (
                  <Box key={item.label} className="flex items-center justify-between">
                    <Box className="flex items-center gap-1.5" sx={{ color: colors.onSurfaceVariant }}>
                      {item.icon}
                      <Typography variant="caption">{item.label}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.onSurface, fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Button
                variant="outlined"
                fullWidth
                color="error"
                startIcon={<Warning />}
                sx={{ mb: 1, textTransform: 'none', fontWeight: 600 }}
              >
                QUARANTINE ASSET
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ color: colors.onSurfaceVariant, textTransform: 'none' }}
              >
                Override & Mark Safe
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
};

export default AnalyticsPage;
