"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Live mini-scenes for each service card. Every element runs on one shared
// looping timeline (CYCLE seconds); `beat(start, end)` fades a part in at
// `start` and out at `end` (both 0–1 of the cycle). Loops only run while the
// card is on screen and are frozen in their final state under reduced motion.

const CYCLE = 7;

function useLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  return { ref, running: inView && !reduce, reduce };
}

function beat(start: number, end = 0.92, from: Record<string, number> = { y: 8 }) {
  const keys = Object.keys(from);
  const animate: Record<string, number[]> = { opacity: [0, 0, 1, 1, 0] };
  keys.forEach((k) => {
    const v = from[k]!;
    animate[k] = [v, v, k === "scale" || k === "scaleX" ? 1 : 0, k === "scale" || k === "scaleX" ? 1 : 0, k === "scale" || k === "scaleX" ? 1 : 0];
  });
  return {
    animate,
    transition: { duration: CYCLE, times: [0, start, Math.min(start + 0.07, end), end, 1], repeat: Infinity, ease: "easeOut" as const },
  };
}

function Part({
  running,
  reduce,
  start,
  end,
  from,
  className = "",
  style,
  children,
}: {
  running: boolean;
  reduce: boolean | null;
  start: number;
  end?: number;
  from?: Record<string, number>;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}) {
  const b = beat(start, end, from);
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0 }}
      animate={running ? b.animate : reduce ? { opacity: 1 } : { opacity: 0 }}
      transition={running ? b.transition : { duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// ── Websites: a page assembles itself, then a cursor clicks the CTA ──────────

export function WebsiteDiagram() {
  const { ref, running, reduce } = useLoop();
  const p = { running, reduce };
  return (
    <div ref={ref} className="relative h-full w-full">
      <div className="absolute inset-x-6 bottom-0 top-6 overflow-hidden rounded-t-xl bg-ink-elev/80 ring-1 ring-forest/10">
        <div className="flex items-center gap-1.5 border-b border-forest/10 px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-forest/25" />
          ))}
          <Part {...p} start={0.02} from={{ scaleX: 0.3 }} className="ml-3 h-2 w-28 origin-left rounded-full bg-forest/15" />
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-4 p-4">
          <div className="space-y-2.5">
            <Part {...p} start={0.08} from={{ scaleX: 0.2 }} className="h-3.5 w-[85%] origin-left rounded bg-forest/80" />
            <Part {...p} start={0.13} from={{ scaleX: 0.2 }} className="h-3.5 w-[60%] origin-left rounded bg-accent2" />
            <Part {...p} start={0.19} from={{ scaleX: 0.2 }} className="h-1.5 w-[90%] origin-left rounded bg-forest/25" />
            <Part {...p} start={0.22} from={{ scaleX: 0.2 }} className="h-1.5 w-[70%] origin-left rounded bg-forest/25" />
            <Part {...p} start={0.28} from={{ scale: 0.6 }} className="relative mt-3 h-6 w-20 rounded-full bg-accent">
              {/* click ripple */}
              <Part
                {...p}
                start={0.62}
                end={0.72}
                from={{ scale: 0.4 }}
                className="absolute inset-0 rounded-full ring-4 ring-accent2/50"
              />
            </Part>
          </div>
          <Part {...p} start={0.34} from={{ y: 14 }} className="rounded-lg bg-gradient-to-br from-accent2/50 to-accent/40 ring-1 ring-forest/10" />
        </div>
        <div className="grid grid-cols-3 gap-2 px-4">
          {[0, 1, 2].map((i) => (
            <Part key={i} {...p} start={0.42 + i * 0.05} from={{ y: 16 }} className="h-10 rounded-md bg-forest/10" />
          ))}
        </div>
      </div>

      {/* Cursor */}
      {running && (
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="absolute left-0 top-0 drop-shadow"
          animate={{ x: [260, 260, 92, 92, 92, 260], y: [150, 150, 128, 128, 128, 150], opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.45, 0.6, 0.75, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <path d="M4 3l7 17 2.5-7.5L21 10z" fill="#F1E7D2" stroke="#13291F" strokeWidth="1.5" strokeLinejoin="round" />
        </motion.svg>
      )}
    </div>
  );
}

// ── Apps: a phone swipes between screens, a notification pops ───────────────

export function AppDiagram() {
  const { ref, running, reduce } = useLoop();
  return (
    <div ref={ref} className="relative flex h-full w-full items-end justify-center">
      <div className="relative h-[92%] w-[132px] overflow-hidden rounded-t-[26px] bg-forest p-2 pb-0 ring-1 ring-forest/20">
        <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-ink/30" />
        <div className="h-full overflow-hidden rounded-t-[18px] bg-ink-elev">
          <motion.div
            className="flex h-full w-[300%]"
            animate={running ? { x: ["0%", "0%", "-33.33%", "-33.33%", "-66.66%", "-66.66%", "0%"] } : { x: "0%" }}
            transition={{ duration: CYCLE, times: [0, 0.22, 0.3, 0.52, 0.6, 0.88, 0.96], repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Screen 1: dashboard */}
            <div className="w-1/3 space-y-2 p-2.5">
              <div className="h-2 w-12 rounded bg-forest/60" />
              <div className="h-14 rounded-lg bg-gradient-to-br from-accent2/60 to-accent/50" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-9 rounded-md bg-forest/15" />
                <div className="h-9 rounded-md bg-forest/15" />
              </div>
              <div className="h-1.5 w-full rounded bg-forest/15" />
              <div className="h-1.5 w-2/3 rounded bg-forest/15" />
            </div>
            {/* Screen 2: list */}
            <div className="w-1/3 space-y-2 p-2.5">
              <div className="h-2 w-10 rounded bg-forest/60" />
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="h-6 w-6 rounded-full bg-accent2/50" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-full rounded bg-forest/30" />
                    <div className="h-1.5 w-2/3 rounded bg-forest/15" />
                  </div>
                </div>
              ))}
            </div>
            {/* Screen 3: chart */}
            <div className="w-1/3 p-2.5">
              <div className="mb-3 h-2 w-14 rounded bg-forest/60" />
              <div className="flex h-20 items-end gap-1.5">
                {[40, 65, 50, 85, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 origin-bottom rounded-t bg-accent2"
                    style={{ height: `${h}%` }}
                    animate={running ? { scaleY: [0.3, 0.3, 1, 1, 0.3] } : { scaleY: 1 }}
                    transition={{ duration: CYCLE, times: [0, 0.6, 0.68 + i * 0.02, 0.9, 1], repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      <Part
        running={running}
        reduce={reduce}
        start={0.12}
        end={0.4}
        from={{ x: 24 }}
        className="absolute right-[8%] top-[22%] flex items-center gap-2 rounded-xl bg-ink-elev px-3 py-2 shadow-lg ring-1 ring-forest/10"
      >
        <span className="h-5 w-5 rounded-md bg-accent" />
        <span className="space-y-1">
          <span className="block h-1.5 w-14 rounded bg-forest/60" />
          <span className="block h-1.5 w-9 rounded bg-forest/25" />
        </span>
      </Part>
      <Part
        running={running}
        reduce={reduce}
        start={0.55}
        end={0.85}
        from={{ x: -24 }}
        className="absolute left-[8%] top-[45%] rounded-full bg-accent2 px-3 py-1.5 font-mono text-[0.65rem] font-medium text-night shadow-lg"
      >
        Synced ✓
      </Part>
    </div>
  );
}

// ── AI: your data flows into an agent that answers in chat ───────────────────

export function AIDiagram() {
  const { ref, running, reduce } = useLoop();
  const p = { running, reduce };
  const sources = ["Docs", "CRM", "Slack"];
  return (
    <div ref={ref} className="relative grid h-full w-full grid-cols-[auto_1fr_1.4fr] items-center gap-3 px-6">
      <div className="flex flex-col gap-2.5">
        {sources.map((s, i) => (
          <Part
            key={s}
            {...p}
            start={0.03 + i * 0.05}
            from={{ x: -12 }}
            className="rounded-lg bg-forest/10 px-2.5 py-1.5 font-mono text-[0.65rem] text-forest/80 ring-1 ring-forest/10"
          >
            {s}
          </Part>
        ))}
      </div>

      {/* Flow lines + agent core */}
      <div className="relative flex h-full items-center justify-center">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {[22, 50, 78].map((y, i) => (
            <motion.path
              key={y}
              d={`M0 ${y} C 40 ${y}, 40 50, 72 50`}
              fill="none"
              stroke="#2F6B4F"
              strokeWidth="1.2"
              strokeDasharray="4 5"
              vectorEffect="non-scaling-stroke"
              animate={running ? { strokeDashoffset: [0, -36] } : undefined}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
              opacity={0.7}
            />
          ))}
        </svg>
        <motion.div
          className="relative ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent2 text-night shadow-[0_0_30px_rgba(109,191,132,0.6)]"
          animate={running ? { scale: [1, 1.12, 1] } : undefined}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="currentColor" />
          </svg>
        </motion.div>
      </div>

      {/* Chat */}
      <div className="flex flex-col gap-2">
        <Part {...p} start={0.2} from={{ y: 10 }} className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-forest px-3 py-2 text-[0.68rem] leading-snug text-ink">
          What&apos;s our refund policy?
        </Part>
        <Part {...p} start={0.32} end={0.42} className="flex w-12 gap-1 rounded-2xl rounded-bl-md bg-forest/10 px-3 py-2.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-forest/70"
              animate={running ? { opacity: [0.3, 1, 0.3] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </Part>
        <Part {...p} start={0.44} from={{ y: 10 }} className="max-w-[95%] space-y-1.5 rounded-2xl rounded-bl-md bg-forest/10 px-3 py-2.5">
          <Part {...p} start={0.46} from={{ scaleX: 0 }} className="h-1.5 w-full origin-left rounded bg-forest/60" />
          <Part {...p} start={0.5} from={{ scaleX: 0 }} className="h-1.5 w-[85%] origin-left rounded bg-forest/60" />
          <Part {...p} start={0.54} from={{ scaleX: 0 }} className="h-1.5 w-[55%] origin-left rounded bg-forest/60" />
          <Part {...p} start={0.6} from={{ y: 4 }} className="mt-1 inline-block rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.55rem] text-accent">
            source: Docs
          </Part>
        </Part>
      </div>
    </div>
  );
}

// ── Bundle: three disciplines converge into one team ────────────────────────

export function BundleDiagram({ icons }: { icons: ReactNode[] }) {
  const { ref, running } = useLoop();
  const spread = [
    { x: -90, y: -26 },
    { x: 0, y: -46 },
    { x: 90, y: -26 },
  ];
  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-ink/10 text-accent2 ring-1 ring-ink/15"
          animate={
            running
              ? {
                  x: [spread[i]!.x, spread[i]!.x, 0, 0, spread[i]!.x],
                  y: [spread[i]!.y, spread[i]!.y, 0, 0, spread[i]!.y],
                  scale: [1, 1, 0.6, 0.6, 1],
                  opacity: [1, 1, 0, 0, 1],
                }
              : { x: spread[i]!.x, y: spread[i]!.y }
          }
          transition={{ duration: CYCLE, times: [0, 0.25, 0.42, 0.85, 1], repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        >
          {icon}
        </motion.div>
      ))}
      <motion.div
        className="relative flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-lg italic text-forest shadow-[0_0_40px_rgba(109,191,132,0.5)]"
        animate={running ? { scale: [0.7, 0.7, 1.05, 1, 1, 0.7], opacity: [0, 0, 1, 1, 1, 0] } : { scale: 1, opacity: 1 }}
        transition={{ duration: CYCLE, times: [0, 0.38, 0.48, 0.55, 0.85, 1], repeat: Infinity }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent font-mono text-[0.7rem] not-italic text-ink">Z</span>
        One team
      </motion.div>
    </div>
  );
}
