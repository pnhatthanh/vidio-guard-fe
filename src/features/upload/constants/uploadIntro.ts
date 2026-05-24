export const UPLOAD_STEPS = [
  {
    step: 1,
    icon: 'cloud_upload',
    title: 'Tải video',
    description: 'Upload file MP4, MOV, AVI hoặc MKV — hệ thống mã hóa và đưa vào hàng đợi.',
  },
  {
    step: 2,
    icon: 'hub',
    title: 'AI phân tích',
    description: 'Pipeline song song quét bạo lực, nội dung nhạy cảm và ngôn từ toxic.',
  },
  {
    step: 3,
    icon: 'assignment',
    title: 'Nhận báo cáo',
    description: 'Xem timeline vi phạm, điểm an toàn và quyết định kiểm duyệt trên dashboard.',
  },
] as const;

export const DETECTION_TYPES = [
  { icon: 'shield', title: 'Bạo lực', color: '#b7c4ff' },
  { icon: 'visibility_off', title: 'Nhạy cảm', color: '#fbbf24' },
  { icon: 'record_voice_over', title: 'Ngôn từ toxic', color: '#b7c8e1' },
] as const;
