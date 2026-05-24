import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CheckCircle, Block, ArrowBack, InsertDriveFile, Schedule } from '@mui/icons-material';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import { VideoPlayer } from '../../features/analytics/components/VideoPlayer';
import { KeyViolationsLog } from '../../features/analytics/components/KeyViolationsLog';
import { DetectionSummary } from '../../features/analytics/components/DetectionSummary';
import { SafetyOverview } from '../../features/analytics/components/SafetyOverview';
import { useVideoDetail } from '../../features/videos/hooks/useVideoDetail';
import { getCategoryScores } from '../../features/analytics/utils/violationMeta';
import { colors } from '../../theme/colors';

export default function AnalyticsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { video, loading, error } = useVideoDetail(id);
  const [seekToSec, setSeekToSec] = useState<number | null>(null);

  if (loading) {
    return (
      <AppShell>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: colors.primary }} />
        </Box>
      </AppShell>
    );
  }

  if (error || !video) {
    return (
      <AppShell>
        <Box sx={{ p: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error ?? 'Không tìm thấy video'}
          </Alert>
          <Button onClick={() => navigate('/library')}>Về thư viện</Button>
        </Box>
      </AppShell>
    );
  }

  const hasViolations = (video.violationCount ?? video.violations.length) > 0;
  const isProcessing = video.status === 'processing' || video.status === 'uploaded';
  const durationSec = video.duration ?? 0;
  const categoryScores = getCategoryScores(video.violations);

  return (
    <AppShell>
      <TopBar
        title={video.filename}
        subtitle={`Xử lý: ${video.processedAt ?? '—'}`}
        action={
          <Button
            size="small"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/library')}
            sx={{ color: colors.onSurfaceVariant, textTransform: 'none' }}
          >
            Thư viện
          </Button>
        }
      />

      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          {/* Cột trái: video + timeline + log */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, minWidth: 0 }}>
            <VideoPlayer
              video={video}
              showDetectionBox={hasViolations && !isProcessing}
              seekToSec={seekToSec}
            />

            <KeyViolationsLog
              violations={video.violations}
              isProcessing={isProcessing}
              onSeek={(sec) => setSeekToSec(sec)}
            />
          </Box>

          {/* Sidebar phải */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <SafetyOverview
              safetyScore={video.safetyScore}
              verdictLabel={video.verdictLabel}
              hasViolations={hasViolations}
            />

            {!isProcessing && (
              <DetectionSummary scores={categoryScores} />
            )}

            <Box
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}22`,
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: colors.onSurfaceVariant, fontWeight: 700, display: 'block', mb: 1.5 }}
              >
                Thông tin file
              </Typography>
              {[
                { icon: <InsertDriveFile sx={{ fontSize: 15 }} />, label: 'Tên file', value: video.filename },
                {
                  icon: <Schedule sx={{ fontSize: 15 }} />,
                  label: 'Thời lượng',
                  value: durationSec
                    ? `${Math.floor(durationSec / 60)}:${String(Math.floor(durationSec % 60)).padStart(2, '0')}`
                    : '—',
                },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.onSurfaceVariant }}>
                    {item.icon}
                    <Typography variant="caption">{item.label}</Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.onSurface,
                      fontWeight: 600,
                      maxWidth: '55%',
                      textAlign: 'right',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {hasViolations && !isProcessing && (
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2.5,
                  bgcolor: colors.surfaceContainerLow,
                  border: `1px solid ${colors.outlineVariant}22`,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: colors.onSurfaceVariant, fontWeight: 700, display: 'block', mb: 2 }}
                >
                  Hành động kiểm duyệt
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CheckCircle />}
                  sx={{
                    mb: 1.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    py: 1.25,
                    bgcolor: colors.primaryContainer,
                    '&:hover': { bgcolor: colors.inversePrimary },
                  }}
                >
                  Duyệt video
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Block />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.25,
                    borderColor: `${colors.tertiaryContainer}66`,
                    color: colors.tertiary,
                    '&:hover': {
                      borderColor: colors.tertiaryContainer,
                      bgcolor: `${colors.errorContainer}18`,
                    },
                  }}
                >
                  Từ chối & gỡ nội dung
                </Button>

                <Divider sx={{ my: 2, opacity: 0.15 }} />

                <Typography
                  variant="caption"
                  sx={{
                    color: colors.onSurfaceVariant,
                    display: 'block',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { color: colors.primary },
                  }}
                >
                  Chuyển lên admin cấp cao
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}
