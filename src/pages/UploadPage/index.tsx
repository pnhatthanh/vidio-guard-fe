import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Button,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  CloudUpload,
  CheckCircle,
  SportsKabaddi,
  NoAdultContent,
  RecordVoiceOver,
  MemoryOutlined,
  Wifi,
  Speed,
  QueryStats,
  InsertDriveFile,
  Close,
} from '@mui/icons-material';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import { colors } from '../../theme/colors';
import {
  processingQueue,
  recentlyProcessed,
  systemHealth,
  pipelineStats,
} from '../../data/mockData';

// ── Drop Zone ─────────────────────────────────────────────────────────────────

interface DropZoneProps {
  onFiles: (files: File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFiles }) => {
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback(
    (accepted: File[]) => {
      setDragOver(false);
      onFiles(accepted);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] },
    maxSize: 2 * 1024 * 1024 * 1024,
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: `2px dashed ${dragOver || isDragActive ? colors.primary : colors.outlineVariant}`,
        borderRadius: 3,
        p: 5,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor:
          dragOver || isDragActive
            ? `${colors.primaryContainer}0f`
            : colors.surfaceContainerLow,
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: colors.primary,
          backgroundColor: `${colors.primaryContainer}0a`,
        },
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.primary}22 0%, ${colors.primaryContainer}22 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
          transition: 'transform 0.2s',
          ...(dragOver && { transform: 'scale(1.1)' }),
        }}
      >
        <CloudUpload
          sx={{
            fontSize: 32,
            color: isDragActive ? colors.primary : colors.onSurfaceVariant,
            transition: 'color 0.2s',
          }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 0.75 }}
      >
        {isDragActive ? 'Drop to upload' : 'Drop your video files here'}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, mb: 2 }}>
        Support for MP4, MOV, and AVI up to 2GB per file.
        <br />
        Processing starts instantly after upload.
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderColor: colors.outline,
          color: colors.onSurface,
          '&:hover': { borderColor: colors.primary, backgroundColor: colors.surfaceContainerHigh },
        }}
      >
        Browse Files
      </Button>
    </Box>
  );
};

// ── Active Queue Card ─────────────────────────────────────────────────────────

const stageColor: Record<string, string> = {
  uploading: colors.secondary,
  queued: colors.onSurfaceVariant,
  analyzing: colors.primary,
  finalizing: '#4caf7d',
};

const stageLabel: Record<string, string> = {
  uploading: 'Uploading',
  queued: 'Queued',
  analyzing: 'Analyzing',
  finalizing: 'Finalizing',
};

interface ActiveQueueCardProps {
  job: (typeof processingQueue)[number];
}

