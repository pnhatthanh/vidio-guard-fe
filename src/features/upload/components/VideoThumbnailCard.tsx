import { Box, Typography, Tooltip } from '@mui/material';
import { Movie, PlayCircle } from '@mui/icons-material';
import { colors } from '../../../theme/colors';
import { useVideoPoster } from '../../../lib/videoPoster';

type VideoThumbnailCardProps = {
  previewUrl: string;
  name: string;
  selected: boolean;
  onClick: () => void;
};

export function VideoThumbnailCard({ previewUrl, name, selected, onClick }: VideoThumbnailCardProps) {
  const { posterUrl } = useVideoPoster(previewUrl, { width: 256, height: 144 });

  return (
    <Tooltip title={name}>
      <Box
        onClick={onClick}
        sx={{
          width: 128,
          flexShrink: 0,
          borderRadius: 1.5,
          overflow: 'hidden',
          cursor: 'pointer',
          border: `2px solid ${selected ? colors.primary : colors.outlineVariant}44`,
          opacity: selected ? 1 : 0.8,
          transition: 'all 0.2s',
          '&:hover': { opacity: 1, borderColor: colors.primary },
        }}
      >
        <Box
          sx={{
            height: 72,
            bgcolor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {posterUrl ? (
            <Box
              component="img"
              src={posterUrl}
              alt=""
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          ) : (
            <Movie sx={{ color: colors.onSurfaceVariant, fontSize: 28 }} />
          )}
          {selected && (
            <PlayCircle
              sx={{
                position: 'absolute',
                color: colors.primary,
                fontSize: 32,
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))',
              }}
            />
          )}
        </Box>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            px: 0.75,
            py: 0.5,
            bgcolor: colors.surfaceContainer,
            color: colors.onSurface,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.65rem',
          }}
        >
          {name}
        </Typography>
      </Box>
    </Tooltip>
  );
}
