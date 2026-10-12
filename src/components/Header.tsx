"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Container from "./Container";
import Button from "./Button";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // The bar always stays visible; it just gains a solid background once the page moves
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Scroll-spy: highlight the section currently in the middle of the viewport
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    const clearAtTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-border bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="Zovak home" className="shrink-0">
          <Logo />
        </a>

        <nav
          className="hidden items-center md:flex"
          onMouseLeave={() => setHovered(null)}
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              aria-current={active === link.href ? "location" : undefined}
              className={`relative px-4 py-2 text-[0.92rem] transition-colors duration-200 ${
                active === link.href ? "font-medium text-accent" : "text-text-muted hover:text-text"
              }`}
            >
              {hovered === link.href && hovered !== active && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 -z-10 rounded-full bg-text/[0.05]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-accent/10 ring-1 ring-accent/20"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contact" size="sm" className="hidden md:inline-flex">
            Book a call
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-strong md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute block h-px w-4 bg-text"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="absolute block h-px w-4 bg-text"
            />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
            aria-label="Mobile"
          >
            <Container className="flex flex-col py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="border-b border-border py-3.5 font-display text-2xl"
                >
                  {link.label}
                </motion.a>
              ))}
              <Button href="#contact" className="mt-5" onClick={() => setOpen(false)}>
                Book a call
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
