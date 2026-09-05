"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Reveal from "./Reveal";

// TODO: replace with your own Formspree form ID (formspree.io — free tier).
// Sign up, create a form, and swap this endpoint. Until you do, submissions
// will fail gracefully and point the visitor to the email address instead.
// const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact() {
  const [status, setStatus] = useState("");
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
      setStatus("Please fill in all required fields.");
      return;
    }

    const formData = new FormData(form);
    const firstName = String(formData.get("name") ?? "").split(" ")[0];
    if (demoMode) formData.set("request-type", "Demo call request");

    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus(
          `Thanks${firstName ? ", " + firstName : ""} — we'll reply within one business day.`
        );
        form.reset();
        setDemoMode(false);
      } else {
        setStatus(
          "Something went wrong on our end — please email us directly at zovaktech@gmail.com."
        );
      }
    } catch {
      setStatus(
        "Something went wrong on our end — please email us directly at zovaktech@gmail.com."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-10 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[110px] animate-pulse-glow motion-reduce:animate-none"
      />

      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-ink-soft p-7 shadow-[0_40px_90px_-50px_rgba(60,45,20,0.14)] md:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-accent2/10 blur-[80px]"
          />

          <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal direction="left">
              <p className="mb-3.5 font-mono text-[0.8rem] text-accent2">// let&apos;s talk</p>
              <h2 className="mb-4 font-display text-[1.9rem] font-semibold tracking-tight md:text-[2.75rem]">
                Tell us what you&apos;re building.
              </h2>
              <p className="mb-8 max-w-[440px] text-[1.02rem] text-text-muted">
                Send a few details and we&apos;ll reply within one business day
                — or just book a quick call to see our work, no project
                details needed.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-3 max-w-[380px]">
                <div className="rounded-xl border border-border bg-ink px-4 py-3">
                  <p className="font-mono text-[0.7rem] text-text-faint">Reply time</p>
                  <p className="mt-1 font-display text-lg font-semibold">1 business day</p>
                </div>
                <div className="rounded-xl border border-border bg-ink px-4 py-3">
                  <p className="font-mono text-[0.7rem] text-text-faint">Kickoff</p>
                  <p className="mt-1 font-display text-lg font-semibold">This week</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 font-mono text-[0.95rem]">
                <a href="mailto:zovaktech@gmail.com" className="transition-colors hover:text-accent2">
                  zovaktech@gmail.com
                </a>
                <a href="tel:+46 76 899 71 99" className="transition-colors hover:text-accent2">
                +46 76 899 71 99
                </a>
              </div>
            </Reveal>

            <Reveal delay={140} direction="right">
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border-strong bg-ink p-6 md:p-7"
              >
                <label
                  htmlFor="demo-mode"
                  className="mb-5 flex cursor-pointer items-start gap-3 rounded-xl border border-border-strong bg-ink-elev p-3.5 transition-colors duration-200 hover:border-accent/50"
                >
                  <input
                    type="checkbox"
                    id="demo-mode"
                    checked={demoMode}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDemoMode(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <span className="text-[0.85rem] text-text-muted">
                    <span className="font-semibold text-text">
                      I just want to see a demo
                    </span>{" "}
                    — skip the project type and budget, we&apos;ll cover that
                    on the call.
                  </span>
                </label>

                <div className="mb-4 flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.82rem] text-text-muted">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="rounded-lg border border-border-strong bg-ink-elev px-3 py-2.5 text-[0.95rem] text-text placeholder:text-text-faint transition-colors duration-200 focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="mb-4 flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.82rem] text-text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="rounded-lg border border-border-strong bg-ink-elev px-3 py-2.5 text-[0.95rem] text-text placeholder:text-text-faint transition-colors duration-200 focus:border-accent focus:outline-none"
                  />
                </div>

                {!demoMode && (
                  <div className="mb-4 flex flex-col gap-3.5 sm:flex-row">
                    <div className="flex flex-1 flex-col gap-1.5">
                      <label htmlFor="project-type" className="text-[0.82rem] text-text-muted">
                        Project type
                      </label>
                      <select
                        id="project-type"
                        name="project-type"
                        className="rounded-lg border border-border-strong bg-ink-elev px-3 py-2.5 text-[0.95rem] text-text transition-colors duration-200 focus:border-accent focus:outline-none"
                      >
                        <option>Website</option>
                        <option>App</option>
                        <option>AI solution</option>
                        <option>Something else</option>
                      </select>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <label htmlFor="budget" className="text-[0.82rem] text-text-muted">
                        Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="rounded-lg border border-border-strong bg-ink-elev px-3 py-2.5 text-[0.95rem] text-text transition-colors duration-200 focus:border-accent focus:outline-none"
                      >
                        <option>Under $5k</option>
                        <option>$5k – $15k</option>
                        <option>$15k – $50k</option>
                        <option>$50k+</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="mb-4 flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[0.82rem] text-text-muted">
                    {demoMode ? "Notes (optional)" : "Project details"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required={!demoMode}
                    placeholder={
                      demoMode
                        ? "Any specific projects you'd like to see on the call?"
                        : "What are you trying to build?"
                    }
                    className="resize-y rounded-lg border border-border-strong bg-ink-elev px-3 py-2.5 text-[0.95rem] text-text placeholder:text-text-faint transition-colors duration-200 focus:border-accent focus:outline-none"
                  />
                </div>

                <Button
                  as="button"
                  type="submit"
                  disabled={submitting}
                  className="mt-1.5 w-full justify-center disabled:opacity-60"
                >
                  {submitting
                    ? "Sending..."
                    : demoMode
                      ? "Book a demo call"
                      : "Send message"}
                </Button>

                <p className="mt-2.5 min-h-[1.2em] text-[0.85rem] text-accent2" role="status">
                  {status}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
