import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import { LibraryVideoGrid } from '../../features/library/components/LibraryVideoGrid';
import { LibrarySkeleton } from '../../features/library/components/LibrarySkeleton';
import { videosApi } from '../../api/videos';
import { mapListItemToVideo } from '../../lib/videoMappers';
import type { VideoListQuery } from '../../api/types';
import type { Video } from '../../types';
import { colors } from '../../theme/colors';

const LIMIT = 12;

export default function LibraryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [filter, setFilter] = useState<VideoListQuery['filter']>('all');
  const [days, setDays] = useState(0);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const silentNextFetchRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const fetchVideos = useCallback(async (options?: { silent?: boolean }) => {
    const silent = options?.silent ?? silentNextFetchRef.current;
    silentNextFetchRef.current = false;
    if (!silent) setLoading(true);
    try {
      const res = await videosApi.list({
        q: debouncedQ || undefined,
        status: 'completed',
        filter: filter ?? 'all',
        days,
        sort: 'processed_at',
        order: 'desc',
        page,
        limit: LIMIT,
      });
      setVideos(res.items.map(mapListItemToVideo));
      setTotal(res.total);
      setTotalPages(res.total_pages);
    } catch {
      if (!silent) {
        setVideos([]);
        setTotal(0);
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedQ, filter, days, page]);

  useEffect(() => {
    void fetchVideos();
  }, [fetchVideos]);

  const handleVideoDeleted = useCallback(
    (videoId: string) => {
      const remaining = videos.filter((v) => v.id !== videoId);
      setVideos(remaining);
      setTotal((t) => Math.max(0, t - 1));

      if (remaining.length === 0 && page > 1) {
        silentNextFetchRef.current = true;
        setPage((p) => p - 1);
      }
    },
    [videos, page],
  );

  const violationCount = videos.filter((v) => (v.violationCount ?? 0) > 0).length;
  const showSkeleton = loading && videos.length === 0;

  return (
    <AppShell>
      <TopBar
        title="Thư viện video"
        subtitle={`${total} video · ${violationCount} có vi phạm`}
      />

      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>
        <Box className="flex flex-col gap-4 mb-6">
          <Box className="flex flex-col sm:flex-row gap-3">
            <TextField
              placeholder="Tìm theo tên file..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              size="small"
              fullWidth
              sx={{
                maxWidth: { sm: 360 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: colors.surfaceContainerLow,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: colors.onSurfaceVariant, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Chip label={`${videos.length} / ${total}`} size="small" sx={{ alignSelf: 'center' }} />
          </Box>

          <Box className="flex flex-wrap gap-3 items-center">
            <ToggleButtonGroup
              size="small"
              exclusive
              value={filter}
              onChange={(_, v) => {
                if (v) {
                  setFilter(v);
                  setPage(1);
                }
              }}
              sx={{ '& .MuiToggleButton-root': { textTransform: 'none', px: 2 } }}
            >
              <ToggleButton value="all">Tất cả</ToggleButton>
              <ToggleButton value="violated">Có vi phạm</ToggleButton>
              <ToggleButton value="safe">An toàn</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              size="small"
              exclusive
              value={days}
              onChange={(_, v) => {
                if (v != null) {
                  setDays(v);
                  setPage(1);
                }
              }}
              sx={{ '& .MuiToggleButton-root': { textTransform: 'none', px: 2 } }}
            >
              <ToggleButton value={0}>Mọi lúc</ToggleButton>
              <ToggleButton value={7}>7 ngày</ToggleButton>
              <ToggleButton value={30}>30 ngày</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {showSkeleton ? (
          <LibrarySkeleton />
        ) : videos.length > 0 ? (
          <>
            <LibraryVideoGrid
              videos={videos}
              onOpen={(id) => navigate(`/analytics/${id}`)}
              onDeleted={handleVideoDeleted}
            />

            <Box
              className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4"
              sx={{ borderTop: `1px solid ${colors.outlineVariant}33` }}
            >
              <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                Trang {page} / {totalPages}
              </Typography>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, p) => setPage(p)}
                shape="rounded"
                size="small"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: colors.onSurfaceVariant,
                    '&.Mui-selected': {
                      bgcolor: `${colors.primaryContainer}33`,
                      color: colors.primary,
                    },
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography variant="body1" sx={{ color: colors.onSurfaceVariant }}>
              Không tìm thấy video phù hợp. Hãy upload video mới.
            </Typography>
          </Box>
        )}
      </Box>
    </AppShell>
  );
}
