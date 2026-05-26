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
import {
  CheckCircle,
  Block,
  ArrowBack,
  InsertDriveFile,
  Schedule,
  Download,
  DeleteOutlined,
} from '@mui/icons-material';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { downloadVideoFile, deleteVideo } from '../../lib/videoActions';
import { getErrorMessage } from '../../api/errors';
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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!video) return;
    setActionError(null);
    setActionLoading(true);
    try {
      await downloadVideoFile(video.id);
    } catch (e) {
      setActionError(getErrorMessage(e));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!video) return;
    setActionError(null);
    setActionLoading(true);
    try {
      await deleteVideo(video.id);
      navigate('/library', { replace: true });
    } catch (e) {
      setActionError(getErrorMessage(e));
    } finally {
      setActionLoading(false);
    }
  };

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              startIcon={<Download />}
              disabled={actionLoading}
              onClick={() => void handleDownload()}
              sx={{ color: colors.onSurfaceVariant, textTransform: 'none' }}
            >
              Tải xuống
            </Button>
            <Button
              size="small"
              startIcon={<DeleteOutlined />}
              disabled={actionLoading}
              onClick={() => setConfirmDelete(true)}
              sx={{ color: colors.error, textTransform: 'none' }}
            >
              Xóa
            </Button>
            <Button
              size="small"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/library')}
              sx={{ color: colors.onSurfaceVariant, textTransform: 'none' }}
            >
              Thư viện
            </Button>
          </Box>
        }
      />

      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
        {actionError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setActionError(null)}>
            {actionError}
          </Alert>
        )}

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

              <Divider sx={{ my: 2, opacity: 0.15 }} />

              <Button
                variant="outlined"
                fullWidth
                startIcon={<Download />}
                disabled={actionLoading}
                onClick={() => void handleDownload()}
                sx={{
                  mb: 1.25,
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.1,
                  borderColor: `${colors.primary}55`,
                  color: colors.primary,
                }}
              >
                Tải file gốc
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<DeleteOutlined />}
                disabled={actionLoading}
                onClick={() => setConfirmDelete(true)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.1,
                  borderColor: `${colors.error}55`,
                  color: colors.error,
                  '&:hover': {
                    borderColor: colors.error,
                    bgcolor: `${colors.errorContainer}18`,
                  },
                }}
              >
                Xóa video
              </Button>
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

      <ConfirmDialog
        open={confirmDelete}
        title="Xóa video?"
        message={`"${video.filename}" sẽ bị xóa vĩnh viễn khỏi hệ thống.`}
        confirmLabel="Xóa"
        loading={actionLoading}
        danger
        onClose={() => !actionLoading && setConfirmDelete(false)}
        onConfirm={() => void handleDelete()}
      />
    </AppShell>
  );
}
