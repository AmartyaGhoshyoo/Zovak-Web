"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { VoiceState } from "@/lib/assistant";

interface VoiceOrbProps {
  state: VoiceState;
  size?: number;
}

// Target "energy" per state, sampled every frame. When a real voice backend is
// wired up, this can be swapped for the live audio level from the session.
function energy(state: VoiceState, t: number) {
  switch (state) {
    case "connecting":
      return 0.18 + 0.12 * Math.sin(t / 220);
    case "listening":
      return 0.22 + 0.12 * Math.abs(Math.sin(t / 410) * Math.cos(t / 260));
    case "thinking":
      return 0.14 + 0.06 * Math.sin(t / 140);
    case "speaking":
      return 0.35 + 0.55 * Math.abs(Math.sin(t / 160) * Math.sin(t / 93));
    default:
      return 0.06 + 0.04 * Math.sin(t / 900);
  }
}

export default function VoiceOrb({ state, size = 176 }: VoiceOrbProps) {
  const reduce = useReducedMotion();
  const level = useMotionValue(0.06);
  const smooth = useSpring(level, { stiffness: 140, damping: 18 });

  useAnimationFrame((t) => {
    if (!reduce) level.set(energy(state, t));
  });

  const coreScale = useTransform(smooth, [0, 1], [1, 1.12]);
  const glowScale = useTransform(smooth, [0, 1], [0.9, 1.45]);
  const glowOpacity = useTransform(smooth, [0, 1], [0.35, 0.85]);
  const ringScale = useTransform(smooth, [0, 1], [1.05, 1.3]);
  const ringOpacity = useTransform(smooth, [0, 1], [0.15, 0.45]);

  const spin = state === "idle" ? 14 : state === "thinking" ? 2.5 : 6;

  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden="true">
      <motion.div
        className="absolute inset-0 rounded-full bg-accent2 blur-2xl"
        style={{ scale: glowScale, opacity: glowOpacity }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-accent/40"
        style={{ scale: ringScale, opacity: ringOpacity }}
      />
      <motion.div className="absolute inset-0 overflow-hidden rounded-full bg-night" style={{ scale: coreScale }}>
        <motion.div
          className="absolute -inset-1/4"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: spin, ease: "linear", repeat: Infinity }}
          style={{
            background:
              "conic-gradient(from 0deg, #2F6B4F, #6DBF84, #CFE8C9, #2F6B4F, #1A3B2C, #6DBF84, #2F6B4F)",
            filter: "blur(18px)",
          }}
        />
        <motion.div
          className="absolute -inset-1/4"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: spin * 1.6, ease: "linear", repeat: Infinity }}
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(247,244,238,0.55), transparent 40%)",
          }}
        />
        {/* Glassy highlight */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.35),transparent_45%)]" />
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/15" />
      </motion.div>
    </div>
  );
}
