import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  MoreHoriz,
  Download,
  DeleteOutlined,
  OpenInNew,
  Shield,
  WarningAmber,
  GppBad,
} from '@mui/icons-material';
import { colors } from '../../../theme/colors';
import type { Video } from '../../../types';
import { VideoPoster } from '../../../components/common/VideoPoster';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import { downloadVideoFile, deleteVideo } from '../../../lib/videoActions';
import { getErrorMessage } from '../../../api/errors';
import { formatDateTimeShort } from '../../../lib/format';

type LibraryVideoCardProps = {
  video: Video;
  onOpen: () => void;
  onDeleted?: (videoId: string) => void;
};

type VerdictTheme = {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
};

function getVerdictTheme(video: Video): VerdictTheme {
  const raw = video.verdictLabel ?? (video.violated ? 'violation' : 'safe');
  switch (raw) {
    case 'safe':
      return {
        label: 'An toàn',
        color: '#6ee7a0',
        bg: 'rgba(74, 222, 128, 0.12)',
        border: 'rgba(74, 222, 128, 0.35)',
        icon: <Shield sx={{ fontSize: 13 }} />,
      };
    case 'warning':
      return {
        label: 'Cảnh báo',
        color: '#f5c842',
        bg: 'rgba(245, 200, 66, 0.12)',
        border: 'rgba(245, 200, 66, 0.35)',
        icon: <WarningAmber sx={{ fontSize: 13 }} />,
      };
    case 'violation':
    case 'violence':
    case 'nsfw':
    default:
      return {
        label: 'Vi phạm',
        color: colors.tertiary,
        bg: 'rgba(205, 0, 60, 0.14)',
        border: 'rgba(255, 179, 182, 0.35)',
        icon: <GppBad sx={{ fontSize: 13 }} />,
      };
  }
}

function getScoreColor(score: number) {
  if (score >= 80) return '#6ee7a0';
  if (score >= 50) return '#f5c842';
  return colors.tertiary;
}

