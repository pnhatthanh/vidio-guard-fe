import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LandingBackground } from '../landing/components/LandingBackground';
import { LandingFooter } from '../landing/components/LandingFooter';
import { GradientButton } from '../landing/components/marketing/GradientButton';
import { AuthPageHeader } from './components/AuthPageHeader';
import { authApi } from '../../api/auth';
import { getErrorMessage } from './AuthProvider';

export function ForgotPasswordPageView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const trimmedEmail = email.trim();

  const sendOtp = async () => {
    if (!trimmedEmail) return;
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword({ email: trimmedEmail });
      setSent(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendOtp();
  };
  const resetHref = trimmedEmail
    ? `/reset-password?email=${encodeURIComponent(trimmedEmail)}`
    : '/reset-password';

  return (
    <div className="landing-page relative flex min-h-screen flex-col bg-background font-body text-on-surface">
      <LandingBackground />
      <AuthPageHeader />

      <main className="relative flex flex-1 items-center justify-center px-6 py-10 sm:py-14">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="font-headline text-3xl font-bold text-on-surface sm:text-4xl">Quên mật khẩu</h1>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-on-surface-variant">
              Nhập email đăng ký — chúng tôi gửi mã OTP 6 số (hiệu lực 15 phút) để đặt lại mật khẩu.
            </p>
          </div>

          <div className="landing-card rounded-2xl border border-outline-variant/30 p-8">
            {error && (
              <p className="mb-4 rounded-xl border border-tertiary-container/40 bg-tertiary-container/15 px-3 py-2 text-sm text-tertiary">
                {error}
              </p>
            )}

            {sent ? (
              <div className="space-y-5">
                <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm leading-relaxed text-emerald-300">
                  Nếu email tồn tại trong hệ thống, mã xác minh đã được gửi. Kiểm tra hộp thư (và thư
                  rác), sau đó nhập mã để đặt lại mật khẩu.
                </p>
                <GradientButton
                  size="lg"
                  className="w-full font-headline"
                  onClick={() => navigate(resetHref)}
                >
                  Đặt lại mật khẩu
                </GradientButton>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => void sendOtp()}
                  className="w-full text-center text-sm text-primary hover:underline disabled:opacity-50"
                >
                  {loading ? 'Đang gửi…' : 'Gửi lại mã'}
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="ml-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                      mail
                    </span>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ban@congty.com"
                      className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low/80 py-3 pl-10 pr-4 text-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                    />
                  </div>
                </div>

                <GradientButton
                  type="submit"
                  size="lg"
                  className="w-full font-headline"
                  disabled={loading}
                >
                  {loading ? 'Đang gửi…' : 'Gửi mã xác minh'}
                </GradientButton>
              </form>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-on-surface-variant">
            <Link to="/login" className="font-semibold text-primary hover:underline">
              ← Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
