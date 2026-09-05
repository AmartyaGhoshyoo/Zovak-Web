import Container from "./Container";
import Button from "./Button";
import Terminal from "./Terminal";
import Reveal from "./Reveal";

const HERO_TAGS = ["Brand", "Product", "Websites", "AI Integration"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-6 md:pb-20 md:pt-8 lg:pb-24">
      {/* Balanced pair — one green, one amber — instead of two orange glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-accent/14 blur-[110px] animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[280px] w-[280px] rounded-full bg-accent2/10 blur-[100px]"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <Reveal delay={0}>
            <p className="mb-4 font-mono text-[0.8rem] text-accent2">
              // for early-stage AI startups
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mb-6 font-display text-[2.3rem] font-semibold leading-[1.16] tracking-tight md:text-[3.2rem] lg:text-[3.5rem]">
            We help early-stage AI startups build brands, products and websites that make investors and customers{" "}
              <span className="relative inline-block">
                <em className="font-medium italic text-accent">
                take them seriously.
                </em>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[4px] w-full origin-left animate-grow-x rounded-full bg-accent [animation-delay:1000ms]"
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mb-8 max-w-[480px] text-[1.05rem] text-text-muted">
              Brand, product, and website — handled by one small team that
              moves at startup speed.
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mb-8 flex flex-wrap gap-3.5">
              <Button href="#contact">Book a call</Button>
              <Button href="#work" variant="ghost">
                See our work →
              </Button>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.78rem] text-text-faint">
              {HERO_TAGS.map((tag, i) => (
                <span key={tag} className="flex items-center gap-3">
                  <span>{tag}</span>
                  {i < HERO_TAGS.length - 1 && (
                    <span aria-hidden="true" className="text-border-strong">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} direction="right" className="relative min-w-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/16 blur-[80px] animate-pulse-glow"
          />
          <div className="animate-float motion-reduce:animate-none">
            <Terminal />
          </div>
          <p className="mt-6 text-center font-mono text-[0.78rem] font-medium text-text-muted lg:text-left">
            Built for pre-seed to Series A teams — shipped in weeks, not
            quarters.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
