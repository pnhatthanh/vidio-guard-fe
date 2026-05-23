import type { Video, ProcessingJob, SystemHealth, PipelineStats, User } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Sterling',
  role: 'Head Curator',
  initials: 'AS',
};

export const processingQueue: ProcessingJob[] = [
  {
    id: 'j1',
    filename: 'Neon_City_Cinematic_v4.mp4',
    size: '428.5 MB',
    resolution: '4K UHD',
    progress: 68,
    eta: '~2m 14s',
    stage: 'analyzing',
  },
  {
    id: 'j2',
    filename: 'Crowd_Safety_Test_09.mov',
    size: '1.2 GB',
    resolution: '1080p',
    progress: 32,
    eta: '~7m 50s',
    stage: 'analyzing',
  },
  {
    id: 'j3',
    filename: 'System_Log_Export.mp4',
    size: '12.4 MB',
    resolution: '720p',
    progress: 89,
    eta: '~0m 45s',
    stage: 'finalizing',
  },
];

export const recentlyProcessed: Video[] = [
  {
    id: 'v-rp1',
    filename: 'Crypto_Update_H1.mp4',
    size: '215 MB',
    resolution: '1080p',
    status: 'completed',
    processedAt: '2m ago',
    violations: [],
    safetyScore: 97,
  },
  {
    id: 'v-rp2',
    filename: 'Nature_Doc_Final.mp4',
    size: '890 MB',
    resolution: '4K',
    status: 'completed',
    processedAt: '14m ago',
    violations: [],
    safetyScore: 99,
  },
  {
    id: 'v-rp3',
    filename: 'Security_Cam_A4.mp4',
    size: '45 MB',
    resolution: '720p',
    status: 'completed',
    processedAt: '45m ago',
    violations: [
      {
        id: 'vi1',
        type: 'violence',
        description: 'Minor physical altercation',
        confidenceScore: 61,
        severity: 'warning',
      },
    ],
    safetyScore: 72,
  },
  {
    id: 'v-rp4',
    filename: 'Retro_Tech_Review.mp4',
    size: '320 MB',
    resolution: '1080p',
    status: 'completed',
    processedAt: '1h ago',
    violations: [],
    safetyScore: 98,
  },
];

export const videoLibrary: Video[] = [
  {
    id: 'lib1',
    filename: 'Security_Cam_04_Sector7.mp4',
    size: '180 MB',
    resolution: '1080p',
    status: 'completed',
    processedAt: 'Oct 24, 14:02',
    violations: [
      {
        id: 'vi-lb1',
        type: 'violence',
        description: 'Physical altercation detected in center frame.',
        confidenceScore: 94,
        timestamp: 182,
        severity: 'critical',
      },
    ],
    safetyScore: 42,
  },
  {
    id: 'lib2',
    filename: 'Lobby_Main_Floor_B.mp4',
    size: '256 MB',
    resolution: '1080p',
    status: 'archived',
    processedAt: 'Oct 24, 13:45',
    violations: [],
    safetyScore: 95,
  },
  {
    id: 'lib3',
    filename: 'Cafeteria_Incident_09.mov',
    size: '512 MB',
    resolution: '4K',
    status: 'completed',
    processedAt: 'Oct 24, 12:10',
    violations: [
      {
        id: 'vi-lb3',
        type: 'explicit',
        description: 'Explicit content detected',
        confidenceScore: 77,
        severity: 'warning',
      },
    ],
    safetyScore: 58,
  },
  {
    id: 'lib4',
    filename: 'Executive_Suite_North.mp4',
    size: '98 MB',
    resolution: '720p',
    status: 'verified',
    processedAt: 'Oct 24, 09:30',
    violations: [],
    safetyScore: 99,
  },
  {
    id: 'lib5',
    filename: 'Server_Hall_C_Entrance.mp4',
    size: '430 MB',
    resolution: '1080p',
    status: 'completed',
    processedAt: 'Oct 23, 23:55',
    violations: [],
    safetyScore: 88,
  },
  {
    id: 'lib6',
    filename: 'Lecture_Hall_3_Am.mp4',
    size: '1.1 GB',
    resolution: '4K',
    status: 'cleared',
    processedAt: 'Oct 23, 10:15',
    violations: [],
    safetyScore: 93,
  },
];

export const analyticsVideo: Video = {
  id: 'analytics-main',
  filename: 'INCIDENT_REPORT_042.mp4',
  size: '620 MB',
  resolution: '1080p',
  status: 'completed',
  processedAt: 'Oct 24, 2023 • 14:22:05',
  duration: 540,
  violations: [
    {
      id: 'av1',
      type: 'violence',
      description: 'Physical altercation detected in center frame.',
      confidenceScore: 94.2,
      timestamp: 182,
      severity: 'critical',
    },
    {
      id: 'av2',
      type: 'audio',
      description: 'Aggressive verbal exchange identified in audio track.',
      confidenceScore: 78.5,
      timestamp: 175,
      severity: 'warning',
    },
    {
      id: 'av3',
      type: 'explicit',
      description: 'Unsafe visual imagery detected (sharp objects).',
      confidenceScore: 89.1,
      timestamp: 198,
      severity: 'critical',
    },
  ],
  safetyScore: 18,
};

export const analysisDetailVideo: Video = {
  id: 'analysis-detail',
  filename: 'Video_7729_Global.mp4',
  size: '890 MB',
  resolution: '4K',
  status: 'completed',
  processedAt: 'Oct 24, 2023 • 16:05:11',
  duration: 720,
  violations: [
    {
      id: 'ad1',
      type: 'violence',
      description: 'Visual match with high-confidence action pattern.',
      confidenceScore: 91,
      timestamp: 240,
      severity: 'critical',
    },
    {
      id: 'ad2',
      type: 'prohibited_symbolism',
      description: 'Static object detection flagged as sensitive material.',
      confidenceScore: 84,
      timestamp: 360,
      severity: 'critical',
    },
  ],
  safetyScore: 22,
};

export const systemHealth: SystemHealth = {
  cpuUsage: 72,
  memoryUsage: 55,
  uplinkStatus: 'stable',
  uplinkSpeed: '1.2 Gbps',
  cluster: 'Cluster A-4',
};

export const pipelineStats: PipelineStats = {
  latency: '142ms',
  curationRate: '2.4 v/m',
  activeJobs: 3,
  queueDepth: 4,
};

// Analytics chart data — timeline events mapped to seconds
export const timelineChartData = Array.from({ length: 54 }, (_, i) => ({
  second: i * 10,
  confidence: Math.random() * 30 + 10,
  violation:
    i === 17 ? 94 : i === 18 ? 89 : i === 19 ? 78 : Math.random() * 15,
}));
