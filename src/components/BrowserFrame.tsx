import { ReactNode } from "react";

// Minimal browser chrome around project screenshots so they read as live
// products rather than loose images.
export default function BrowserFrame({
  children,
  url,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  url: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`overflow-hidden rounded-2xl ring-1 ${
        dark ? "bg-night ring-night-line" : "bg-ink-elev ring-border-strong"
      } ${className}`}
    >
      <div className={`flex items-center gap-3 px-4 py-2.5 ${dark ? "border-b border-night-line" : "border-b border-border"}`}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-ink/20" : "bg-forest/15"}`} />
          ))}
        </div>
        <div
          className={`mx-auto flex max-w-[60%] flex-1 items-center justify-center gap-1.5 truncate rounded-full px-3 py-1 font-mono text-[0.68rem] ${
            dark ? "bg-ink/10 text-ink/60" : "bg-ink-soft text-text-faint"
          }`}
        >
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {url}
        </div>
        <div className="w-[38px]" />
      </div>
      {children}
    </div>
  );
}
