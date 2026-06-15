import { ApiError } from './errors';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../lib/authStorage';
import type { ApiErrorBody, TokenPair } from './types';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';

type RequestOptions = RequestInit & {
  /** Internal: skip attach Bearer (refresh endpoint) */
  skipAuth?: boolean;
  /** Internal: prevent infinite refresh loop */
  _retried?: boolean;
};

let refreshInFlight: Promise<boolean> | null = null;

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    clearTokens();
    return false;
  }

  const data = await parseJson<TokenPair>(res);
  setTokens(data.access_token, data.refresh_token);
  return true;
}

function queueRefresh(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = refreshAccessToken().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { skipAuth, _retried, headers: initHeaders, ...rest } = options;

  const headers = new Headers(initHeaders);
  if (!headers.has('Content-Type') && !(rest.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers });

  if (res.status === 401 && !skipAuth && !_retried) {
    const refreshed = await queueRefresh();
    if (refreshed) {
      // Retry the request with the new token
      return apiRequest<T>(path, { ...options, _retried: true });
    }
    // If refresh fails, dispatch session expired event
    clearTokens();
    window.dispatchEvent(new Event('auth:session-expired'));
    // Throw an error to prevent further processing
    throw new ApiError(401, 'session-expired', 'Your session has expired. Please log in again.');
  }

  if (!res.ok) {
    let body: ApiErrorBody;
    try {
      body = await parseJson<ApiErrorBody>(res);
    } catch {
      throw new ApiError(res.status, 'unknown', res.statusText || 'Request failed');
    }
    throw ApiError.fromBody(res.status, body);
  }

  if (res.status === 204) {
    return {} as T;
  }
  return parseJson<T>(res);
}

/** Gọi refresh thủ công (bootstrap session) */
export async function tryRefreshSession(): Promise<boolean> {
  return queueRefresh();
}
