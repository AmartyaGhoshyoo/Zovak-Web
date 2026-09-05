"use client";

import { useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import WorkCard from "./WorkCard";
import WorkLightbox from "./WorkLightbox";
import { work } from "@/data/work";

export default function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="work" className="relative overflow-hidden bg-ink-soft py-16 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent2/10 blur-[110px]"
      />

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
            a taste of range, not a full archive. Click any project to flip
            through the full set of shots.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
          {work.map((item, index) => (
            <Reveal
              key={item.name || index}
              delay={index * 90}
              className={index % 2 === 1 ? "md:mt-16" : ""}
            >
              <WorkCard item={item} index={index} onOpen={() => setOpenIndex(index)} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 font-mono text-[0.78rem] text-text-faint">
          More case studies shared on request — this is a working sample, not
          the full list.
        </p>
      </Container>

      {(() => {
        const activeItem = openIndex !== null ? work[openIndex] : undefined;
        if (!activeItem) return null;
        return <WorkLightbox item={activeItem} onClose={() => setOpenIndex(null)} />;
      })()}
    </section>
  );
}
