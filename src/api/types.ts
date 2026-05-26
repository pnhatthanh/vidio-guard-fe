export type ApiErrorBody = {
  code: number;
  type: string;
  message: string;
};

export type TokenPair = {
  access_token: string;
  refresh_token: string;
};

export type RegisterRequest = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type RegisterResponse = {
  id: string;
  full_name: string;
  email: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type GoogleLoginRequest = {
  id_token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type MessageResponse = {
  message: string;
};

export type ResetPasswordRequest = {
  email: string;
  otp: string;
  new_password: string;
  confirm_new_password: string;
};

export type RefreshRequest = {
  refresh_token: string;
};

export type LogoutRequest = {
  refresh_token: string;
};

export type LogoutResponse = {
  message: string;
};

export type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  has_password: boolean;
  has_google: boolean;
  created_at: string;
};

export type UpdateProfilePayload = {
  full_name: string;
  avatar?: File;
  remove_avatar?: boolean;
};

export type VideoDownloadResponse = {
  video_id: string;
  download_url: string;
  filename: string;
  expires_in_seconds: number;
};

export type UpdatePasswordRequest = {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
};

export type VideoApiStatus = 'uploaded' | 'processing' | 'completed' | 'failed';
export type VerdictLabel = 'safe' | 'warning' | 'violation' | 'nsfw' | 'violence';
export type SegmentCategory = 'nudity' | 'violence' | 'hate_speech' | 'toxic' | 'nsfw';
export type SegmentSource = 'visual' | 'audio';

export type VideoListQuery = {
  q?: string;
  status?: 'all' | VideoApiStatus;
  filter?: 'all' | 'violated' | 'safe';
  days?: number;
  sort?: 'processed_at' | 'uploaded_at' | 'risk_score' | 'filename';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export type VideoListItem = {
  video_id: string;
  video_url?: string;
  original_filename: string;
  status: VideoApiStatus;
  stage: string;
  progress_percent: number;
  file_size_bytes: number;
  uploaded_at: string;
  processed_at?: string | null;
  verdict?: VerdictLabel;
  violated?: boolean;
  risk_score?: number;
  violation_count?: number;
};

export type VideoListResponse = {
  items: VideoListItem[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type UploadVideoResponse = {
  video_id: string;
  status: VideoApiStatus;
  stage: string;
  progress_percent: number;
};

export type VerdictDetail = {
  verdict: VerdictLabel;
  violated: boolean;
  risk_score: number;
  final_score?: number;
  frame_score?: number;
  audio_score?: number;
  peak_violence_score?: number;
  peak_nsfw_score?: number;
  flagged_frames_count?: number;
  total_frames?: number;
  video_duration_sec?: number;
  hard_rule_triggered?: boolean;
  hard_rule_reason?: string;
  transcript?: string;
};

export type ViolationSegment = {
  source: SegmentSource;
  category: SegmentCategory;
  start_sec: number;
  end_sec: number;
  peak_score: number;
  evidence: string;
};

export type VideoStatusResponse = {
  video_id: string;
  video_url?: string;
  status: VideoApiStatus;
  stage: string;
  progress_percent: number;
  original_filename: string;
  uploaded_at: string;
  processed_at?: string | null;
  verdict?: VerdictDetail;
  violation_segments?: ViolationSegment[];
};

export type VideoProgressEvent = {
  type: 'video.progress';
  user_id: string;
  video_id: string;
  status: VideoApiStatus;
  stage: string;
  progress_percent: number;
};
