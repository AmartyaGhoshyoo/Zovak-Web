"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, PanInfo, motion } from "motion/react";
import { WorkItem } from "@/types";
import { projectSlides } from "@/lib/work";
import { PlaceholderSlide } from "./work/SlideView";

interface WorkLightboxProps {
  item: WorkItem;
  title: string;
  initialIndex?: number;
  onClose: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "18%" : "-18%", opacity: 0, scale: 0.96 }),
  center: { x: "0%", opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-18%" : "18%", opacity: 0, scale: 0.96 }),
};

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={direction === "left" ? "" : "rotate-180"}>
      <path d="M12.5 4L6.5 10L12.5 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WorkLightbox({ item, title, initialIndex = 0, onClose }: WorkLightboxProps) {
  const slides = projectSlides(item);

  const [[index, direction], setPage] = useState<[number, number]>([initialIndex, 0]);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const dragged = useRef(false);

  const hasMultiple = slides.length > 1;
  const current = slides[index] ?? slides[0];

  // Lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function goTo(next: number, dir?: number) {
    setZoomed(false);
    const wrapped = (next + slides.length) % slides.length;
    setPage([wrapped, dir ?? (next > index ? 1 : -1)]);
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasMultiple) goTo(index + 1, 1);
      if (e.key === "ArrowLeft" && hasMultiple) goTo(index - 1, -1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasMultiple]);

  function handleImageClick(e: MouseEvent<HTMLDivElement>) {
    // A swipe ends with a click event — don't treat it as a zoom
    if (dragged.current || current?.kind !== "image") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
    setZoomed((z) => !z);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    setTimeout(() => (dragged.current = false), 0);
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -80) goTo(index + 1, 1);
    else if (swipe > 80) goTo(index - 1, -1);
  }

  function requestDemo() {
    window.dispatchEvent(new CustomEvent("zovak:request-demo"));
    onClose();
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  }

  if (!current) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-night/85 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.5, ease }}
        style={{ transformPerspective: 1400 }}
        className="relative flex w-full max-w-[1100px] flex-col overflow-hidden rounded-2xl bg-night ring-1 ring-night-line"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-accent2">{item.type}</p>
            <h3 className="truncate font-display text-lg text-ink">{title}</h3>
          </div>
          <div className="flex items-center gap-3">
            {hasMultiple && (
              <span className="font-mono text-[0.75rem] text-ink/50">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink/5 text-ink/70 transition-colors duration-200 hover:bg-ink/10 hover:text-ink"
            >
              <IconClose />
            </button>
          </div>
        </div>

        {/* Progress segments */}
        {hasMultiple && (
          <div className="flex gap-1.5 px-5 pb-3 md:px-6">
            {slides.map((_, i) => (
              <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
                <motion.span
                  className="block h-full origin-left rounded-full bg-accent2"
                  animate={{ scaleX: i <= index ? 1 : 0 }}
                  transition={{ duration: 0.4, ease }}
                />
              </span>
            ))}
          </div>
        )}

        {/* Image stage */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease }}
              drag={hasMultiple && !zoomed ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragStart={() => (dragged.current = true)}
              onDragEnd={handleDragEnd}
              onClick={handleImageClick}
              className={`absolute inset-0 ${
                current.kind === "image" ? (zoomed ? "cursor-zoom-out" : "cursor-zoom-in") : "cursor-grab"
              }`}
            >
              {current.kind === "image" ? (
                <Image
                  src={current.src}
                  alt={`${title} — view ${index + 1} of ${slides.length}`}
                  fill
                  sizes="(min-width: 1100px) 1100px, 100vw"
                  quality={85}
                  priority
                  draggable={false}
                  style={{ transformOrigin: origin }}
                  className={`pointer-events-none select-none object-contain transition-transform duration-500 ease-out ${
                    zoomed ? "scale-[2]" : "scale-100"
                  }`}
                />
              ) : (
                <PlaceholderSlide tone="dark" />
              )}
            </motion.div>
          </AnimatePresence>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1, -1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-night/60 text-ink backdrop-blur transition-all hover:scale-105 hover:bg-forest"
              >
                <IconChevron direction="left" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1, 1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-night/60 text-ink backdrop-blur transition-all hover:scale-105 hover:bg-forest"
              >
                <IconChevron direction="right" />
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          {hasMultiple ? (
            <div className="flex gap-2 overflow-x-auto p-0.5">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={slide.kind === "image" ? `View image ${i + 1}` : `Slot ${i + 1} — coming soon`}
                  aria-current={i === index}
                  className={`relative h-12 w-[4.5rem] shrink-0 cursor-pointer overflow-hidden rounded-md ring-2 transition-all duration-200 ${
                    i === index ? "opacity-100 ring-accent2" : "opacity-45 ring-transparent hover:opacity-80"
                  }`}
                >
                  {slide.kind === "image" ? (
                    <Image src={slide.src} alt="" fill sizes="72px" className="object-cover" draggable={false} />
                  ) : (
                    <PlaceholderSlide compact tone="dark" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-[0.8rem] text-ink/40">Click the image to zoom · Esc to close</p>
          )}

          {item.liveUrl ? (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-accent2 px-5 text-[0.88rem] font-medium text-night transition-colors hover:bg-mint"
            >
              View live site <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={requestDemo}
              className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent2 px-5 text-[0.88rem] font-medium text-night transition-colors hover:bg-mint"
            >
              Book a demo call <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
