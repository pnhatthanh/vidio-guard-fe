import { apiRequest } from './client';
import type { UploadVideoResponse, VideoListQuery, VideoListResponse, VideoStatusResponse } from './types';

function buildQuery(params: VideoListQuery): string {
  const q = new URLSearchParams();
  if (params.q) q.set('q', params.q);
  if (params.status) q.set('status', params.status);
  if (params.filter) q.set('filter', params.filter);
  if (params.days != null) q.set('days', String(params.days));
  if (params.sort) q.set('sort', params.sort);
  if (params.order) q.set('order', params.order);
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  const s = q.toString();
  return s ? `?${s}` : '';
}

export const videosApi = {
  list(params: VideoListQuery = {}) {
    return apiRequest<VideoListResponse>(`/videos${buildQuery(params)}`);
  },

  upload(file: File) {
    const form = new FormData();
    form.append('file', file);
    return apiRequest<UploadVideoResponse>('/videos/upload', {
      method: 'POST',
      body: form,
    });
  },

  getStatus(videoId: string) {
    return apiRequest<VideoStatusResponse>(`/videos/${videoId}/status`);
  },
};
