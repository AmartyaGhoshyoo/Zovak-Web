"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ASSISTANT_DEMO,
  ChatMessage,
  VoiceSession,
  VoiceState,
  VoiceTranscriptEntry,
  sendChatMessage,
  startVoiceSession,
} from "@/lib/assistant";
import { AssistantMode, OPEN_ASSISTANT_EVENT } from "./events";
import VoiceOrb from "./VoiceOrb";

const ease = [0.22, 1, 0.36, 1] as const;

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content: "Hi! I'm Zovak's assistant. Ask me about our services, timelines or pricing — or I can help you book a call.",
};

const SUGGESTIONS = ["What do you build?", "How long does a project take?", "What does it cost?"];

const VOICE_LABEL: Record<VoiceState, string> = {
  idle: "Tap to start a voice conversation",
  connecting: "Connecting…",
  listening: "Listening…",
  thinking: "Thinking…",
  speaking: "Speaking…",
};

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AssistantMode>("chat");

  // Other components open the widget via openAssistant("chat" | "voice")
  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<AssistantMode>).detail;
      setMode(detail === "voice" ? "voice" : "chat");
      setOpen(true);
    }
    window.addEventListener(OPEN_ASSISTANT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Zovak assistant"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-x-3 bottom-[5.25rem] z-[90] flex h-[min(600px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl border border-border bg-ink-elev shadow-[0_40px_80px_-30px_rgba(18,22,20,0.35)] sm:inset-x-auto sm:right-5 sm:w-[392px]"
          >
            <PanelHeader mode={mode} onModeChange={setMode} onClose={() => setOpen(false)} />
            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {mode === "chat" ? (
                  <motion.div
                    key="chat"
                    className="absolute inset-0 flex flex-col"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ChatView />
                  </motion.div>
                ) : (
                  <motion.div
                    key="voice"
                    className="absolute inset-0 flex flex-col"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.22 }}
                  >
                    <VoiceView />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Launcher open={open} onToggle={() => setOpen((v) => !v)} />
    </>
  );
}

// ── Launcher ─────────────────────────────────────────────────────────────────

function Launcher({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close assistant" : "Open Zovak assistant"}
      aria-expanded={open}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-[90] flex h-12 cursor-pointer items-center gap-2.5 rounded-full bg-text pl-1.5 pr-4 text-[0.88rem] font-medium text-ink shadow-[0_16px_40px_-12px_rgba(18,22,20,0.5)]"
    >
      <span className="relative flex h-9 w-9 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
            >
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.span>
          ) : (
            <motion.span key="orb" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
              <VoiceOrb state="idle" size={34} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {open ? "Close" : "Ask Zovak AI"}
    </motion.button>
  );
}

// ── Header with Chat / Voice switch ──────────────────────────────────────────

