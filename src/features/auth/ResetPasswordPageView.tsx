import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LandingBackground } from '../landing/components/LandingBackground';
import { LandingFooter } from '../landing/components/LandingFooter';
import { GradientButton } from '../landing/components/marketing/GradientButton';
import { AuthPageHeader } from './components/AuthPageHeader';
import { authApi } from '../../api/auth';
import { getErrorMessage } from './AuthProvider';

export function ResetPasswordPageView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const qEmail = searchParams.get('email') ?? '';
    const qOtp = searchParams.get('otp') ?? '';
    if (qEmail) setEmail(qEmail);
    if (qOtp) setOtp(qOtp.replace(/\D/g, '').slice(0, 6));
  }, [searchParams]);

  const handleOtpChange = (value: string) => {
    setOtp(value.replace(/\D/g, '').slice(0, 6));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (otp.length !== 6) {
      setError('Mã OTP phải gồm 6 chữ số');
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({
        email: email.trim(),
        otp,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      navigate('/login', { replace: true, state: { passwordReset: true } });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page relative flex min-h-screen flex-col bg-background font-body text-on-surface">
      <LandingBackground />
      <AuthPageHeader />

      <main className="relative flex flex-1 items-center justify-center px-6 py-10 sm:py-14">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="font-headline text-3xl font-bold text-on-surface sm:text-4xl">Đặt lại mật khẩu</h1>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-on-surface-variant">
              Nhập mã OTP từ email và mật khẩu mới (tối thiểu 8 ký tự).
            </p>
          </div>

          <div className="landing-card rounded-2xl border border-outline-variant/30 p-8">
            {error && (
              <p className="mb-4 rounded-xl border border-tertiary-container/40 bg-tertiary-container/15 px-3 py-2 text-sm text-tertiary">
                {error}
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <AuthInput
                id="email"
                label="Email"
                icon="mail"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="otp"
                  className="ml-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
                >
                  Mã OTP (6 số)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                    pin
                  </span>
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => handleOtpChange(e.target.value)}
                    placeholder="000000"
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low/80 py-3 pl-10 pr-4 text-center text-lg tracking-[0.35em] text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                  />
                </div>
              </div>

              <PasswordField
                id="new_password"
                label="Mật khẩu mới"
                value={newPassword}
                onChange={setNewPassword}
                show={showPassword}
                onToggleShow={() => setShowPassword((v) => !v)}
                minLength={8}
              />

              <PasswordField
                id="confirm_password"
                label="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showPassword}
                onToggleShow={() => setShowPassword((v) => !v)}
                minLength={8}
              />

              <GradientButton
                type="submit"
                size="lg"
                className="mt-2 w-full font-headline"
                disabled={loading}
              >
                {loading ? 'Đang lưu…' : 'Đặt lại mật khẩu'}
              </GradientButton>
            </form>
          </div>

          <p className="mt-6 space-y-2 text-center text-sm text-on-surface-variant">
            <span className="block">
              Chưa có mã?{' '}
              <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
                Gửi lại OTP
              </Link>
            </span>
            <Link to="/login" className="block font-semibold text-primary hover:underline">
              ← Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

type AuthInputProps = {
  id: string;
  label: string;
  icon: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function AuthInput({ id, label, icon, type, value, onChange, required }: AuthInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="ml-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        {label}
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low/80 py-3 pl-10 pr-4 text-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/25"
        />
      </div>
    </div>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
  minLength?: number;
};

function PasswordField({ id, label, value, onChange, show, onToggleShow, minLength }: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="ml-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        {label}
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
          lock
        </span>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          required
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low/80 py-3 pl-10 pr-10 text-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/25"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
          onClick={onToggleShow}
          aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        >
          <span className="material-symbols-outlined text-lg">{show ? 'visibility_off' : 'visibility'}</span>
        </button>
      </div>
    </div>
  );
}
