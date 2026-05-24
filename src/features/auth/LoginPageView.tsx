import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LandingBackground } from '../landing/components/LandingBackground';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { GradientButton } from '../landing/components/marketing/GradientButton';
import { useAuth, getErrorMessage } from './AuthProvider';

export function LoginPageView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '' });

  const registered = (location.state as { registered?: boolean } | null)?.registered;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      const from = (location.state as { from?: string } | null)?.from ?? '/upload';
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page relative min-h-screen bg-background font-body text-on-surface">
      <LandingBackground />

      <main className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 flex flex-col items-center text-center">
            <BrandLogo />
            <h1 className="mt-6 font-headline text-3xl font-bold text-on-surface">Đăng nhập</h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Truy cập bảng điều khiển kiểm duyệt video AI
            </p>
          </div>

          <div className="landing-card rounded-2xl border border-outline-variant/30 p-8">
            {registered && (
              <p className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.
              </p>
            )}

            {error && (
              <p className="mb-4 rounded-xl border border-tertiary-container/40 bg-tertiary-container/15 px-3 py-2 text-sm text-tertiary">
                {error}
              </p>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <AuthField
                id="email"
                label="Email"
                icon="mail"
                type="email"
                placeholder="ban@congty.com"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="ml-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low/80 py-3 pl-10 pr-10 text-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <GradientButton
                type="submit"
                size="lg"
                className="w-full font-headline"
                disabled={loading}
                icon={<span className="material-symbols-outlined text-lg">arrow_forward</span>}
              >
                {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
              </GradientButton>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => navigate('/')}
            >
              Đăng ký
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

type AuthFieldProps = {
  id: string;
  label: string;
  icon: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function AuthField({ id, label, icon, type, placeholder, value, onChange, required }: AuthFieldProps) {
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
          placeholder={placeholder}
          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low/80 py-3 pl-10 pr-4 text-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/25"
        />
      </div>
    </div>
  );
}
