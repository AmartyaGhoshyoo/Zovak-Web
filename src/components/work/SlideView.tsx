"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Slide } from "@/lib/work";

export function PlaceholderSlide({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed text-center ${
        dark
          ? "border-ink/15 bg-[radial-gradient(circle_at_center,rgba(109,191,132,0.14),transparent_60%)]"
          : "border-accent/25 bg-[radial-gradient(circle_at_center,rgba(109,191,132,0.18),transparent_65%)] bg-ink-soft"
      }`}
    >
      {!compact && (
        <>
          <motion.span
            className={`h-10 w-10 rounded-full border border-dashed ${dark ? "border-accent2/60" : "border-accent/50"}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <p className={`font-display text-xl ${dark ? "text-ink/80" : "text-forest"}`}>More shots coming soon</p>
          <p className={`text-[0.82rem] ${dark ? "text-ink/40" : "text-text-faint"}`}>
            This view is reserved for an upcoming screenshot.
          </p>
        </>
      )}
    </div>
  );
}

export function SlideView({
  slide,
  alt,
  sizes,
  priority = false,
  tone = "light",
  className = "object-cover object-top",
}: {
  slide: Slide;
  alt: string;
  sizes: string;
  priority?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (slide.kind === "placeholder") return <PlaceholderSlide tone={tone} />;
  return (
    <Image
      src={slide.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
