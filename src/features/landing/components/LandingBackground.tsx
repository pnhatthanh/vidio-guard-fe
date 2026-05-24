export function LandingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="landing-mesh absolute inset-0" />
      <div className="landing-orb landing-orb--primary" />
      <div className="landing-orb landing-orb--secondary" />
      <div className="landing-grid absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
