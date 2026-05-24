import { WORKFLOW_STEPS } from '../constants/landingContent';
import { Container } from './marketing/Container';
import { PipelineVisualization } from './PipelineVisualization';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <PipelineVisualization />

          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Quy trình</p>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
                Xử lý bất đồng bộ, không làm chậm nền tảng
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                Upload video diễn ra ngay lập tức. AI phân tích ở background và trả kết quả qua
                dashboard hoặc webhook khi hoàn tất.
              </p>
            </div>

            <ol className="space-y-8">
              {WORKFLOW_STEPS.map((step) => (
                <li key={step.step} className="flex gap-5">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-container font-headline text-sm font-bold text-white shadow-lg shadow-primary-container/30">
                      {step.step}
                    </div>
                    {step.step < WORKFLOW_STEPS.length && (
                      <div className="mt-2 h-full min-h-[2rem] w-px bg-gradient-to-b from-primary-container/50 to-transparent" />
                    )}
                  </div>
                  <div className="space-y-1 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {step.icon}
                      </span>
                      <h3 className="font-headline font-bold text-on-surface">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
