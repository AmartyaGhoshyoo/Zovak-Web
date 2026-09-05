import Container from "./Container";

const CATEGORIES = [
  "Applied AI",
  "DevTools",
  "Vertical SaaS",
  "AI Infra",
  "Consumer AI",
  "Healthtech AI",
  "Fintech AI",
];

export default function TrustedStrip() {
  const loop = [...CATEGORIES, ...CATEGORIES];

  return (
    <section className="overflow-hidden border-y border-border py-8">
      <Container>
        <p className="mb-4 font-mono text-[0.78rem] text-text-faint">
          Trusted by early-stage teams building in
        </p>
      </Container>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max animate-marquee gap-10 pr-10 font-display text-lg font-semibold text-text-muted motion-reduce:animate-none md:text-xl">
          {loop.map((category, i) => (
            <span key={`${category}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
              {category}
              <span aria-hidden="true" className="text-accent/50">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