export function LibraryVideoCard({ video, onOpen, onDeleted }: LibraryVideoCardProps) {
  const verdict = getVerdictTheme(video);
  const scoreColor = getScoreColor(video.safetyScore);
  const violationCount = video.violationCount ?? 0;
  const processedShort = formatDateTimeShort(video.processedAtIso);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const closeMenu = () => setMenuAnchor(null);

  const handleDownload = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    closeMenu();
    setActionError(null);
    setActionLoading(true);
    try {
      await downloadVideoFile(video.id);
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setActionError(null);
    setActionLoading(true);
    try {
      await deleteVideo(video.id);
      setConfirmDelete(false);
      onDeleted?.(video.id);
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <Box
        className="library-card group"
        onClick={onOpen}
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          cursor: 'pointer',
          bgcolor: colors.surfaceContainerLow,
          border: `1px solid ${colors.outlineVariant}33`,
          transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
          '&:hover': {
            borderColor: `${colors.primary}44`,
            boxShadow: `0 12px 32px rgba(0, 0, 0, 0.28), 0 0 0 1px ${colors.primary}22`,
          },
        }}
      >
        {/* Thumbnail */}
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9', bgcolor: '#000' }}>
          <VideoPoster videoUrl={video.videoUrl} fill showPlayOnHover />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(6,14,32,0.55) 0%, transparent 38%, transparent 55%, rgba(6,14,32,0.85) 100%)',
              pointerEvents: 'none',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.35,
              borderRadius: 10,
              fontSize: '0.7rem',
              fontWeight: 700,
              fontFamily: 'Manrope',
              color: verdict.color,
              bgcolor: verdict.bg,
              border: `1px solid ${verdict.border}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {verdict.icon}
            {verdict.label}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              minWidth: 44,
              height: 44,
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(6, 14, 32, 0.72)',
              border: `2px solid ${scoreColor}66`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.8rem',
                fontWeight: 800,
                fontFamily: 'Manrope',
                color: scoreColor,
                lineHeight: 1,
              }}
            >
              {video.safetyScore}
            </Typography>
            <Typography sx={{ fontSize: '0.55rem', color: colors.onSurfaceVariant, lineHeight: 1 }}>
              điểm
            </Typography>
          </Box>

          {/* Hover actions */}
          <Box
            className="library-card-actions"
            sx={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              right: 10,
              display: 'flex',
              gap: 0.75,
              opacity: 0,
              transform: 'translateY(6px)',
              transition: 'opacity 0.2s, transform 0.2s',
              '.library-card:hover &, .group:hover &': { opacity: 1, transform: 'translateY(0)' },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              component="button"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              sx={{
                flex: 1,
                py: 0.75,
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
                fontFamily: 'Manrope',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: colors.onSurface,
                bgcolor: 'rgba(183, 196, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                '&:hover': { bgcolor: 'rgba(183, 196, 255, 0.32)' },
              }}
            >
              <OpenInNew sx={{ fontSize: 15 }} />
              Phân tích
            </Box>
            <IconButton
              size="small"
              disabled={actionLoading}
              onClick={(e) => void handleDownload(e)}
              sx={{
                bgcolor: 'rgba(6, 14, 32, 0.65)',
                backdropFilter: 'blur(10px)',
                color: colors.onSurface,
                border: `1px solid ${colors.outlineVariant}44`,
                '&:hover': { bgcolor: 'rgba(6, 14, 32, 0.85)' },
              }}
            >
              {actionLoading ? (
                <CircularProgress size={16} sx={{ color: colors.primary }} />
              ) : (
                <Download sx={{ fontSize: 17 }} />
              )}
            </IconButton>
            <IconButton
              size="small"
              disabled={actionLoading}
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              sx={{
                bgcolor: 'rgba(6, 14, 32, 0.65)',
                backdropFilter: 'blur(10px)',
                color: colors.tertiary,
                border: `1px solid ${colors.tertiaryContainer}44`,
                '&:hover': { bgcolor: 'rgba(205, 0, 60, 0.2)' },
              }}
            >
              <DeleteOutlined sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Meta */}
        <Box sx={{ px: 1.75, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 0.75 }}>
            <Tooltip title={video.filename} placement="top-start">
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 700,
                  fontFamily: 'Manrope',
                  color: colors.onSurface,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.35,
                }}
              >
                {video.filename}
              </Typography>
            </Tooltip>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setMenuAnchor(e.currentTarget);
              }}
              sx={{
                mt: -0.5,
                mr: -0.5,
                color: colors.onSurfaceVariant,
                opacity: 0.7,
                '&:hover': { opacity: 1, bgcolor: colors.surfaceContainerHigh },
              }}
            >
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
              {video.size}
              {processedShort ? ` · ${processedShort}` : ''}
            </Typography>
            {violationCount > 0 ? (
              <Typography
                variant="caption"
                sx={{
                  color: colors.tertiary,
                  fontWeight: 600,
                  px: 0.75,
                  py: 0.15,
                  borderRadius: 1,
                  bgcolor: 'rgba(205, 0, 60, 0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                {violationCount} vi phạm
              </Typography>
            ) : (
              <Typography variant="caption" sx={{ color: '#6ee7a088', fontWeight: 500 }}>
                Sạch
              </Typography>
            )}
          </Box>

          {actionError && (
            <Typography variant="caption" sx={{ color: colors.error, display: 'block', mt: 0.75 }}>
              {actionError}
            </Typography>
          )}
        </Box>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        onClick={(e) => e.stopPropagation()}
        slotProps={{
          paper: {
            sx: {
              bgcolor: colors.surfaceBright,
              border: `1px solid ${colors.outlineVariant}33`,
              borderRadius: 2,
              minWidth: 180,
            },
          },
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
            onOpen();
          }}
        >
          <ListItemIcon>
            <OpenInNew fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Xem phân tích" />
        </MenuItem>
        <MenuItem onClick={() => void handleDownload()} disabled={actionLoading}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tải video" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            setConfirmDelete(true);
          }}
          disabled={actionLoading}
          sx={{ color: colors.error }}
        >
          <ListItemIcon>
            <DeleteOutlined fontSize="small" sx={{ color: colors.error }} />
          </ListItemIcon>
          <ListItemText primary="Xóa video" />
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={confirmDelete}
        title="Xóa video?"
        message={`"${video.filename}" sẽ bị xóa vĩnh viễn khỏi hệ thống.`}
        confirmLabel="Xóa"
        loading={actionLoading}
        danger
        onClose={() => !actionLoading && setConfirmDelete(false)}
        onConfirm={() => void handleDeleteConfirm()}
      />
    </>
  );
}
