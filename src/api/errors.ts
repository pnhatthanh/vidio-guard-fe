import type { ApiErrorBody } from './types';

export class ApiError extends Error {
  readonly status: number;
  readonly type: string;

  constructor(status: number, type: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.type = type;
  }

  static fromBody(status: number, body: ApiErrorBody): ApiError {
    return new ApiError(status, body.type, body.message);
  }
}

const MESSAGE_VI: Record<string, string> = {
  'invalid credentials': 'Email hoặc mật khẩu không đúng',
  'email already registered': 'Email đã được đăng ký',
  'missing bearer token': 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại',
  'invalid token': 'Phiên đăng nhập không hợp lệ',
  'token revoked': 'Phiên đăng nhập đã bị thu hồi',
  'invalid refresh token': 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại',
  'refresh token expired': 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại',
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return MESSAGE_VI[error.message] ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return 'Đã xảy ra lỗi, vui lòng thử lại';
}
