// TypeScript interfaces for Vigilant Lens AI Platform

export type VideoStatus =
  | 'processing'
  | 'completed'
  | 'queued'
  | 'archived'
  | 'cleared'
  | 'verified'
  | 'error';

export type ViolationType =
  | 'violence'
  | 'explicit'
  | 'hate_speech'
  | 'deepfake'
  | 'prohibited_symbolism'
  | 'audio';

export type SeverityLevel = 'critical' | 'warning' | 'safe' | 'info';

export interface Violation {
  id: string;
  type: ViolationType;
  description: string;
  confidenceScore: number; // 0-100
  timestamp?: number; // seconds into video
  severity: SeverityLevel;
}

export interface Video {
  id: string;
  filename: string;
  size: string;
  resolution: string;
  status: VideoStatus;
  processedAt?: string;
  duration?: number; // seconds
  violations: Violation[];
  safetyScore: number; // 0-100 (higher = safer)
  thumbnailUrl?: string;
}

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
