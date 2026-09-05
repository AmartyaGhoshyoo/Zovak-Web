import Container from "./Container";
import Reveal from "./Reveal";
import { services } from "@/data/services";
import { ServiceGlyph } from "./icons/ServiceIcons";
import ServiceArt from "./ServiceArt";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(47,107,79,0.06),transparent_42%)]"
      />
      <Container className="relative">
        <Reveal className="mb-12 max-w-[640px]">
          <p className="mb-3.5 font-mono text-[0.8rem] text-accent2">// what we do</p>
          <h2 className="mb-4 font-display text-[1.9rem] font-semibold tracking-tight md:text-[2.75rem]">
            Three ways we help you ship
          </h2>
          <p className="text-[1.02rem] text-text-muted">
            Pick one, or bundle all three — the same team carries the thread
            from idea to launch.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 120}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-ink-soft shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/45 hover:shadow-[0_30px_80px_-40px_rgba(47,107,79,0.4)]">
                <div className="relative h-[148px] overflow-hidden border-b border-black/10 bg-gradient-to-br from-accent to-[#1F4E3A]">
                  <ServiceArt icon={service.icon} />
                  <div className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine" />
                </div>
                <div className="p-7">
                  <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-6">
                    <ServiceGlyph icon={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-[0.95rem] text-text-muted">{service.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-accent px-2.5 py-1 font-mono text-xs text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
