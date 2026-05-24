import { API_BASE_URL } from '../api/client';
import { getAccessToken } from './authStorage';

export function getPipelineWebSocketUrl(): string | null {
  const token = getAccessToken();
  if (!token) return null;

  const base = API_BASE_URL.replace(/\/$/, '');
  const wsBase = base.replace(/^http/, 'ws');
  return `${wsBase}/ws/pipeline?token=${encodeURIComponent(token)}`;
}
