import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { colors } from '../../../theme/colors';

type VideoDropZoneProps = {
  onFiles: (files: File[]) => void;
};

export function VideoDropZone({ onFiles }: VideoDropZoneProps) {
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback(
    (accepted: File[]) => {
      setDragOver(false);
      onFiles(accepted);
    },
    [onFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] },
    maxSize: 2 * 1024 * 1024 * 1024,
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  });

  const active = dragOver || isDragActive;

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: `2px dashed ${active ? colors.primary : colors.outlineVariant}`,
        borderRadius: 3,
        p: { xs: 5, md: 7 },
        py: { xs: 6, md: 8 },
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: active ? `${colors.primaryContainer}12` : colors.surfaceContainerLow,
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: colors.primary,
          backgroundColor: `${colors.primaryContainer}08`,
        },
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          mx: 'auto',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.primaryContainer}33)`,
          transform: active ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.2s',
        }}
      >
        <CloudUpload sx={{ fontSize: 36, color: active ? colors.primary : colors.onSurfaceVariant }} />
      </Box>
      <Typography variant="h6" sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 1 }}>
        {active ? 'Thả file để tải lên' : 'Kéo thả video vào đây'}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, mb: 2 }}>
        MP4, MOV, AVI, MKV — tối đa 2GB/file. Xử lý AI bắt đầu ngay sau khi upload.
      </Typography>
      <Button variant="outlined" size="small" sx={{ borderColor: colors.outline, color: colors.onSurface }}>
        Chọn file
      </Button>
    </Box>
  );
}
