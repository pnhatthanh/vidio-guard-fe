import { Box, Typography } from '@mui/material';
import { DETECTION_TYPES, UPLOAD_STEPS } from '../constants/uploadIntro';
import { colors } from '../../../theme/colors';

export function UploadIntroSection() {
  return (
    <Box className="flex flex-col gap-5">
      {/* Giới thiệu ngắn */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2.5,
          border: `1px solid ${colors.outlineVariant}22`,
          background: `linear-gradient(135deg, ${colors.surfaceContainerLow} 0%, ${colors.primaryContainer}12 100%)`,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: colors.primary, fontWeight: 700, letterSpacing: 1.2 }}
        >
          Hệ thống kiểm duyệt AI
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mt: 0.5, mb: 1 }}
        >
          Phân tích video tự động, không làm chậm nền tảng
        </Typography>
        <Typography variant="body2" sx={{ color: colors.onSurfaceVariant, lineHeight: 1.7, maxWidth: 640 }}>
          Sau khi upload, video được xử lý <strong style={{ color: colors.onSurface }}>bất đồng bộ</strong> —
          bạn có thể tiếp tục làm việc trong khi AI quét từng khung hình, âm thanh và văn bản trên
          màn hình. Kết quả hiển thị trong Thư viện với điểm an toàn và danh sách vi phạm chi tiết.
        </Typography>

        <Box className="flex flex-wrap gap-4 mt-4">
          {[
            { value: '>95%', label: 'Độ chính xác' },
            { value: '3 loại', label: 'Phát hiện AI' },
            { value: '< 2 phút', label: 'TB / video 1080p' },
          ].map((stat) => (
            <Box key={stat.label}>
              <Typography
                variant="h6"
                sx={{ fontFamily: 'Manrope', fontWeight: 800, color: colors.primary, lineHeight: 1.2 }}
              >
                {stat.value}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.onSurfaceVariant }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Loại phát hiện */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 2 }}
        >
          AI phát hiện những gì?
        </Typography>
        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DETECTION_TYPES.map((item) => (
            <Box
              key={item.title}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}22`,
                textAlign: 'center',
                transition: 'border-color 0.2s, transform 0.2s',
                '&:hover': {
                  borderColor: `${item.color}55`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  mx: 'auto',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${item.color}18`,
                }}
              >
                <span className="material-symbols-outlined" style={{ color: item.color, fontSize: 22 }}>
                  {item.icon}
                </span>
              </Box>
              <Typography variant="caption" sx={{ color: colors.onSurface, fontWeight: 600 }}>
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Quy trình 3 bước */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface, mb: 2 }}
        >
          Quy trình xử lý
        </Typography>
        <Box className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {UPLOAD_STEPS.map((step) => (
            <Box
              key={step.step}
              sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}22`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontFamily: 'Manrope',
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  color: `${colors.primary}12`,
                  lineHeight: 1,
                }}
              >
                {step.step}
              </Box>
              <Box className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>
                  {step.icon}
                </span>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface }}
                >
                  {step.title}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Gợi ý */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: `${colors.primaryContainer}10`,
          border: `1px solid ${colors.primaryContainer}25`,
        }}
      >
        <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: 22 }}>
          lightbulb
        </span>
        <Typography variant="caption" sx={{ color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
          <strong style={{ color: colors.primary }}>Mẹo:</strong> Video dài hơn 10 phút nên upload ở
          độ phân giải 1080p để cân bằng tốc độ xử lý và độ chính xác. Sau khi hoàn tất, mở{' '}
          <strong style={{ color: colors.onSurface }}>Thư viện</strong> để xem báo cáo chi tiết theo
          timeline.
        </Typography>
      </Box>
    </Box>
  );
}
