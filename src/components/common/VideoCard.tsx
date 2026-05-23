import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  MoreVert,
  PlayArrow,
  Warning,
  CheckCircle,
  Archive,
  VerifiedUser,
} from '@mui/icons-material';
import { colors } from '../../theme/colors';
import type { Video } from '../../types';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

const statusConfig: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  completed: {
    label: 'Completed',
    color: colors.secondary,
    icon: <CheckCircle sx={{ fontSize: 14 }} />,
  },
  archived: {
    label: 'AUTO-ARCHIVED',
    color: colors.onSurfaceVariant,
    icon: <Archive sx={{ fontSize: 14 }} />,
  },
  verified: {
    label: 'SYSTEM VERIFIED',
    color: '#4caf7d',
    icon: <VerifiedUser sx={{ fontSize: 14 }} />,
  },
  cleared: {
    label: 'AUTO-CLEARED',
    color: colors.secondary,
    icon: <CheckCircle sx={{ fontSize: 14 }} />,
  },
  error: {
    label: 'Error',
    color: colors.error,
    icon: <Warning sx={{ fontSize: 14 }} />,
  },
  processing: {
    label: 'Processing',
    color: colors.primary,
    icon: <CircularProgress size={12} />,
  },
  queued: {
    label: 'Queued',
    color: colors.onSurfaceVariant,
    icon: null,
  },
};

const getSafetyColor = (score: number): string => {
  if (score >= 80) return '#4caf7d';
  if (score >= 50) return '#f5c842';
  return colors.tertiary;
};

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const statusInfo = statusConfig[video.status] ?? statusConfig.completed;
  const safetyColor = getSafetyColor(video.safetyScore);
  const hasViolations = video.violations.length > 0;

  return (
    <Box
      onClick={onClick}
      className="group animate-fade-in"
      sx={{
        backgroundColor: colors.surfaceContainer,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.2s ease, transform 0.2s ease',
        ...(hasViolations && {
          borderLeft: `4px solid ${colors.tertiary}`,
          backgroundColor: `${colors.errorContainer}22`,
        }),
        '&:hover': {
          backgroundColor: colors.surfaceContainerHigh,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Thumbnail placeholder */}
      <Box
        sx={{
          height: 120,
          backgroundColor: colors.surfaceContainerLow,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'rgba(183, 196, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
            '.group:hover &': {
              backgroundColor: 'rgba(183, 196, 255, 0.2)',
            },
          }}
        >
          <PlayArrow sx={{ color: colors.primary, fontSize: 22 }} />
        </Box>

        {/* Safety score badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: `${safetyColor}22`,
            border: `1px solid ${safetyColor}44`,
            borderRadius: 1,
            px: 0.75,
            py: 0.25,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: safetyColor,
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: safetyColor, fontWeight: 700, lineHeight: 1 }}
          >
            {video.safetyScore}%
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 1.5 }}>
        <Box className="flex items-start justify-between gap-2">
          <Box className="flex-1 min-w-0">
            <Tooltip title={video.filename} placement="top">
              <Typography
                variant="body2"
                sx={{
                  color: colors.onSurface,
                  fontWeight: 500,
                  fontFamily: 'Manrope',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {video.filename}
              </Typography>
            </Tooltip>
            {video.processedAt && (
              <Typography
                variant="caption"
                sx={{ color: colors.onSurfaceVariant, mt: 0.25, display: 'block' }}
              >
                Processed: {video.processedAt}
              </Typography>
            )}
          </Box>
          <IconButton
            size="small"
            sx={{ color: colors.onSurfaceVariant, flexShrink: 0, mt: -0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        <Box className="flex items-center gap-1.5 flex-wrap mt-1.5">
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
            {video.size}
          </Typography>
          <Box
            sx={{
              width: 3,
              height: 3,
              borderRadius: '50%',
              backgroundColor: colors.outlineVariant,
            }}
          />
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
            {video.resolution}
          </Typography>

          <Chip
            label={statusInfo.label}
            size="small"
            icon={statusInfo.icon as React.ReactElement}
            sx={{
              height: 18,
              ml: 'auto',
              color: statusInfo.color,
              backgroundColor: `${statusInfo.color}18`,
              fontSize: '0.625rem',
              fontWeight: 600,
              '& .MuiChip-icon': { color: statusInfo.color, fontSize: 12 },
              '& .MuiChip-label': { px: 0.75 },
            }}
          />
        </Box>

        {hasViolations && (
          <Box
            className="flex items-center gap-1 mt-1.5"
            sx={{
              backgroundColor: `${colors.errorContainer}33`,
              borderRadius: 1,
              px: 1,
              py: 0.5,
            }}
          >
            <Warning sx={{ fontSize: 12, color: colors.tertiary }} />
            <Typography
              variant="caption"
              sx={{ color: colors.tertiary, fontWeight: 500 }}
            >
              {video.violations.length} violation
              {video.violations.length > 1 ? 's' : ''} detected
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoCard;
