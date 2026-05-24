// TypeScript interfaces for Vigilant Lens AI Platform

export type VideoStatus =
  | 'uploaded'
  | 'processing'
  | 'completed'
  | 'queued'
  | 'archived'
  | 'cleared'
  | 'verified'
  | 'error';

export type ViolationType = 'violence' | 'explicit' | 'toxic';

export type SeverityLevel = 'critical' | 'warning' | 'safe' | 'info';

export interface Violation {
  id: string;
  type: ViolationType;
  description: string;
  confidenceScore: number; // 0-100
  timestamp?: number; // start time (seconds)
  endTimestamp?: number; // end time (seconds)
  severity: SeverityLevel;
}

export interface Video {
  id: string;
  filename: string;
  size: string;
  resolution: string;
  status: VideoStatus;
  processedAt?: string;
  uploadedAt?: string;
  violated?: boolean;
  duration?: number;
  violations: Violation[];
  safetyScore: number;
  thumbnailUrl?: string;
  videoUrl?: string;
  transcript?: string;
  verdictLabel?: string;
  progressPercent?: number;
  stage?: string;
  violationCount?: number;
}

export type PipelineJob = {
  videoId: string;
  filename: string;
  status: string;
  stage: string;
  progress: number;
};

export interface ProcessingJob {
  id: string;
  filename: string;
  size: string;
  resolution: string;
  progress: number; // 0-100
  eta?: string;
  stage: 'uploading' | 'queued' | 'analyzing' | 'finalizing';
}

export interface SystemHealth {
  cpuUsage: number;
  memoryUsage: number;
  uplinkStatus: 'stable' | 'degraded' | 'down';
  uplinkSpeed: string;
  cluster: string;
}

export interface PipelineStats {
  latency: string;
  curationRate: string;
  activeJobs: number;
  queueDepth: number;
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}
