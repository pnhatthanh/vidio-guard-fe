import { apiRequest } from './client';
import type { UpdatePasswordRequest, UpdateProfileRequest, UserProfile } from './types';

export const usersApi = {
  getMe() {
    return apiRequest<UserProfile>('/users/me');
  },

  updateMe(body: UpdateProfileRequest) {
    return apiRequest<UserProfile>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  updatePassword(body: UpdatePasswordRequest) {
    return apiRequest<{ message: string }>('/users/me/password', {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
};