const ActiveQueueCard: React.FC<ActiveQueueCardProps> = ({ job }) => {
  const color = stageColor[job.stage];
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: colors.surfaceContainerHigh,
        border: `1px solid ${colors.outlineVariant}22`,
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: `${colors.primary}33` },
      }}
    >
      <Box className="flex items-start justify-between gap-2 mb-1.5">
        <Box className="flex items-center gap-2 min-w-0">
          <InsertDriveFile sx={{ fontSize: 16, color: colors.onSurfaceVariant, flexShrink: 0 }} />
          <Typography
            variant="body2"
            sx={{
              color: colors.onSurface,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {job.filename}
          </Typography>
        </Box>
        <Box className="flex items-center gap-1.5 flex-shrink-0">
          <Chip
            label={stageLabel[job.stage]}
            size="small"
            sx={{
              height: 18,
              fontSize: '0.625rem',
              fontWeight: 600,
              color,
              backgroundColor: `${color}18`,
              '& .MuiChip-label': { px: 1 },
            }}
          />
          <IconButton size="small" sx={{ color: colors.onSurfaceVariant, p: 0.25 }}>
            <Close sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </Box>

      <Box className="flex items-center gap-2 mb-1">
        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
          {job.size} • {job.resolution}
        </Typography>
        {job.eta && (
          <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, ml: 'auto' }}>
            ETA {job.eta}
          </Typography>
        )}
      </Box>

      <Box className="flex items-center gap-2">
        <LinearProgress
          variant="determinate"
          value={job.progress}
          sx={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: colors.surfaceVariant,
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${color}88 0%, ${color} 100%)`,
              borderRadius: 2,
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{ color, fontWeight: 700, fontFamily: 'Manrope', minWidth: 36, textAlign: 'right' }}
        >
          {job.progress}%
        </Typography>
      </Box>
    </Box>
  );
};


// ── Upload Page ───────────────────────────────────────────────────────────────

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFiles = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  return (
    <AppShell>
      <TopBar
        title="Upload Center"
        subtitle="Asynchronous processing with Luminous Authority AI."
      />

      <Box sx={{ p: 3 }}>
        <Box className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* ── Main upload column ── */}
          <Box className="xl:col-span-2 flex flex-col gap-5">
            <DropZone onFiles={handleFiles} />

            {/* Uploaded files this session */}
            {uploadedFiles.length > 0 && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: colors.surfaceContainerLow,
                  border: `1px solid ${colors.outlineVariant}22`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 1.5 }}
                >
                  This session ({uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''})
                </Typography>
                <Box className="flex flex-col gap-1.5">
                  {uploadedFiles.map((f, i) => (
                    <Box
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg"
                      sx={{ backgroundColor: colors.surfaceContainerHigh }}
                    >
                      <InsertDriveFile sx={{ fontSize: 16, color: colors.primary }} />
                      <Typography variant="body2" sx={{ color: colors.onSurface, flex: 1 }}>
                        {f.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                        {(f.size / 1024 / 1024).toFixed(1)} MB
                      </Typography>
                      <CheckCircle sx={{ fontSize: 14, color: '#4caf7d' }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Moderation Focus */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}22`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: 'Manrope',
                  fontWeight: 700,
                  color: colors.onSurface,
                  mb: 2,
                }}
              >
                Moderation Focus
              </Typography>
              <Box className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: <SportsKabaddi />, label: 'Violence Detection', desc: 'Detect harmful or physical altercations.' },
                  { icon: <NoAdultContent />, label: 'Explicit Content', desc: 'Identify NSFW or explicit material.' },
                  { icon: <RecordVoiceOver />, label: 'Audio Analysis', desc: 'Audio and visual transcript analysis.' },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: colors.surfaceContainerHigh,
                      border: `1px solid ${colors.outlineVariant}22`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        backgroundColor: `${colors.primaryContainer}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.primary,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'Manrope', fontWeight: 600, color: colors.onSurface }}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                      {item.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ── Right column ── */}
          <Box className="flex flex-col gap-4">
            {/* Active Pipeline */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}22`,
              }}
            >
              <Box className="flex items-center justify-between mb-3">
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface }}
                >
                  Active Pipeline
                </Typography>
                <Box className="flex items-center gap-1.5">
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: colors.primary,
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: colors.primary, fontWeight: 600 }}>
                    {pipelineStats.activeJobs} processing
                  </Typography>
                </Box>
              </Box>

              <Box className="flex flex-col gap-2.5">
                {processingQueue.map((job) => (
                  <ActiveQueueCard key={job.id} job={job} />
                ))}
              </Box>
            </Box>

            {/* System Health */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}22`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 2 }}
              >
                System Health
              </Typography>

              <Box className="flex flex-col gap-2">
                {[
                  { icon: <MemoryOutlined sx={{ fontSize: 16 }} />, label: 'CPU', value: systemHealth.cpuUsage },
                  { icon: <MemoryOutlined sx={{ fontSize: 16 }} />, label: 'Memory', value: systemHealth.memoryUsage },
                ].map((item) => (
                  <Box key={item.label}>
                    <Box className="flex justify-between mb-1">
                      <Box className="flex items-center gap-1">
                        <Box sx={{ color: colors.onSurfaceVariant }}>{item.icon}</Box>
                        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                          {item.label}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: colors.primary, fontWeight: 600 }}
                      >
                        {item.value}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{ height: 3, borderRadius: 2 }}
                    />
                  </Box>
                ))}

                <Divider sx={{ my: 0.5 }} />

                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-1">
                    <Wifi sx={{ fontSize: 14, color: '#4caf7d' }} />
                    <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                      {systemHealth.cluster}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#4caf7d', fontWeight: 600 }}>
                    Fiber {systemHealth.uplinkSpeed}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Manrope',
                  fontWeight: 700,
                  color: colors.onSurface,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 1.5,
                }}
              >
                AI Pipeline Stats
              </Typography>
              <Box className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Speed sx={{ fontSize: 18 }} />, label: 'Latency', value: pipelineStats.latency },
                  { icon: <QueryStats sx={{ fontSize: 18 }} />, label: 'Curation Rate', value: pipelineStats.curationRate },
                ].map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{
                      p: 1.5,
                      borderRadius: 1.5,
                      backgroundColor: colors.surfaceContainerHigh,
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ color: colors.primary, mb: 0.5 }}>{stat.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'Manrope',
                        fontWeight: 800,
                        color: colors.onSurface,
                        lineHeight: 1.2,
                        fontSize: '1.1rem',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Recently Processed */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}22`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 2 }}
              >
                Recently Processed
              </Typography>
              <Box className="flex flex-col gap-0.5">
                {recentlyProcessed.map((video) => (
                  <Box
                    key={video.id}
                    className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer group"
                    sx={{
                      transition: 'background-color 0.15s',
                      '&:hover': { backgroundColor: colors.surfaceContainerHigh },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        backgroundColor:
                          video.violations.length > 0
                            ? `${colors.errorContainer}44`
                            : `${colors.primary}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {video.violations.length > 0 ? (
                        <CircularProgress
                          size={14}
                          sx={{ color: colors.tertiary }}
                          variant="determinate"
                          value={video.safetyScore}
                        />
                      ) : (
                        <CheckCircle sx={{ fontSize: 16, color: '#4caf7d' }} />
                      )}
                    </Box>
                    <Box className="flex-1 min-w-0">
                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.onSurface,
                          fontWeight: 500,
                          display: 'block',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {video.filename}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                        Processed {video.processedAt}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: video.safetyScore >= 80 ? '#4caf7d' : colors.tertiary,
                        fontWeight: 700,
                        fontFamily: 'Manrope',
                        flexShrink: 0,
                      }}
                    >
                      {video.safetyScore}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
};

export default UploadPage;
