"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import BrowserFrame from "../BrowserFrame";
import { WorkItem } from "@/types";
import { projectImages, projectNumber, projectSlides, projectTitle } from "@/lib/work";

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE_MS = 3800;

interface ProjectCardProps {
  item: WorkItem;
  index: number; // position in work.ts (drives numbering)
  position: number; // position in the current (filtered) stack
  total: number;
  progress: MotionValue<number>; // scroll progress of the whole stack
  onOpen: (slide: number) => void;
}

// One case-study card in the stacking deck (pattern: 21st.dev "Stacking
// Cards"). Pins under the header; as later cards slide over it, it scales
// down and dims so the deck reads as a physical stack.
export default function ProjectCard({ item, index, position, total, progress, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  // Stacking is a desktop/tablet effect; on phones cards just flow
  const [stacking, setStacking] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setStacking(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const reduce = reduceMotion || !stacking;
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.5 });

  const start = position / total;
  const targetScale = 1 - (total - position - 1) * 0.04;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : targetScale]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, position === total - 1 ? 0 : 0.35]);

  // Parallax for the floating second screenshot
  const { scrollYProgress: local } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const floatY = useTransform(local, [0, 1], [60, -60]);

  const images = projectImages(item);
  const slides = projectSlides(item);
  const title = projectTitle(item, index);
  const number = projectNumber(index);

  // Main frame slowly cycles through the project's screenshots
  const [shot, setShot] = useState(0);
  useEffect(() => {
    if (reduceMotion || !inView || images.length < 2) return;
    const t = setTimeout(() => setShot((s) => (s + 1) % images.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [shot, inView, reduceMotion, images.length]);

  const secondary = images.length > 1 ? images[(shot + 1) % images.length] : undefined;
  const strip = slides.slice(0, 5);
  const extra = slides.length - strip.length;

  return (
    <div ref={cardRef} className="relative pt-4 md:sticky md:top-24 md:flex md:h-[min(80vh,660px)] md:items-start">
      <motion.article
        style={{ scale, top: stacking ? position * 14 : 0 }}
        className="relative w-full origin-top overflow-hidden rounded-[28px] bg-ink-elev shadow-[0_-10px_40px_-20px_rgba(31,78,58,0.25),0_40px_80px_-50px_rgba(31,78,58,0.45)] ring-1 ring-border"
      >
        {/* Soft brand wash in the corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-accent2/20 blur-[100px]"
        />

        <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:p-12">
          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="font-display text-[3.4rem] leading-none tracking-tight text-accent/20 md:text-[4.5rem]">
                {number}
              </span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-[0.75rem] font-medium text-accent ring-1 ring-accent/15">
                {item.type}
              </span>
            </div>

            <h3 className="mt-5 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.6rem]">{title}</h3>
            {item.description && (
              <p className="mt-4 max-w-[40ch] text-[0.98rem] leading-relaxed text-text-muted">{item.description}</p>
            )}

            {/* Shot strip */}
            <div className="mt-8 hidden md:block">
              <p className="mb-3 text-[0.75rem] uppercase tracking-[0.14em] text-text-faint">
                {slides.length} {slides.length === 1 ? "screen" : "screens"} in this project
              </p>
              <div className="flex gap-2">
                {strip.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onOpen(i)}
                    aria-label={s.kind === "image" ? `Open view ${i + 1}` : `View ${i + 1} — coming soon`}
                    className="group/t relative h-12 w-[4.4rem] cursor-pointer overflow-hidden rounded-lg ring-1 ring-border-strong transition-transform duration-300 hover:-translate-y-1"
                  >
                    {s.kind === "image" ? (
                      <Image src={s.src} alt="" fill sizes="72px" className="object-cover object-top" />
                    ) : (
                      <span className="absolute inset-0 border border-dashed border-accent/30 bg-accent/5" />
                    )}
                  </button>
                ))}
                {extra > 0 && (
                  <button
                    type="button"
                    onClick={() => onOpen(strip.length)}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-accent/10 font-mono text-[0.75rem] text-accent"
                  >
                    +{extra}
                  </button>
                )}
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-5">
              {[
                ["Type", item.type],
                ["Screens", String(slides.length)],
                ["Status", item.liveUrl ? "Live" : "Demo on request"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-text-faint">{label}</dt>
                  <dd className="mt-1 text-[0.92rem] font-medium text-forest">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <button
                type="button"
                onClick={() => onOpen(0)}
                className="group/b inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-accent px-6 text-[0.95rem] font-medium text-ink transition-colors hover:bg-accent-hover"
              >
                View case
                <span aria-hidden="true" className="transition-transform duration-300 group-hover/b:translate-x-0.5">
                  →
                </span>
              </button>
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-[0.95rem] font-medium transition-colors hover:bg-ink"
                >
                  Live site <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Collage */}
          <div className="relative order-first min-w-0 pb-6 lg:order-none lg:pb-14">
            <button
              type="button"
              onClick={() => onOpen(shot)}
              aria-label={`Open ${title} gallery`}
              className="group block w-full cursor-zoom-in text-left"
            >
              <BrowserFrame
                url={`zovak.work/${number}`}
                className="shadow-[0_30px_60px_-30px_rgba(31,78,58,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-soft">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={images[shot] ?? "empty"}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease }}
                    >
                      {images[shot] ? (
                        <Image
                          src={images[shot]!}
                          alt={`${title} — screen ${shot + 1}`}
                          fill
                          sizes="(min-width: 1024px) 640px, 100vw"
                          className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {images.length > 1 && (
                    <div className="absolute inset-x-4 bottom-3 flex gap-1">
                      {images.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                            i === shot ? "bg-ink" : "bg-ink/35"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </BrowserFrame>
            </button>

            {/* Floating second screen (only when the project has more than one shot) */}
            {secondary && (
              <motion.div
                style={{ y: reduce ? 0 : floatY }}
                className="pointer-events-none absolute -bottom-2 -left-6 hidden w-[42%] rotate-[-4deg] md:block"
              >
                <div className="overflow-hidden rounded-xl bg-ink-elev p-1.5 shadow-[0_30px_50px_-20px_rgba(31,78,58,0.5)] ring-1 ring-border-strong">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.div
                        key={secondary}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Image src={secondary} alt="" fill sizes="280px" className="object-cover object-top" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Shot count badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="absolute -right-2 top-10 flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-1.5 text-[0.75rem] font-medium text-ink shadow-lg md:-right-4"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1" y="2.5" width="8" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
                <path d="M3 1h7.5a.5.5 0 0 1 .5.5V8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              {slides.length} {slides.length === 1 ? "shot" : "shots"}
            </motion.span>
          </div>
        </div>

        {/* Dims as the next card slides over */}
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink-soft" />
      </motion.article>
    </div>
  );
}
