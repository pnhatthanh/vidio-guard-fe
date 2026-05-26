import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import type { Video } from '../../../types';
import { LibraryVideoCard } from './LibraryVideoCard';

type LibraryVideoGridProps = {
  videos: Video[];
  onOpen: (videoId: string) => void;
  onDeleted: (videoId: string) => void;
};

const layoutEase = [0.4, 0, 0.2, 1] as const;

export function LibraryVideoGrid({ videos, onOpen, onDeleted }: LibraryVideoGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
        gap: 2.5,
        mb: 4,
      }}
    >
      <Box component="span" sx={{ display: 'contents' }}>
        <AnimatePresence mode="popLayout" initial={false}>
        {videos.map((video) => (
          <motion.div
            key={video.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
            }}
            transition={{
              layout: { duration: 0.45, ease: layoutEase },
              opacity: { duration: 0.3, ease: layoutEase },
              scale: { duration: 0.3, ease: layoutEase },
            }}
            style={{ minWidth: 0 }}
          >
            <LibraryVideoCard
              video={video}
              onOpen={() => onOpen(video.id)}
              onDeleted={onDeleted}
            />
          </motion.div>
        ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
