"use client";

import { useRef } from "react";
import { MotionValue, motion, useScroll, useSpring, useTransform } from "motion/react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import { process } from "@/data/process";
import { ProcessStep } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

function Step({
  step,
  index,
  total,
  progress,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each node fills in as the drawn line reaches it
  const at = total > 1 ? index / (total - 1) : 0;
  const fill = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1]);
  const bg = useTransform(fill, [0, 1], ["#E9DCC2", "#2F6B4F"]);
  const color = useTransform(fill, [0, 1], ["#2F6B4F", "#F1E7D2"]);
  const scale = useTransform(fill, [0, 0.6, 1], [1, 1.18, 1]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      className="relative pl-16 lg:pl-0 lg:pt-20"
    >
      <motion.span
        aria-hidden="true"
        style={{ backgroundColor: bg, color, scale }}
        className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent font-mono text-[0.78rem] font-medium shadow-[0_0_0_6px_#E9DCC2]"
      >
        {step.number}
      </motion.span>
      <h3 className="font-display text-[1.6rem] tracking-tight">{step.title}</h3>
      <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-relaxed text-text-muted">{step.description}</p>
    </motion.li>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  // The connecting line draws itself as the steps scroll through the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  return (
    <section id="process" className="relative scroll-mt-16 overflow-hidden bg-ink-soft py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-accent2/25 blur-[130px]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, no surprises"
          description="The same process whether you're commissioning a landing page or a full product."
          className="mb-16 md:mb-20"
        />

        <div ref={ref} className="relative">
          {/* Desktop: horizontal line through the node centres */}
          <div aria-hidden="true" className="absolute left-[22px] right-[10%] top-[21px] hidden h-[2px] rounded-full bg-border-strong lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent2" />
          </div>
          {/* Mobile: vertical line */}
          <div aria-hidden="true" className="absolute bottom-4 left-[21px] top-4 w-[2px] rounded-full bg-border-strong lg:hidden">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-gradient-to-b from-accent to-accent2" />
          </div>

          <ol className="grid grid-cols-1 gap-14 lg:grid-cols-4 lg:gap-8">
            {process.map((step, index) => (
              <Step key={step.number} step={step} index={index} total={process.length} progress={progress} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
