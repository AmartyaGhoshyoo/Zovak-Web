"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TerminalCommand } from "@/types";

const COMMANDS: TerminalCommand[] = [
  { cmd: "zovak build --brand", out: "Identity, type and voice locked in" },
  { cmd: "zovak build --product", out: "MVP ready for investor demos" },
  { cmd: "zovak build --website", out: "Marketing site live on Vercel" },
  { cmd: "zovak deploy --env production", out: "Shipped ✓" },
];

export default function Terminal() {
  const [typed, setTyped] = useState("");
  const [out, setOut] = useState("");
  const [log, setLog] = useState<(TerminalCommand & { id: number })[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setLog(COMMANDS.slice(0, 3).map((c, id) => ({ ...c, id })));
      setTyped(COMMANDS[3]?.cmd ?? "");
      setOut(COMMANDS[3]?.out ?? "");
      return;
    }

    let charTimer: ReturnType<typeof setInterval>;
    let outTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function typeCurrent() {
      const current = COMMANDS[indexRef.current % COMMANDS.length];
      if (!current) return;
      let charIndex = 0;
      setTyped("");
      setOut("");

      charTimer = setInterval(() => {
        charIndex++;
        setTyped(current.cmd.slice(0, charIndex));

        if (charIndex >= current.cmd.length) {
          clearInterval(charTimer);
          outTimer = setTimeout(() => {
            if (!cancelled) setOut(current.out);
          }, 300);
          nextTimer = setTimeout(() => {
            if (cancelled) return;
            const id = indexRef.current;
            setLog((prev) => [...prev.slice(-2), { ...current, id }]);
            indexRef.current += 1;
            typeCurrent();
          }, 2000);
        }
      }, 42);
    }

    const start = setTimeout(typeCurrent, 1400);

    return () => {
      cancelled = true;
      clearTimeout(start);
      clearInterval(charTimer);
      clearTimeout(outTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-forest-deep to-night shadow-[0_1px_0_rgba(241,231,210,0.08)_inset,0_40px_80px_-30px_rgba(31,78,58,0.6)] ring-1 ring-forest/30">
      <div className="flex items-center gap-2 border-b border-night-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        <span className="ml-2 font-mono text-[0.72rem] text-ink/50">zovak — build</span>
      </div>
      {/* Bottom-anchored so older lines scroll up and clip, like a real terminal */}
      <div className="flex h-[260px] flex-col justify-end overflow-hidden px-5 py-5 font-mono text-[0.82rem] leading-relaxed sm:text-[0.85rem]">
        <AnimatePresence initial={false} mode="popLayout">
          {log.map((line) => (
            <motion.div
              key={line.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-3"
            >
              <p className="text-ink/45">$ {line.cmd}</p>
              <p className="text-mint/40">{line.out}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div layout>
          <p className="text-ink">
            <span className="text-accent2">$</span> {typed}
            <span className="animate-blink text-accent2">▍</span>
          </p>
          <p className="min-h-[1.6em] text-accent2">{out}</p>
        </motion.div>
      </div>
    </div>
  );
}
