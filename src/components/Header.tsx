"use client";

import { useState } from "react";
import Container from "./Container";
import Button from "./Button";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-md"
    >
      <Container className="flex h-[64px] items-center justify-between gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-[0.95rem] text-ink">
            Z
          </span>
          <span className="font-display italic">Zovak</span>
        </a>

        <div className="flex items-center gap-3.5 md:gap-8">
          <nav
            className={`${
              open ? "flex" : "hidden"
            } absolute left-0 right-0 top-[64px] flex-col gap-0 border-b border-border bg-ink px-6 pb-4 pt-2 md:static md:flex md:flex-row md:items-center md:gap-7 md:border-none md:bg-transparent md:p-0`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="relative w-full py-2.5 text-[0.95rem] font-medium text-text-muted transition-colors hover:text-text md:w-auto md:py-0 md:after:absolute md:after:-bottom-1 md:after:left-0 md:after:h-px md:after:w-0 md:after:bg-accent md:after:transition-all md:after:duration-300 md:hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            <Button href="#contact" size="sm" className="hidden md:inline-flex">
              Book a call
            </Button>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg border border-border-strong md:hidden"
            >
              <span
                className={`block h-0.5 w-4 rounded bg-text transition-transform ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 rounded bg-text transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 rounded bg-text transition-transform ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
