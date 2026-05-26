import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GradientButton } from './marketing/GradientButton';
import { AuthDivider } from '../../auth/components/AuthDivider';
import { GoogleSignInButton } from '../../auth/components/GoogleSignInButton';
import { useAuth, getErrorMessage } from '../../auth/AuthProvider';

export function SignupCard() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const authBusy = loading || googleLoading;

  const handleGoogleSuccess = async (idToken: string) => {
    setError(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle(idToken);
      navigate('/upload', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    if (form.password !== form.confirm_password) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await register({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
        confirm_password: form.confirm_password,
      });
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="signup"
      className="landing-card relative overflow-hidden rounded-2xl border border-outline-variant/30 p-8 md:p-10"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary-container/20 blur-3xl" />

      <div className="relative space-y-6">
        <div>
          <h2 className="font-headline text-2xl font-bold text-on-surface">Tạo tài khoản</h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Bắt đầu kiểm duyệt video bằng AI trong vài phút.
          </p>
        </div>

        {error && (
          <p className="rounded-xl border border-tertiary-container/40 bg-tertiary-container/15 px-3 py-2 text-sm text-tertiary">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            type="text"
            value={form.full_name}
            onChange={(v) => setForm({ ...form, full_name: v })}
            required
            minLength={2}
          />
          <FormField
            label="Email"
            placeholder="ban@congty.com"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
          />
          <FormField
            label="Mật khẩu"
            placeholder="Tối thiểu 8 ký tự"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            required
            minLength={8}
          />
          <FormField
            label="Xác nhận mật khẩu"
            placeholder="••••••••"
            type="password"
            value={form.confirm_password}
            onChange={(v) => setForm({ ...form, confirm_password: v })}
            required
            minLength={8}
          />

          <label className="flex cursor-pointer items-start gap-3 py-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-outline-variant text-primary-container focus:ring-primary-container"
            />
            <span className="text-xs leading-relaxed text-on-surface-variant">
              Tôi đồng ý với{' '}
              <a href="#" className="text-primary hover:underline">
                Điều khoản
              </a>{' '}
              và{' '}
              <a href="#" className="text-primary hover:underline">
                Chính sách bảo mật
              </a>
              .
            </span>
          </label>

          <GradientButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-headline"
            disabled={!agreed || authBusy}
            icon={<span className="material-symbols-outlined text-lg">arrow_forward</span>}
          >
            {loading ? 'Đang đăng ký…' : 'Đăng ký'}
          </GradientButton>

          <AuthDivider label="hoặc" />

          <GoogleSignInButton
            label="Đăng ký bằng Google"
            disabled={authBusy}
            onSuccess={(token) => void handleGoogleSuccess(token)}
            onError={() => setError('Đăng ký Google thất bại. Vui lòng thử lại.')}
          />
        </form>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
};

function FormField({ label, placeholder, type, value, onChange, required, minLength }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low/80 px-4 py-3 text-sm text-on-surface placeholder:text-outline/60 transition-all focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/25"
      />
    </div>
  );
}
