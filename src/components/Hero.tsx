"use client";

import { MouseEvent, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Container from "./Container";
import Button from "./Button";
import Magnetic from "./Magnetic";
import Terminal from "./Terminal";
import { openAssistant } from "./assistant/events";

const ease = [0.22, 1, 0.36, 1] as const;
const ROTATING = ["brands", "products", "websites", "AI agents"];

function RevealWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-top">
            <motion.span
              className={`inline-block ${className}`}
              initial={{ y: "110%", rotate: 4 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 1, delay: delay + i * 0.06, ease }}
            >
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] min-w-[5.6rem] overflow-hidden align-bottom font-medium text-accent">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATING[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-block"
        >
          {ROTATING[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  // Aurora blobs drift slightly with the cursor for depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const blobAx = useTransform(smx, (v) => v * 40);
  const blobAy = useTransform(smy, (v) => v * 30);
  const blobBx = useTransform(smx, (v) => v * -30);
  const blobBy = useTransform(smy, (v) => v * -24);

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section onMouseMove={handleMove} className="relative overflow-hidden">
      {/* Background: grid + drifting green aurora */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_10%,black,transparent)]" />
        <motion.div style={{ x: blobAx, y: blobAy }} className="absolute -right-32 -top-24 h-[520px] w-[520px]">
          <motion.div
            className="h-full w-full rounded-full bg-accent2/35 blur-[110px]"
            animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div style={{ x: blobBx, y: blobBy }} className="absolute -left-40 top-[40%] h-[440px] w-[440px]">
          <motion.div
            className="h-full w-full rounded-full bg-accent/25 blur-[120px]"
            animate={reduce ? undefined : { scale: [1.1, 0.95, 1.1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <Container className="relative pb-24 pt-12 md:pb-32 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-ink-elev/70 py-1.5 pl-2 pr-4 text-[0.85rem] text-text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            For AI startups · Now building <RotatingWord />
          </motion.div>

          <h1 className="font-display text-[2.8rem] font-normal leading-[1.02] tracking-[-0.03em] sm:text-[3.9rem] md:text-[5rem] lg:text-[5.9rem]">
            <span className="sr-only">Make your AI startup impossible to ignore.</span>
            <span aria-hidden="true">
              <RevealWords text="Make your AI startup" delay={0.1} />
              <br />
              <span className="relative inline-block">
                <RevealWords text="impossible to ignore." delay={0.4} className="italic text-accent" />
                <motion.svg
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-[0.28em] w-[96%] text-accent2"
                >
                  <motion.path
                    d="M4 16 C 90 4, 200 4, 396 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 1.2, ease }}
                  />
                </motion.svg>
              </span>
            </span>
          </h1>

        <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="max-w-[460px] text-[1.1rem] leading-relaxed text-text-muted"
          >
            Brand, product and website — designed and shipped by one senior
            team, in weeks not quarters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button href="#contact" arrow>
                Book a call
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button as="button" type="button" variant="ghost" onClick={() => openAssistant("voice")}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Talk to our AI agent
              </Button>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } } }}
            className="mt-12 grid max-w-[460px] grid-cols-3 gap-6 border-t border-border-strong pt-6"
          >
            {[
              ["2–6 wks", "To launch"],
              ["1 team", "Brand to code"],
              ["1 day", "Reply time"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease }}
              >
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-[1.6rem] tracking-tight text-forest">{value}</dd>
                <dd className="mt-0.5 text-[0.82rem] text-text-faint">{label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          style={{ transformPerspective: 1200 }}
          className="relative min-w-0"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Terminal />
          </motion.div>

          {/* Floating proof chips */}
          <FloatingChip className="-left-4 -top-6 sm:-left-8" delay={1.5} float={7}>
            <Check /> Brand system
          </FloatingChip>
          <FloatingChip className="-bottom-6 right-2 sm:-right-6" delay={1.8} float={9}>
            <Check /> Investor-ready site
          </FloatingChip>
        </motion.div>
        </div>
      </Container>
    </section>
  );
}

function FloatingChip({
  children,
  className,
  delay,
  float,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  float: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -float, 0] }}
        transition={{ duration: 5 + float / 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-full border border-accent/20 bg-ink-elev px-4 py-2 text-[0.82rem] font-medium text-forest shadow-[0_14px_30px_-12px_rgba(31,78,58,0.35)]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Check() {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-ink">
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.5 6.5l2.2 2.2L9.5 3.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
