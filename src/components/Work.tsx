"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import WorkLightbox from "./WorkLightbox";
import ProjectCard from "./work/ProjectCard";
import { work } from "@/data/work";
import { projectTitle } from "@/lib/work";

export default function Work() {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<{ project: number; slide: number } | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  // Filter tabs are built from the project types actually in work.ts
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    work.forEach((w) => counts.set(w.type, (counts.get(w.type) ?? 0) + 1));
    return [{ label: "All", count: work.length }, ...[...counts].map(([label, count]) => ({ label, count }))];
  }, []);

  const visible = work
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => filter === "All" || item.type === filter);

  const openItem = open ? work[open.project] : undefined;

  return (
    <section id="work" className="relative scroll-mt-16 bg-ink-soft pb-16 pt-24 md:pb-24 md:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[460px] w-[560px] rounded-full bg-accent2/20 blur-[150px]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected work" title="A few things we've built" />
          <Reveal delay={100}>
            <p className="max-w-[340px] text-[0.98rem] leading-relaxed text-text-muted">
              Brand, product and web work for early-stage teams. Scroll the
              stack — open any case to see every screen.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div role="tablist" aria-label="Filter projects" className="inline-flex flex-wrap gap-1 rounded-full bg-ink p-1 ring-1 ring-border">
            {filters.map((f) => (
              <button
                key={f.label}
                type="button"
                role="tab"
                aria-selected={filter === f.label}
                onClick={() => setFilter(f.label)}
                className={`relative flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.88rem] font-medium transition-colors ${
                  filter === f.label ? "text-ink" : "text-text-muted hover:text-text"
                }`}
              >
                {filter === f.label && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f.label}</span>
                <span className={`relative font-mono text-[0.7rem] ${filter === f.label ? "text-ink/70" : "text-text-faint"}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Stacking deck — each card pins and the next slides over it */}
        <div ref={stackRef} key={filter} className="relative mt-6 flex flex-col gap-10 md:gap-0">
          {visible.map(({ item, index }, position) => (
            <ProjectCard
              key={index}
              item={item}
              index={index}
              position={position}
              total={visible.length}
              progress={scrollYProgress}
              onOpen={(slide) => setOpen({ project: index, slide })}
            />
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="text-[0.85rem] text-text-faint">
            More case studies shared on request — this is a sample, not the full list.
          </p>
        </Reveal>
      </Container>

      <AnimatePresence>
        {openItem && open && (
          <WorkLightbox
            key={open.project}
            item={openItem}
            title={projectTitle(openItem, open.project)}
            initialIndex={open.slide}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
