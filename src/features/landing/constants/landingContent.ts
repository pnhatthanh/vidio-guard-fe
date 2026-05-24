import { BRAND_NAME, BRAND_TAGLINE } from '../../../constants/brand';
import type {
  FeatureItem,
  FooterColumn,
  HeroStat,
  NavLink,
  TrustBadge,
  ValueProp,
  WorkflowStep,
} from '../types/landing.types';

export { BRAND_NAME, BRAND_TAGLINE };

export const NAV_LINKS: NavLink[] = [
  { id: 'features', label: 'Tính năng' },
  { id: 'how-it-works', label: 'Quy trình' },
  { id: 'security', label: 'Bảo mật' },
  { id: 'pricing', label: 'Giá trị' },
];

export const HERO_STATS: HeroStat[] = [
  { value: '99.8%', label: 'Độ chính xác' },
  { value: '<1s', label: 'Phản hồi AI' },
  { value: '3', label: 'Loại phát hiện' },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: 'shield',
    title: 'Phát hiện bạo lực',
    description:
      'Nhận diện đánh nhau, vũ khí và hành vi nguy hiểm theo thời gian thực trên từng khung hình video.',
    accent: 'primary',
  },
  {
    icon: 'visibility_off',
    title: 'Nội dung nhạy cảm',
    description:
      'Phân tích hình ảnh và âm thanh để phát hiện nội dung người lớn, khỏa thân hoặc gợi cảm trong mọi điều kiện ánh sáng.',
    accent: 'warning',
  },
  {
    icon: 'record_voice_over',
    title: 'Ngôn từ toxic',
    description:
      'Phân tích lời thoại và phụ đề để phát hiện ngôn từ xúc phạm, quấy rối và nội dung độc hại trong video.',
    accent: 'secondary',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    icon: 'cloud_upload',
    title: 'Tải video an toàn',
    description:
      'Upload mã hóa end-to-end, tự động tối ưu codec và đưa vào hàng đợi xử lý bất đồng bộ.',
  },
  {
    step: 2,
    icon: 'hub',
    title: 'Pipeline AI song song',
    description:
      'Nhiều mô hình chuyên biệt chạy song song: vision, audio, OCR và phân loại vi phạm theo chính sách.',
  },
  {
    step: 3,
    icon: 'analytics',
    title: 'Báo cáo chi tiết',
    description:
      'Timeline vi phạm, điểm tin cậy và webhook — sẵn sàng cho đội kiểm duyệt và dashboard phân tích.',
  },
];

export const TRUST_BADGES: TrustBadge[] = [
  { icon: 'verified_user', label: 'SOC 2', description: 'Type II Certified' },
  { icon: 'lock', label: 'AES-256', description: 'Mã hóa dữ liệu' },
  { icon: 'policy', label: 'ISO 27001', description: 'Tuân thủ chuẩn' },
  { icon: 'privacy_tip', label: 'GDPR', description: 'Quyền riêng tư' },
];

export const VALUE_PROPS: ValueProp[] = [
  {
    icon: 'speed',
    title: 'Xử lý bất đồng bộ',
    description:
      'Người dùng upload liền mạch trong khi AI phân tích nền — không chặn trải nghiệm nền tảng.',
  },
  {
    icon: 'tune',
    title: 'Chính sách tùy chỉnh',
    description:
      'Điều chỉnh ngưỡng phát hiện và danh mục vi phạm theo guideline cộng đồng của bạn.',
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Tính năng', href: '#features' },
      { label: 'Bảo mật', href: '#security' },
      { label: 'API Docs', href: '#' },
    ],
  },
  {
    title: 'Công ty',
    links: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Trạng thái hệ thống', href: '#' },
      { label: 'Tuyển dụng', href: '#' },
    ],
  },
  {
    title: 'Pháp lý',
    links: [
      { label: 'Chính sách bảo mật', href: '#' },
      { label: 'Điều khoản dịch vụ', href: '#' },
    ],
  },
];
