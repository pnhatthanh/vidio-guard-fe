import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Pagination } from '@mui/material';
import { Search, FilterList, KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import VideoCard from '../../components/common/VideoCard';
import { videoLibrary } from '../../data/mockData';
import { colors } from '../../theme/colors';

const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videoLibrary.filter((video) =>
    video.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell>
      <TopBar
        title="The Digital Curator"
        subtitle="Stewardship of your processed digital assets."
        action={
          <Button
            variant="contained"
            size="small"
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              color: colors.onPrimary,
              fontWeight: 600,
            }}
          >
            Export Logs
          </Button>
        }
      />

      <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
        {/* Filters and Search */}
        <Box className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <TextField
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              width: { xs: '100%', md: 320 },
              backgroundColor: colors.surfaceContainerLow,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
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

          <Box className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              endIcon={<KeyboardArrowDown />}
              sx={{
                borderColor: colors.outlineVariant,
                color: colors.onSurface,
                backgroundColor: colors.surfaceContainerLow,
                textTransform: 'none',
              }}
            >
              Status: All
            </Button>
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowDown />}
              sx={{
                borderColor: colors.outlineVariant,
                color: colors.onSurface,
                backgroundColor: colors.surfaceContainerLow,
                textTransform: 'none',
              }}
            >
              Date: Last 7 Days
            </Button>
          </Box>
        </Box>

        {/* Video Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 3,
            mb: 4,
          }}
        >
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => navigate(`/analytics/${video.id}`)}
            />
          ))}
        </Box>

        {/* Pagination & Meta */}
        {filteredVideos.length > 0 ? (
          <Box className="flex items-center justify-between py-4 border-t" sx={{ borderColor: `${colors.outlineVariant}33` }}>
            <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
              Showing {filteredVideos.length} of 1,244 processed assets
            </Typography>
            <Pagination
              count={24}
              shape="rounded"
              size="small"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: colors.onSurfaceVariant,
                  '&.Mui-selected': {
                    backgroundColor: `${colors.primaryContainer}33`,
                    color: colors.primary,
                  },
                },
              }}
            />
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="body1" sx={{ color: colors.onSurfaceVariant }}>
              No assets found matching your criteria.
            </Typography>
          </Box>
        )}
      </Box>
    </AppShell>
  );
};

export default LibraryPage;
