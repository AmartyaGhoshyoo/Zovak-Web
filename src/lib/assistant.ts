// ─────────────────────────────────────────────────────────────────────────────
// Assistant backend contract
//
// The chat + voice widget (src/components/assistant/*) only talks to the two
// functions in this file. Both are DEMO implementations right now so the UI
// can be designed and tested without a backend. To go live, replace the
// bodies — the widget won't need to change.
//
//   sendChatMessage   → e.g. POST /api/assistant/chat (LLM call, streaming optional)
//   startVoiceSession → e.g. WebRTC / WebSocket session with a voice provider
// ─────────────────────────────────────────────────────────────────────────────

/** Shows a small "Preview" badge in the widget. Set to false once the backend is live. */
export const ASSISTANT_DEMO = true;

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

/**
 * Send the conversation so far and resolve with the assistant's reply.
 *
 * TODO(backend): replace with something like
 *   const res = await fetch("/api/assistant/chat", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ messages }),
 *   });
 *   return (await res.json()).reply;
 */
export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const last = messages[messages.length - 1]?.content.toLowerCase() ?? "";
  await wait(900 + Math.random() * 700);
  return demoReply(last);
}

export type VoiceState = "idle" | "connecting" | "listening" | "thinking" | "speaking";

export interface VoiceTranscriptEntry {
  role: ChatRole;
  text: string;
}

export interface VoiceSessionHandlers {
  onStateChange: (state: VoiceState) => void;
  onTranscript: (entry: VoiceTranscriptEntry) => void;
}

export interface VoiceSession {
  stop: () => void;
  setMuted: (muted: boolean) => void;
}

/**
 * Start a voice conversation. Call `stop()` to hang up.
 *
 * TODO(backend): connect to your voice provider here (request the mic with
 * navigator.mediaDevices.getUserMedia, open the realtime session, and map its
 * events onto onStateChange / onTranscript).
 */
export function startVoiceSession(handlers: VoiceSessionHandlers): VoiceSession {
  const timers: ReturnType<typeof setTimeout>[] = [];
  let stopped = false;
  let turn = 0;

  const script = [
    "Hi, I'm Zovak's assistant. Tell me a bit about what you're building.",
    "Got it. We usually start with a short discovery call — want me to set one up?",
    "Great. Drop your email in the contact form and the team will reply within one business day.",
  ];

  const at = (ms: number, fn: () => void) => {
    timers.push(setTimeout(() => !stopped && fn(), ms));
  };

  function speak() {
    const line = script[turn % script.length]!;
    turn += 1;
    handlers.onStateChange("speaking");
    handlers.onTranscript({ role: "assistant", text: line });
    at(3800, listen);
  }

  function listen() {
    handlers.onStateChange("listening");
    at(4200, () => {
      handlers.onStateChange("thinking");
      at(1100, speak);
    });
  }

  handlers.onStateChange("connecting");
  at(1200, speak);

  return {
    stop() {
      stopped = true;
      timers.forEach(clearTimeout);
      handlers.onStateChange("idle");
    },
    setMuted() {
      // TODO(backend): mute the outgoing mic track
    },
  };
}

// ── Demo helpers ─────────────────────────────────────────────────────────────

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function demoReply(q: string): string {
  if (/(price|cost|budget|how much)/.test(q)) {
    return "Most projects land between $5k and $50k depending on scope. Share a few details in the contact form and we'll send a clear quote within one business day.";
  }
  if (/(time|long|fast|week|timeline)/.test(q)) {
    return "Typical launches take 2–6 weeks. We work in weekly sprints, so you see real progress every week rather than a big reveal at the end.";
  }
  if (/(service|offer|do you|build|website|app|brand|ai)/.test(q)) {
    return "We handle brand, product and websites for early-stage AI startups — plus AI features like chatbots, internal copilots and automation. One team from idea to launch.";
  }
  if (/(call|demo|meet|book|talk)/.test(q)) {
    return "Happy to set up a call. Use the contact form and pick “Just a demo” — no project details needed.";
  }
  return "Thanks for reaching out! I can answer questions about our services, timelines and pricing — or help you book a call with the team.";
}
