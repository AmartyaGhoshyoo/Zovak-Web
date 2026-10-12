"use client";

import { MouseEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { services } from "@/data/services";
import { ServiceGlyph } from "./icons/ServiceIcons";
import { AIDiagram, AppDiagram, BundleDiagram, WebsiteDiagram } from "./services/Diagrams";
import { ServiceIcon } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

const DIAGRAMS: Record<ServiceIcon, () => JSX.Element> = {
  web: WebsiteDiagram,
  app: AppDiagram,
  ai: AIDiagram,
};

// Bento spans on a 6-column grid: wide · narrow / half · half(bundle)
const SPANS = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-3"];

function BentoCard({
  index,
  className = "",
  tone = "light",
  visual,
  children,
}: {
  index: number;
  className?: string;
  tone?: "light" | "dark"; // "dark" = the single forest-green accent tile
  visual: ReactNode;
  children: ReactNode;
}) {
  const dark = tone === "dark";
  // Soft spotlight that follows the pointer across the card and its border
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${
    dark ? "rgba(109,191,132,0.16)" : "rgba(109,191,132,0.12)"
  }, transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, ${
    dark ? "rgba(207,232,201,0.7)" : "rgba(47,107,79,0.55)"
  }, transparent 70%)`;

  function handleMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-[22px] p-px shadow-[0_30px_60px_-45px_rgba(31,78,58,0.45)] ${className}`}
    >
      <div aria-hidden="true" className={`absolute inset-0 rounded-[22px] ${dark ? "bg-forest" : "bg-border-strong"}`} />
      <motion.div aria-hidden="true" className="absolute inset-0 rounded-[22px]" style={{ background: borderGlow }} />

      <div className={`relative flex h-full flex-col overflow-hidden rounded-[21px] ${dark ? "bg-forest" : "bg-ink-elev"}`}>
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
        <div
          aria-hidden="true"
          className={`relative h-[220px] overflow-hidden ${
            dark
              ? "border-b border-ink/10 bg-[radial-gradient(ellipse_at_top,rgba(109,191,132,0.25),transparent_70%)]"
              : "m-2 mb-0 rounded-[16px] bg-[linear-gradient(160deg,#E4ECD9_0%,#EFEBDD_100%)] ring-1 ring-forest/5"
          }`}
        >
          {visual}
        </div>
        <div className="relative flex flex-1 flex-col p-7">{children}</div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-16 overflow-hidden border-t border-border py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-accent2/15 blur-[130px]" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="What we do"
          title="Three ways we help you ship"
          description="Pick one, or bundle all three — the same team carries the thread from idea to launch."
          className="mb-14 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((service, index) => {
            const Diagram = DIAGRAMS[service.icon];
            return (
              <BentoCard
                key={service.title}
                index={index}
                className={`${SPANS[index] ?? "lg:col-span-3"} ${index === 0 ? "md:col-span-2" : ""}`}
                visual={<Diagram />}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 transition-transform duration-500 group-hover:-rotate-6">
                    <ServiceGlyph icon={service.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[1.7rem] tracking-tight">{service.title}</h3>
                  <span className="ml-auto font-mono text-[0.75rem] text-text-faint">0{index + 1}</span>
                </div>
                <p className="mt-4 max-w-[52ch] text-[0.95rem] leading-relaxed text-text-muted">{service.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border-strong px-2.5 py-1 text-[0.75rem] text-text-muted transition-colors duration-300 group-hover:border-accent/30"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            );
          })}

          <BentoCard
            index={services.length}
            tone="dark"
            className="md:col-span-2 lg:col-span-3"
            visual={
              <BundleDiagram
                icons={services.map((s) => (
                  <ServiceGlyph key={s.icon} icon={s.icon} className="h-5 w-5" />
                ))}
              />
            }
          >
            <h3 className="font-display text-[1.7rem] tracking-tight text-ink">Or bundle all three</h3>
            <p className="mt-4 max-w-[48ch] text-[0.95rem] leading-relaxed text-ink/65">
              Brand, product and website from one senior team — no hand-offs
              between agencies, one consistent story from pitch deck to launch.
            </p>
            <div className="mt-auto pt-6">
              <Button href="#contact" variant="light" arrow>
                Plan your launch
              </Button>
            </div>
          </BentoCard>
        </div>
      </Container>
    </section>
  );
}
