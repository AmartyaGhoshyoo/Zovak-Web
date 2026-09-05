import Container from "./Container";
import Reveal from "./Reveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink-soft py-16 md:py-24">
      <Container>
        <Reveal className="mb-12 max-w-[620px]">
          <p className="mb-3.5 font-mono text-[0.8rem] text-accent2">// client feedback</p>
          <h2 className="font-display text-[1.9rem] font-semibold tracking-tight md:text-[2.75rem]">
            What it&apos;s like to work with us
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
          {testimonials.map((t, index) => (
            <Reveal key={t.name} delay={index * 110}>
              <blockquote className="h-full rounded-2xl border border-border bg-ink p-[26px] shadow-[0_20px_60px_-40px_rgba(60,45,20,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/35">
                <p className="mb-[18px] text-[1rem] text-text">&ldquo;{t.quote}&rdquo;</p>
                <footer className="flex flex-col text-[0.85rem] not-italic">
                  <strong className="text-text">{t.name}</strong>
                  <span className="text-text-faint">{t.role}</span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
