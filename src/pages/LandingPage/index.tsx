import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero.png';

type Feature = {
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  hoverBgClass: string;
  title: string;
  description: string;
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const features = useMemo<Feature[]>(
    () => [
      {
        icon: 'shield',
        iconBgClass: 'bg-blue-100',
        iconTextClass: 'text-blue-700',
        hoverBgClass: 'group-hover:bg-blue-700 group-hover:text-white',
        title: 'Violence Detection',
        description:
          'Real-time identification of physical altercations, weapons, and dangerous activities with 0.1s trigger response.',
      },
      {
        icon: 'visibility_off',
        iconBgClass: 'bg-orange-100',
        iconTextClass: 'text-orange-700',
        hoverBgClass: 'group-hover:bg-orange-700 group-hover:text-white',
        title: 'Explicit Content',
        description:
          'Advanced pixel-level analysis for adult content, nudity, and suggestive imagery across all lighting conditions.',
      },
      {
        icon: 'campaign',
        iconBgClass: 'bg-indigo-100',
        iconTextClass: 'text-indigo-700',
        hoverBgClass: 'group-hover:bg-indigo-700 group-hover:text-white',
        title: 'Hate Speech',
        description:
          'Multilingual OCR and audio transcription to flag extremist iconography and discriminatory rhetoric instantly.',
      },
      {
        icon: 'psychology',
        iconBgClass: 'bg-slate-200',
        iconTextClass: 'text-slate-700',
        hoverBgClass: 'group-hover:bg-slate-900 group-hover:text-white',
        title: 'Deepfake Analysis',
        description:
          'Identify synthetic media and AI-generated faces using biological signal analysis and artifact detection.',
      },
    ],
    [],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-body">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/85 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center h-16 px-8 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-slate-900 font-headline">Digital Curator</div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight">
            <button
              type="button"
              onClick={() => scrollTo('features')}
              className="text-blue-700 border-b-2 border-blue-600 pb-1"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              How it Works
            </button>
            <button
              type="button"
              onClick={() => scrollTo('security')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Security
            </button>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 text-sm font-semibold hover:bg-slate-100 px-4 py-2 rounded-lg transition-all"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => scrollTo('signup')}
              className="bg-gradient-to-br from-blue-700 to-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero & Sign-up Section */}
        <section className="relative min-h-[921px] flex items-center px-8 max-w-7xl mx-auto py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-blue-700 text-xs font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined text-sm">verified</span>
                Next-Gen Moderation
              </div>

              <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Secure Your Digital Realm with{' '}
                <span className="text-blue-700">AI Video Stewardship</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Vigilant Lens processes massive video streams asynchronously, ensuring a safe ecosystem for your users
                without compromising platform performance.
              </p>

              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-headline font-bold text-blue-700">99.8%</span>
                  <span className="text-xs uppercase tracking-widest text-slate-500">Accuracy Rate</span>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-3xl font-headline font-bold text-blue-700">&lt;1s</span>
                  <span className="text-xs uppercase tracking-widest text-slate-500">Latency</span>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div id="signup" className="bg-white/85 backdrop-blur-2xl shadow-md p-8 md:p-10 rounded-xl border border-white/20">
              <h2 className="text-2xl font-headline font-bold text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-600 text-sm mb-8">Join the elite platform for digital stewardship.</p>

              <form className="space-y-5" onSubmit={onRegisterSubmit}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    placeholder="Alex Rivera"
                    type="text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider ml-1">Work Email</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    placeholder="alex@company.com"
                    type="email"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider ml-1">Password</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="flex items-start gap-3 py-2">
                  <input
                    className="mt-1 rounded text-blue-600 focus:ring-blue-600"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <p className="text-xs text-slate-500 leading-tight">
                    I agree to the{' '}
                    <a className="text-blue-700 hover:underline" href="#">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a className="text-blue-700 hover:underline" href="#">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
                <button
                  className="w-full bg-gradient-to-br from-blue-700 to-blue-600 text-white font-headline font-bold py-4 rounded-lg shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  type="submit"
                  disabled={!agreed}
                >
                  Register Organization
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* The Problem & Solution (AI Capabilities) */}
        <section id="features" className="bg-slate-100 py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">Intelligence Capabilities</h2>
              <h3 className="text-4xl font-headline font-bold text-slate-900">Precision-Grade Threat Detection</h3>
              <p className="text-slate-600">
                Our neural networks are trained on millions of curated datasets to identify subtle risks that standard
                filters miss.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white p-8 rounded-xl group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${f.iconBgClass} ${f.iconTextClass} ${f.hoverBgClass} transition-colors`}
                  >
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <h4 className="text-xl font-headline font-bold text-slate-900 mb-3">{f.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works (Async Workflow) */}
        <section id="how-it-works" className="py-24 px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-[2rem] overflow-hidden">
                <img
                  alt="AI pipeline"
                  className="w-full h-full object-cover mix-blend-overlay opacity-50"
                  src={heroImage}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/85 backdrop-blur-2xl p-6 rounded-2xl w-64 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest text-blue-700 uppercase">Async Pipeline</span>
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-blue-700" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Analyzing frame 4,209...</span>
                        <span>68%</span>
                      </div>
                      <div className="h-12 bg-slate-50 rounded-lg border border-blue-700/10 flex items-center px-3 gap-2">
                        <span className="material-symbols-outlined text-blue-700 text-sm">check_circle</span>
                        <span className="text-[10px] font-medium">Safe - No Violations Found</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold text-slate-900 tracking-tight">The Asynchronous Advantage</h2>
                <p className="text-slate-600 leading-relaxed">
                  Vigilant Lens operates in the background, allowing your users to enjoy seamless uploads while our AI
                  handles the heavy lifting.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  {
                    step: 1,
                    title: 'Secure Upload',
                    desc: 'Encrypted tunnel ingestion with automatic codec optimization for faster processing.',
                  },
                  {
                    step: 2,
                    title: 'AI Pipeline Analysis',
                    desc: 'Massively parallel async processing across multiple specialized neural clusters.',
                  },
                  {
                    step: 3,
                    title: 'Detailed Insights',
                    desc: 'Structured reporting via Webhooks or Dashboard with granular confidence scores.',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-headline font-bold">
                      {s.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900">{s.title}</h4>
                      <p className="text-sm text-slate-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Grade Security */}
        <section id="security" className="bg-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md">
                <h2 className="text-2xl font-headline font-bold text-slate-900 mb-2">Enterprise-Grade Trust</h2>
                <p className="text-sm text-slate-600">
                  We treat your data with the highest level of confidentiality, protected by industry-leading standards.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60">
                {[
                  { badge: 'SOC2', label: 'Type II Certified' },
                  { badge: 'AES', label: '256-Bit Encrypted' },
                  { badge: 'ISO', label: '27001 Compliant' },
                  { badge: 'GDPR', label: 'Privacy First' },
                ].map((i) => (
                  <div key={i.badge} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-slate-200 font-bold text-xs">
                      {i.badge}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest">{i.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us (Value Prop) */}
        <section id="pricing" className="py-24 px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-700 p-12 rounded-2xl text-white space-y-6 flex flex-col justify-center">
              <h2 className="text-4xl font-headline font-extrabold leading-tight">
                Beyond Filtering. This is Digital Curation.
              </h2>
              <p className="text-blue-100 leading-relaxed opacity-90">
                While others simple block content, we provide the context needed to understand your platform's health
                and user behavior trends.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => scrollTo('signup')}
                  className="bg-white text-blue-700 font-bold py-4 px-8 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            <div className="grid gap-8">
              {[
                {
                  icon: 'speed',
                  title: 'Sub-Second Latency',
                  desc: 'Our edge-computing infrastructure ensures that moderation happens as fast as the upload permits.',
                },
                {
                  icon: 'analytics',
                  title: 'Customizable Policies',
                  desc: "Tailor detection thresholds and categories to match your community's specific guidelines perfectly.",
                },
              ].map((c) => (
                <div key={c.title} className="bg-slate-100 p-8 rounded-2xl flex gap-6">
                  <span className="material-symbols-outlined text-blue-700 text-4xl">{c.icon}</span>
                  <div className="space-y-2">
                    <h4 className="text-xl font-headline font-bold">{c.title}</h4>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-slate-200 bg-slate-100 mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-8 max-w-7xl mx-auto">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="text-lg font-bold text-slate-900 font-headline">Digital Curator</div>
              <p className="text-xs text-slate-500 max-w-xs leading-loose uppercase tracking-widest">
                Professional AI Stewardship for a safer internet.
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Product</h5>
              <ul className="space-y-3">
                {['Features', 'Security', 'API Documentation'].map((l) => (
                  <li key={l}>
                    <a
                      className="text-slate-500 hover:text-slate-900 text-xs transition-opacity underline decoration-blue-500/30 underline-offset-4"
                      href="#"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Company</h5>
              <ul className="space-y-3">
                {['About Us', 'Status', 'Careers'].map((l) => (
                  <li key={l}>
                    <a
                      className="text-slate-500 hover:text-slate-900 text-xs transition-opacity underline decoration-blue-500/30 underline-offset-4"
                      href="#"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Legal</h5>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service'].map((l) => (
                  <li key={l}>
                    <a
                      className="text-slate-500 hover:text-slate-900 text-xs transition-opacity underline decoration-blue-500/30 underline-offset-4"
                      href="#"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-8 py-6 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-slate-500">© 2024 Digital Curator AI. All rights reserved.</span>
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-slate-400 text-lg hover:text-blue-600 transition-colors cursor-pointer">
                public
              </span>
              <span className="material-symbols-outlined text-slate-400 text-lg hover:text-blue-600 transition-colors cursor-pointer">
                alternate_email
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
