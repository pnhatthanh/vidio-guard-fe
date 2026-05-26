import { apiRequest } from './client';
import type {
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  LogoutRequest,
  LogoutResponse,
  MessageResponse,
  RefreshRequest,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
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

  loginGoogle(body: GoogleLoginRequest) {
    return apiRequest<TokenPair>('/auth/google', {
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

  forgotPassword(body: ForgotPasswordRequest) {
    return apiRequest<MessageResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(body),
      skipAuth: true,
    });
  },

  resetPassword(body: ResetPasswordRequest) {
    return apiRequest<MessageResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(body),
      skipAuth: true,
    });
  },
};
