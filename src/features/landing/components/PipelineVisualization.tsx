const SCAN_LINES = [72, 45, 88];

export function PipelineVisualization() {
  return (
    <div className="relative aspect-square w-full max-w-lg mx-auto">
      <div className="absolute inset-0 rounded-[2rem] border border-outline-variant/30 bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 landing-pipeline-grid" />

        {/* Mock video frames */}
        <div className="absolute inset-6 grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-gradient-to-br from-surface-container-high to-surface-container border border-outline-variant/20 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `linear-gradient(${120 + i * 20}deg, #0052ff22, transparent)`,
                }}
              />
              {i === 4 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/60 text-2xl">play_circle</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scan line animation */}
        <div className="landing-scan-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Floating status card */}
      <div className="absolute -bottom-4 -right-2 sm:right-4 w-72 landing-card rounded-2xl border border-outline-variant/30 p-5 shadow-ambient animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Pipeline bất đồng bộ
          </span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-container" />
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
          <div className="landing-progress h-full rounded-full bg-gradient-to-r from-[#003ec7] to-primary-container" />
        </div>

        <p className="mt-2 text-[10px] text-on-surface-variant">
          Đang phân tích khung 4.209… <span className="float-right font-mono text-primary">68%</span>
        </p>

        <div className="mt-3 space-y-2">
          {SCAN_LINES.map((score, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
              <span className="material-symbols-outlined text-xs text-outline">
                {score > 70 ? 'warning' : 'check_circle'}
              </span>
              <span className="flex-1 text-on-surface-variant truncate">
                {['Bạo lực', 'Nhạy cảm', 'Ngôn từ toxic'][i]}
              </span>
              <span
                className={`font-mono ${score > 70 ? 'text-tertiary' : 'text-emerald-400'}`}
              >
                {score}%
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
          <span className="material-symbols-outlined text-emerald-400 text-sm">verified</span>
          <span className="text-[10px] font-medium text-emerald-300">An toàn — Không phát hiện vi phạm</span>
        </div>
      </div>
    </div>
  );
}
