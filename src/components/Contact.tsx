"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "./Container";
import Button from "./Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { openAssistant } from "./assistant/events";

const CONTACT_EMAIL = "zovaktech@gmail.com";
const CONTACT_PHONE = "+46 76 899 71 99";

const MODES = [
  { id: "project", label: "Start a project" },
  { id: "demo", label: "Just a demo" },
] as const;

const fieldClass =
  "w-full rounded-xl border border-border-strong bg-ink px-3.5 py-3 text-[0.95rem] text-text placeholder:text-text-faint/80 transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-accent/10";

export default function Contact() {
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // "Book a demo call" from a project's gallery jumps here (href="#contact")
  // and fires this event so the form opens straight into demo mode.
  useEffect(() => {
    function handleDemoRequest() {
      setDemoMode(true);
      document.getElementById("name")?.focus({ preventScroll: true });
    }
    window.addEventListener("zovak:request-demo", handleDemoRequest);
    return () => window.removeEventListener("zovak:request-demo", handleDemoRequest);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const firstName = String(formData.get("name") ?? "").split(" ")[0];
    if (demoMode) formData.set("request-type", "Demo call request");

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", { method: "POST", body: formData });

      if (response.ok) {
        setStatus({
          kind: "ok",
          text: `Thanks${firstName ? ", " + firstName : ""} — we'll reply within one business day.`,
        });
        form.reset();
        setDemoMode(false);
      } else {
        setStatus({ kind: "error", text: `Something went wrong — please email us at ${CONTACT_EMAIL}.` });
      }
    } catch {
      setStatus({ kind: "error", text: `Something went wrong — please email us at ${CONTACT_EMAIL}.` });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] bg-forest p-6 shadow-[0_50px_100px_-50px_rgba(31,78,58,0.7)] sm:p-10 lg:p-14"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent2/30 blur-[120px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute -bottom-32 left-10 h-[360px] w-[360px] rounded-full bg-night/50 blur-[110px]" />
          </div>
          <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                tone="dark"
                eyebrow="Let's talk"
                title="Tell us what you're building."
                description="Send a few details and we'll reply within one business day — or book a quick call to see our work, no project details needed."
              />

              <Reveal delay={120}>
                <dl className="mt-12 space-y-5 border-t border-ink/15 pt-8">
                  <div>
                    <dt className="text-[0.8rem] text-ink/50">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-[1.05rem] text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-accent2">
                        {CONTACT_EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8rem] text-ink/50">Phone</dt>
                    <dd className="mt-1">
                      <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-[1.05rem] text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-accent2">
                        {CONTACT_PHONE}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8rem] text-ink/50">Prefer to ask first?</dt>
                    <dd className="mt-1">
                      <button
                        type="button"
                        onClick={() => openAssistant("chat")}
                        className="cursor-pointer text-[1.05rem] text-accent2 underline decoration-accent2/30 underline-offset-4 transition-colors hover:decoration-accent2"
                      >
                        Chat with our AI assistant →
                      </button>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-border bg-ink-elev p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] md:p-8"
              >
                <div role="radiogroup" aria-label="Request type" className="mb-7 grid grid-cols-2 gap-1 rounded-full bg-ink-soft p-1">
                  {MODES.map((mode) => {
                    const active = (mode.id === "demo") === demoMode;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setDemoMode(mode.id === "demo")}
                        className={`relative cursor-pointer rounded-full py-2.5 text-[0.88rem] font-medium transition-colors duration-200 ${
                          active ? "text-text" : "text-text-faint hover:text-text-muted"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="contact-mode"
                            className="absolute inset-0 rounded-full bg-ink-elev shadow-sm ring-1 ring-border"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className="relative">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[0.82rem] font-medium text-text-muted">
                      Name
                    </label>
                    <input type="text" id="name" name="name" required autoComplete="name" placeholder="Jane Doe" className={fieldClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[0.82rem] font-medium text-text-muted">
                      Email
                    </label>
                    <input type="email" id="email" name="email" required autoComplete="email" placeholder="jane@company.com" className={fieldClass} />
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {!demoMode && (
                    <motion.div
                      key="project-fields"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-4 pt-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="project-type" className="text-[0.82rem] font-medium text-text-muted">
                            Project type
                          </label>
                          <select id="project-type" name="project-type" className={fieldClass}>
                            <option>Brand</option>
                            <option>Website</option>
                            <option>App / product</option>
                            <option>AI solution</option>
                            <option>Something else</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="budget" className="text-[0.82rem] font-medium text-text-muted">
                            Budget
                          </label>
                          <select id="budget" name="budget" className={fieldClass}>
                            <option>Under $5k</option>
                            <option>$5k – $15k</option>
                            <option>$15k – $50k</option>
                            <option>$50k+</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[0.82rem] font-medium text-text-muted">
                    {demoMode ? "Notes (optional)" : "Project details"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required={!demoMode}
                    placeholder={demoMode ? "Anything you'd like to see on the call?" : "What are you trying to build?"}
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                <Button as="button" type="submit" disabled={submitting} className="mt-6 w-full disabled:cursor-wait disabled:opacity-60" arrow={!submitting}>
                  {submitting ? "Sending…" : demoMode ? "Book a demo call" : "Send message"}
                </Button>

                <div role="status" aria-live="polite" className="min-h-[1.5rem]">
                  <AnimatePresence mode="wait">
                    {status && (
                      <motion.p
                        key={status.text}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-3 text-[0.88rem] ${status.kind === "ok" ? "text-accent" : "text-[#A23B2A]"}`}
                      >
                        {status.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </Reveal>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
