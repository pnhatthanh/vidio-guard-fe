import { apiRequest } from './client';
import type { UpdatePasswordRequest, UpdateProfilePayload, UserProfile } from './types';

export const usersApi = {
  getMe() {
    return apiRequest<UserProfile>('/users/me');
  },

  updateMe(payload: UpdateProfilePayload) {
    const form = new FormData();
    form.append('full_name', payload.full_name.trim());
    if (payload.avatar) form.append('avatar', payload.avatar);
    if (payload.remove_avatar) form.append('remove_avatar', 'true');
    return apiRequest<UserProfile>('/users/me', {
      method: 'PATCH',
      body: form,
    });
  },

  updatePassword(body: UpdatePasswordRequest) {
    return apiRequest<{ message: string }>('/users/me/password', {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
};
