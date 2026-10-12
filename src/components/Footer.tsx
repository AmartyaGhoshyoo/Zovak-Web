"use client";

import { motion } from "motion/react";
import Container from "./Container";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

// TODO: replace "#" with real profile URLs
const SOCIAL_LINKS = [
  { href: "#", label: "X" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
];

const WORDMARK = "Zovak";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/30 blur-[140px]"
      />

      <Container className="relative grid gap-10 pb-10 pt-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-[1.6rem] leading-snug tracking-tight">
            Make your AI startup
            <br />
            <em className="text-accent2">impossible to ignore.</em>
          </p>
          <a
            href="#contact"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent2 px-5 py-2.5 text-[0.9rem] font-medium text-night transition-colors hover:bg-mint"
          >
            Book a call
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-[0.8rem] uppercase tracking-[0.14em] text-ink/40">Sitemap</p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[0.95rem] text-ink/70 transition-colors hover:text-accent2">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-[0.8rem] uppercase tracking-[0.14em] text-ink/40">Follow</p>
          <ul className="space-y-2.5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-[0.95rem] text-ink/70 transition-colors hover:text-accent2">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Oversized wordmark — letters rise in one by one */}
      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <p className="flex justify-center font-display text-[28vw] italic leading-[0.8] tracking-[-0.04em] md:text-[22vw]">
          {WORDMARK.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block bg-gradient-to-b from-forest-soft to-night bg-clip-text pr-[0.04em] text-transparent"
              initial={{ y: "70%", opacity: 0 }}
              whileInView={{ y: "12%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
      </div>

      <Container className="relative flex flex-col justify-between gap-2 border-t border-night-line py-6 text-[0.8rem] text-ink/45 sm:flex-row">
        <p>© {new Date().getFullYear()} Zovak. All rights reserved.</p>
        <a href="#top" className="transition-colors hover:text-accent2">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </Container>
    </footer>
  );
}
