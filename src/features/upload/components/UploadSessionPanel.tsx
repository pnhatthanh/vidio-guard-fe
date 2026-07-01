import { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Add, SmartToy } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { getErrorMessage } from '../../../api/errors';
import type { UploadItem } from '../hooks/useUploadSession';
import { VideoPreviewPlayer } from './VideoPreviewPlayer';
import { VideoThumbnailCard } from './VideoThumbnailCard';
import { colors } from '../../../theme/colors';

type UploadSessionPanelProps = {
  items: UploadItem[];
  activeId: string;
  activeItem: UploadItem;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onAddFiles: (files: File[]) => void;
  onDuration: (id: string, sec: number) => void;
  onUploadFile: (file: File) => Promise<string>;
  onUploadSuccess?: () => void;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDuration(sec?: number) {
  if (!sec || !Number.isFinite(sec)) return '--:--';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function UploadSessionPanel({
  items,
  activeId,
  activeItem,
  onSelect,
  onRemove,
  onAddFiles,
  onDuration,
  onUploadFile,
  onUploadSuccess,
}: UploadSessionPanelProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: onAddFiles,
    accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] },
    maxSize: 2 * 1024 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
  });

  const handleUpload = async () => {
    setError(null);
    setUploading(true);
    try {
      await onUploadFile(activeItem.file);
      onUploadSuccess?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-4">
      {/* key={activeId} — remount player, reset state khi chuyển video */}
      <VideoPreviewPlayer
        key={activeId}
        item={activeItem}
        onDuration={onDuration}
        onRemove={onRemove}
      />

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: colors.surfaceContainerLow,
          border: `1px solid ${colors.outlineVariant}22`,
        }}
      >
        <Box className="flex flex-wrap items-start justify-between gap-3">
          <Box className="min-w-0 flex-1">
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 700,
                color: colors.onSurface,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {activeItem.file.name}
            </Typography>
            <Box className="flex flex-wrap gap-2 mt-1">
              <Chip
                size="small"
                label={formatSize(activeItem.file.size)}
                sx={{ height: 22, fontSize: '0.7rem', bgcolor: colors.surfaceContainerHigh }}
              />
              <Chip
                size="small"
                label={`${items.length} video`}
                sx={{ height: 22, fontSize: '0.7rem', bgcolor: colors.surfaceContainerHigh }}
              />
              {activeItem.durationSec != null && (
                <Chip
                  size="small"
                  label={formatDuration(activeItem.durationSec)}
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    bgcolor: `${colors.primaryContainer}22`,
                    color: colors.primary,
                  }}
                />
              )}
            </Box>
          </Box>

          <Box className="flex gap-2 shrink-0">
            {/* <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              onClick={open}
              sx={{ borderColor: colors.outlineVariant, color: colors.onSurface, textTransform: 'none' }}
            >
              Thêm video
            </Button> */}
            <Button
              variant="contained"
              size="small"
              startIcon={<SmartToy />}
              disabled={uploading}
              onClick={() => void handleUpload()}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimary,
              }}
            >
              {uploading ? 'Đang upload…' : 'Upload & phân tích AI'}
            </Button>
          </Box>
        </Box>

        {error && (
          <Typography variant="caption" sx={{ color: colors.tertiary, mt: 1.5, display: 'block' }}>
            {error}
          </Typography>
        )}

      </Box>

      {items.length > 1 && (
        <Box>
          <Typography
            variant="caption"
            sx={{ color: colors.onSurfaceVariant, mb: 1.5, display: 'block', fontWeight: 600 }}
          >
            Chọn video để xem ({items.length})
          </Typography>
          <Box className="flex gap-2 overflow-x-auto pb-1">
            {items.map((item) => (
              <VideoThumbnailCard
                key={item.id}
                previewUrl={item.previewUrl}
                name={item.file.name}
                selected={item.id === activeId}
                onClick={() => onSelect(item.id)}
              />
            ))}
          </Box>
        </Box>
      )}

      <Box {...getRootProps()} sx={{ display: 'none' }}>
        <input {...getInputProps()} />
      </Box>
    </Box>
  );
}
