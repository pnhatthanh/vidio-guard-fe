import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/upload');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-body">
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center shadow-lg">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  visibility
                </span>
              </div>
              <span className="font-headline font-extrabold text-2xl tracking-tight text-[#191c1e]">
                Vigilant Lens
              </span>
            </div>
            <h1 className="font-headline text-3xl font-bold text-[#191c1e] mb-2">Welcome Back</h1>
            <p className="text-[#434656] text-sm">Professional AI Video Stewardship.</p>
          </div>

          <div className="glass-card rounded-xl border border-[#c3c5d9]/20 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  className="font-label text-sm font-semibold text-[#434656] block"
                  htmlFor="email"
                >
                  Work Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737688] text-lg">
                    mail
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052ff] text-[#191c1e] transition-all placeholder:text-[#737688]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="font-label text-sm font-semibold text-[#434656] block"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#003ec7] hover:text-[#0052ff] transition-colors"
                    onClick={() => {
                      // Placeholder for future forgot-password flow
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737688] text-lg">
                    lock
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052ff] text-[#191c1e] transition-all placeholder:text-[#737688]/50"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737688] hover:text-[#191c1e] transition-colors"
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-[#c3c5d9] text-[#0052ff] focus:ring-[#0052ff]"
                />
                <label
                  className="text-sm text-[#434656] font-medium select-none"
                  htmlFor="remember"
                >
                  Stay signed in for 30 days
                </label>
              </div>

              <button
                className="w-full brand-gradient text-white font-headline font-bold py-3.5 rounded-lg shadow-md hover:shadow-xl hover:opacity-95 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in…' : 'Sign In'}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#c3c5d9]/30"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-[#737688] font-medium uppercase tracking-widest">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#f2f4f6] text-[#434656] font-semibold text-sm hover:bg-[#eceef0] transition-colors border border-transparent hover:border-[#c3c5d9]/30"
              >
                <img
                  className="w-5 h-5 grayscale opacity-80"
                  alt="Google"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDgkBdaMD-fkX3iIn-ijMh9rzxXIsVNgwbBa5MNTdXkwe_r3g1kYHhLNPQbE96NOyMB17vfB8fnm0FpXmKCxFfQfv6ns3ZomHdpU5IQTJ46GtzeidQ5r82ephjJsXP0cKvsmCrABqa-o-Uh7D96piOb2D44j-xHaySbo7wfmWE7BDdp1jZ-Lpfi1kxztDKtcRGqCOh1_LIESTm1lfThLWKBl5gYm7FFNJJFNoIZ2nxcbLzbTvFmAn_4dgOYyfvwpWh8zgenqajGt3K"
                />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#f2f4f6] text-[#434656] font-semibold text-sm hover:bg-[#eceef0] transition-colors border border-transparent hover:border-[#c3c5d9]/30"
              >
                <img
                  className="w-4 h-4 grayscale opacity-80"
                  alt="Microsoft"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK0TMj0RHiuY-0HJrLSb18Qm7cDnfI_-_ptgIQnBs5yq8lIm8EpV3Cdv72XkaYTixnG73Jgx1vcdlS9yKF4mBdCwAWJ9VMqtRI6bkuyOFhWvuV5gETy_wD0mwXO6vVzTU3BZfJ4q_H5MKyO8WCXdluXgqtWFMyEoPSLxNK4F6P4_qAywuqMnYvetOb0pIbAQFwY6RyfPR08CON-VJhT7_Lt_sxc6MTNfPw7Cna8-2H1uu2IojJq4plocwcKOdXakaomYvRQ10fHOQj"
                />
                Microsoft
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-[#434656]">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="font-bold text-[#003ec7] hover:underline"
              onClick={() => navigate('/')}
            >
              Request access
            </button>
          </p>
        </div>
      </main>

      <footer className="w-full py-12 px-8 mt-auto bg-[#f7f9fb] border-t border-[#c3c5d9]/20 flex flex-col md:flex-row justify-between items-center gap-6 font-body text-sm tracking-wide">
        <div className="text-[#434656] opacity-80">
          © 2024 Vigilant Lens AI. Professional Grade Stewardship.
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {['Privacy Policy', 'Terms of Service', 'Security Architecture', 'Trust Center'].map(
            (label) => (
              <button
                key={label}
                type="button"
                className="text-[#434656] hover:text-[#0052ff] transition-all opacity-80 hover:opacity-100"
              >
                {label}
              </button>
            )
          )}
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
