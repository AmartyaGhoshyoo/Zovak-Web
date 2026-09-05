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
  image?: string; // path under /public, e.g. "/work/orbit.jpg" — takes priority over gradient
  href?: string; // link to the live site or case study; omit or use "#" if none yet
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
