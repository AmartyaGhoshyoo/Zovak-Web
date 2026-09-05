"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalCommand } from "@/types";

const COMMANDS: TerminalCommand[] = [
  { cmd: "zovak build --type website", out: "Shipping a marketing site..." },
  { cmd: "zovak build --type app", out: "Shipping a mobile app..." },
  { cmd: "zovak build --type ai-agent", out: "Training on your docs..." },
  { cmd: "zovak deploy --env production", out: "Live in production \u2713" },
];

export default function Terminal() {
  const [typed, setTyped] = useState("");
  const [out, setOut] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTyped(COMMANDS[0]?.cmd ?? "");
      setOut(COMMANDS[0]?.out ?? "");
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
          }, 250);
          nextTimer = setTimeout(() => {
            if (cancelled) return;
            setLog((prev) => [...prev.slice(-3), `$ ${current.cmd}`]);
            indexRef.current += 1;
            typeCurrent();
          }, 2200);
        }
      }, 45);
    }

    typeCurrent();

    return () => {
      cancelled = true;
      clearInterval(charTimer);
      clearTimeout(outTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-accent to-[#1F4E3A] shadow-[0_40px_90px_-30px_rgba(47,107,79,0.4)] animate-terminal-glow">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-xs text-ink/55">zovak — build</span>
      </div>
      <div className="min-h-[280px] px-5 py-6 font-mono text-[0.92rem] md:min-h-[320px]">
        {log.map((line, i) => (
          <p key={`${line}-${i}`} className="mb-1.5 text-ink/45">
            {line}
          </p>
        ))}
        <p className="mb-2.5 text-ink">
          <span className="text-accent2">$</span> {typed}
          <span className="animate-blink text-accent2">▍</span>
        </p>
        <p className="text-[0.85rem] text-accent2/90">{out}</p>
      </div>
    </div>
  );
}
