import { apiRequest } from './client';
import type {
  LoginRequest,
  LogoutRequest,
  LogoutResponse,
  RefreshRequest,
  RegisterRequest,
  RegisterResponse,
  TokenPair,
} from './types';

export const authApi = {
  register(body: RegisterRequest) {
    return apiRequest<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
      skipAuth: true,
    });
  },

  login(body: LoginRequest) {
    return apiRequest<TokenPair>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
      skipAuth: true,
    });
  },

  refresh(body: RefreshRequest) {
    return apiRequest<TokenPair>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(body),
      skipAuth: true,
    });
  },

  logout(body: LogoutRequest) {
    return apiRequest<LogoutResponse>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
};
