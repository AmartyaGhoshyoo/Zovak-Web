import Container from "./Container";
import Reveal from "./Reveal";
import { work } from "@/data/work";

export default function Work() {
  return (
    <section id="work" className="bg-ink-soft py-16 md:py-28">
      <Container>
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div className="max-w-[560px]">
            <p className="mb-3.5 font-mono text-[0.8rem] text-accent2">// selected work</p>
            <h2 className="font-display text-[1.9rem] font-semibold tracking-tight md:text-[2.75rem]">
              A few things we&apos;ve built
            </h2>
          </div>
          <p className="max-w-[360px] text-[1rem] text-text-muted">
            Real product and brand work for early-stage teams — shown here as
            a taste of range, not a full archive.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {work.map((item, index) => (
            <Reveal
              key={item.name}
              delay={index * 90}
              className={index % 2 === 1 ? "md:mt-16" : ""}
            >
              <a
                href="#contact"
                className="group block overflow-hidden rounded-[28px] border border-border bg-ink shadow-[0_30px_80px_-45px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_40px_90px_-40px_rgba(47,107,79,0.35)]"
              >
<div className={`relative overflow-hidden ${item.image ? "" : "aspect-[4/3]"}`}>
  {item.image ? (
    <img
      src={item.image}
      alt={`${item.name} project preview`}
      className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.06]"
    />
  ) : (
    <div
      className={`absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-[1.06] ${item.gradient}`}
    />
  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#14231C] via-[#14231C]/45 to-transparent opacity-95" />

                  <span className="absolute left-5 top-5 rounded-full bg-[#14231C]/60 px-3 py-1.5 font-mono text-[0.7rem] tracking-wide text-white backdrop-blur-sm">
                    {item.type}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <h3 className="font-display text-2xl font-semibold text-white md:text-[1.8rem]">
                      {item.name}
                    </h3>
                    <p className="mt-2 max-w-[36ch] text-[0.92rem] text-white/70">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-[0.78rem] text-ink opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-accent-hover">
                      View project
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 font-mono text-[0.78rem] text-text-faint">
          More case studies shared on request — this is a working sample, not
          the full list.
        </p>
      </Container>
    </section>
  );
}