function PanelHeader({
  mode,
  onModeChange,
  onClose,
}: {
  mode: AssistantMode;
  onModeChange: (m: AssistantMode) => void;
  onClose: () => void;
}) {
  return (
    <div className="border-b border-border px-4 pb-3 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <VoiceOrb state="idle" size={30} />
          <div>
            <p className="flex items-center gap-2 text-[0.92rem] font-medium">
              Zovak assistant
              {ASSISTANT_DEMO && (
                <span className="rounded-full border border-border-strong px-1.5 py-px text-[0.65rem] font-normal uppercase tracking-wider text-text-faint">
                  Preview
                </span>
              )}
            </p>
            <p className="flex items-center gap-1.5 text-[0.75rem] text-text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent2" /> Online
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close assistant"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-text-faint transition-colors hover:bg-ink-soft hover:text-text"
        >
          <svg width="12" height="12" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div role="tablist" aria-label="Assistant mode" className="mt-3.5 grid grid-cols-2 gap-1 rounded-full bg-ink-soft p-1">
        {(["chat", "voice"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => onModeChange(m)}
            className={`relative flex cursor-pointer items-center justify-center gap-1.5 rounded-full py-2 text-[0.82rem] font-medium transition-colors ${
              mode === m ? "text-text" : "text-text-faint hover:text-text-muted"
            }`}
          >
            {mode === m && (
              <motion.span
                layoutId="assistant-tab"
                className="absolute inset-0 rounded-full bg-ink-elev shadow-sm ring-1 ring-border"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{m === "chat" ? <ChatIcon /> : <MicIcon />}</span>
            <span className="relative capitalize">{m}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Chat ─────────────────────────────────────────────────────────────────────

function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || pending) return;
      const next = [...messages, { id: nextId(), role: "user" as const, content }];
      setMessages(next);
      setInput("");
      setPending(true);
      try {
        const reply = await sendChatMessage(next);
        setMessages((prev) => [...prev, { id: nextId(), role: "assistant", content: reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", content: "Sorry — something went wrong. Please try again, or use the contact form." },
        ]);
      } finally {
        setPending(false);
      }
    },
    [messages, pending]
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              layout="position"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease }}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <p
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[0.9rem] leading-relaxed ${
                  m.role === "user" ? "rounded-br-md bg-text text-ink" : "rounded-bl-md bg-ink-soft text-text"
                }`}
              >
                {m.content}
              </p>
            </motion.div>
          ))}
          {pending && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex"
              aria-label="Assistant is typing"
            >
              <span className="flex gap-1 rounded-2xl rounded-bl-md bg-ink-soft px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-text-faint"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length === 1 && !pending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="cursor-pointer rounded-full border border-border-strong px-3 py-1.5 text-[0.8rem] text-text-muted transition-colors hover:border-text/30 hover:text-text"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border p-3">
        <div className="flex items-end gap-2 rounded-2xl border border-border-strong bg-ink px-3 py-2 transition-colors focus-within:border-accent">
          <label htmlFor="assistant-input" className="sr-only">
            Message
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything…"
            className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-[0.92rem] placeholder:text-text-faint focus:outline-none focus-visible:outline-none"
          />
          <motion.button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || pending}
            whileTap={{ scale: 0.92 }}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-text text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </form>
    </>
  );
}

// ── Voice ────────────────────────────────────────────────────────────────────

function VoiceView() {
  const [state, setState] = useState<VoiceState>("idle");
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState<VoiceTranscriptEntry[]>([]);
  const sessionRef = useRef<VoiceSession | null>(null);
  const active = state !== "idle";

  // Hang up if the panel closes or the visitor switches tabs mid-call
  useEffect(() => () => sessionRef.current?.stop(), []);

  function start() {
    setTranscript([]);
    setMuted(false);
    sessionRef.current = startVoiceSession({
      onStateChange: setState,
      onTranscript: (entry) => setTranscript((prev) => [...prev.slice(-2), entry]),
    });
  }

  function stop() {
    sessionRef.current?.stop();
    sessionRef.current = null;
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    sessionRef.current?.setMuted(next);
  }

  const latest = transcript[transcript.length - 1];

  return (
    <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-8 text-center">
      <button
        type="button"
        onClick={active ? undefined : start}
        aria-label={active ? "Voice session active" : "Start voice conversation"}
        className={active ? "cursor-default" : "cursor-pointer"}
        tabIndex={active ? -1 : 0}
      >
        <VoiceOrb state={state} size={168} />
      </button>

      <AnimatePresence mode="wait">
        <motion.p
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-8 text-[0.95rem] font-medium"
          role="status"
        >
          {VOICE_LABEL[state]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-3 min-h-[4.5rem] w-full">
        <AnimatePresence mode="wait">
          {latest ? (
            <motion.p
              key={transcript.length}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[0.88rem] leading-relaxed text-text-muted"
            >
              {latest.text}
            </motion.p>
          ) : (
            !active && (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[0.85rem] leading-relaxed text-text-faint">
                Talk through your idea out loud — we&apos;ll summarise it and help you book a call.
              </motion.p>
            )
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto flex items-center gap-3">
        <AnimatePresence>
          {active && (
            <motion.button
              type="button"
              onClick={toggleMute}
              aria-pressed={muted}
              aria-label={muted ? "Unmute microphone" : "Mute microphone"}
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 48 }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              className={`flex h-12 cursor-pointer items-center justify-center rounded-full border transition-colors ${
                muted ? "border-text bg-text text-ink" : "border-border-strong text-text hover:bg-ink-soft"
              }`}
            >
              <MicIcon off={muted} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          layout
          onClick={active ? stop : start}
          whileTap={{ scale: 0.96 }}
          className={`flex h-12 cursor-pointer items-center gap-2 rounded-full px-6 text-[0.9rem] font-medium transition-colors ${
            active ? "bg-[#A23B2A] text-white hover:bg-[#8C3223]" : "bg-text text-ink hover:bg-black"
          }`}
        >
          {active ? (
            <>
              <PhoneIcon /> End call
            </>
          ) : (
            <>
              <MicIcon /> Start talking
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon({ off = false }: { off?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {off && <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="rotate-[135deg]">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
