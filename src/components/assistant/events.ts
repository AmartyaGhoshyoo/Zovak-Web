export type AssistantMode = "chat" | "voice";

export const OPEN_ASSISTANT_EVENT = "zovak:open-assistant";

/** Open the floating assistant from anywhere on the page (e.g. a hero CTA). */
export function openAssistant(mode: AssistantMode = "chat") {
  window.dispatchEvent(new CustomEvent<AssistantMode>(OPEN_ASSISTANT_EVENT, { detail: mode }));
}
