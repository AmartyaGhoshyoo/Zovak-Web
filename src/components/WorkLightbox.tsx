"use client";

import { MouseEvent, useEffect, useState } from "react";
import { WorkItem } from "@/types";

interface WorkLightboxProps {
  item: WorkItem;
  initialIndex?: number;
  onClose: () => void;
}

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "" : "rotate-180"}
    >
      <path
        d="M12.5 4L6.5 10L12.5 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconZoom({ zoomedIn }: { zoomedIn: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.6 7H9.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {!zoomedIn && <path d="M7 4.6V9.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
    </svg>
  );
}

export default function WorkLightbox({ item, initialIndex = 0, onClose }: WorkLightboxProps) {
  const gallery =
    item.images && item.images.length > 0
      ? item.images
      : item.image
        ? [item.image]
        : [];

  const [index, setIndex] = useState(Math.min(initialIndex, gallery.length - 1));
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const hasMultiple = gallery.length > 1;
  const isLive = Boolean(item.liveUrl);

  // Mount transition
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Lock scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function requestClose() {
    setClosing(true);
    window.setTimeout(onClose, 220);
  }

  function goTo(next: number) {
    setZoomed(false);
    setIndex((next + gallery.length) % gallery.length);
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight" && hasMultiple) goTo(index + 1);
      if (e.key === "ArrowLeft" && hasMultiple) goTo(index - 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasMultiple]);

  function handleImageClick(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
    setZoomed((z) => !z);
  }

  function requestDemo() {
    window.dispatchEvent(new CustomEvent("zovak:request-demo"));
    requestClose();
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 230);
  }

  if (gallery.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name || "Project"} gallery`}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ease-out md:p-8 ${
        mounted && !closing ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={requestClose}
        className="absolute inset-0 bg-[#14231C]/85 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        className={`relative flex w-full max-w-[1040px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0E1712] shadow-[0_60px_140px_-40px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out ${
          mounted && !closing ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.97] opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] tracking-wide text-accent2">{item.type}</p>
            {item.name && (
              <h3 className="truncate font-display text-lg font-semibold text-white md:text-xl">
                {item.name}
              </h3>
            )}
          </div>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close gallery"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-white/35 hover:text-white"
          >
            <IconClose />
          </button>
        </div>

        {/* Image stage */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A100D] md:aspect-[16/9]">
          <div
            onClick={handleImageClick}
            className={`h-full w-full ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={gallery[index]}
              src={gallery[index]}
              alt={`${item.name || "Project"} — view ${index + 1} of ${gallery.length}`}
              style={{ transformOrigin: origin }}
              className={`h-full w-full object-contain transition-transform duration-500 ease-out ${
                zoomed ? "scale-[2]" : "scale-100"
              }`}
              draggable={false}
            />
          </div>

          {/* Zoom hint badge */}
          <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[0.68rem] text-white/80 backdrop-blur-sm">
            <IconZoom zoomedIn={zoomed} />
            {zoomed ? "click to zoom out" : "click to zoom in"}
          </span>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 md:left-5"
              >
                <IconChevron direction="left" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/60 md:right-5"
              >
                <IconChevron direction="right" />
              </button>

              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 font-mono text-[0.68rem] text-white/80 backdrop-blur-sm">
                {index + 1} / {gallery.length}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails + CTA */}
        <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7">
          {hasMultiple ? (
            <div className="flex gap-2.5 overflow-x-auto pb-1 md:pb-0">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === index}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    i === index
                      ? "border-accent2 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          ) : (
            <p className="font-mono text-[0.72rem] text-white/40">
              More views coming soon for this project.
            </p>
          )}

          {isLive ? (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[0.8rem] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              View live site
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={requestDemo}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[0.8rem] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Book a demo call
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
