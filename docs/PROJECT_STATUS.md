# Vigilant Lens FE — Trạng thái dự án

Cập nhật: 2026-05-24

## Đã hoàn thành

### Auth (`docs/API_REFERENCE.md` §3)
- Login, register, logout, refresh token
- `GET /users/me` bootstrap session
- Protected / guest routes

### Video API (§5)
- `POST /videos/upload` — Upload page (`UploadSessionPanel`)
- `GET /videos` — Library (search, filter, pagination)
- `GET /videos/:id/status` — Analytics detail + polling khi processing

### WebSocket (§6)
- `PipelineProvider` — `/ws/pipeline`; poll REST chỉ khi WS chưa kết nối (10s)
- Upload sidebar: hàng đợi realtime

### User profile (§4)
- Trang `/profile` — `PATCH /users/me`, `PATCH /users/me/password`

### UI / kiến trúc
- Landing refactor (`src/features/landing/`)
- 3 loại vi phạm: bạo lực, nhạy cảm, ngôn từ toxic
- Multi-video upload preview + thumbnail cover

## Cấu hình

```env
# .env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Backend chạy tại `http://localhost:8080`. WebSocket dùng cùng host (xem `src/lib/wsUrl.ts`).

## Chưa làm / backlog

| Hạng mục | Ghi chú |
|----------|---------|
| Gỡ nội dung / false positive | Nút UI trên Analytics — chưa có API backend |
| `src/data/mockData.ts` | Có thể xóa khi không còn tham chiếu |
| OAuth social login | Đã bỏ khỏi UI |
| E2E / unit tests | Chưa có |
| i18n | Copy tiếng Việt hardcode |

## Chạy local

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Luồng chính

1. Đăng ký / đăng nhập → JWT lưu `localStorage`
2. Upload video → pipeline AI (WS + poll)
3. Thư viện → mở Analytics theo `video_id`
4. Analytics → player (presigned URL), vi phạm, timeline, transcript
