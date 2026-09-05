import Container from "./Container";
import Reveal from "./Reveal";
import { process } from "@/data/process";

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink-soft py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent2/10 blur-[90px]"
      />
      <Container className="relative">
        <Reveal className="mb-14 max-w-[640px]">
          <p className="mb-3.5 font-mono text-[0.8rem] text-accent2">// how it works</p>
          <h2 className="mb-4 font-display text-[1.9rem] font-semibold tracking-tight md:text-[2.75rem]">
            Four steps, no surprises
          </h2>
          <p className="text-[1.02rem] text-text-muted">
            The same process whether you&apos;re commissioning a landing page
            or a full product.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-6 w-px bg-gradient-to-b from-accent via-accent2 to-accent lg:hidden" />

          <div className="absolute left-5 right-5 top-[19px] hidden h-px lg:block">
            <div className="h-px w-full bg-border-strong" />
            <div className="absolute inset-0 origin-left bg-gradient-to-r from-accent via-accent2 to-accent animate-grow-x motion-reduce:animate-none" />
            <span className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_rgba(47,107,79,0.55)] animate-bead-travel motion-reduce:animate-none" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {process.map((step, index) => (
              <Reveal key={step.number} delay={index * 140}>
                <div className="relative pl-12 lg:pl-0 lg:pt-12">
                  <div
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-gradient-to-br from-accent to-[#1F4E3A] font-mono text-[0.78rem] text-ink shadow-[0_0_24px_rgba(47,107,79,0.35)] lg:left-0"
                    style={{ animationDelay: `${index * 180}ms` }}
                  >
                    <span className="animate-node-pulse motion-reduce:animate-none">
                      {step.number}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-border bg-ink p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40">
                    <h3 className="mb-2 font-display text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-[0.94rem] text-text-muted">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
