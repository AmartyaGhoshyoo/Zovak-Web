export type ServiceIcon = "web" | "app" | "ai";

export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
  tags: string[];
}

export type WorkType = "Website" | "Web App" | "Mobile App" | "AI Solution";

export interface WorkItem {
  name: string;
  type: WorkType;
  description: string;
  gradient: string; // Tailwind gradient utility classes — used as a fallback when no image is set
  image?: string; // path under /public, e.g. "/work/orbit.jpg" — cover image, takes priority over gradient
  images?: string[]; // full gallery for this project, e.g. 4-5 shots: hero, detail views, mobile, etc.
  href?: string; // anchor to scroll to (e.g. "#contact") when there's no live site yet
  liveUrl?: string; // full https URL to the live/deployed site — when set, the
  // gallery's CTA becomes "View live site" and opens this in a new tab.
  // Leave unset and the CTA becomes "Book a demo call", linking to `href`.
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface TerminalCommand {
  cmd: string;
  out: string;
}
