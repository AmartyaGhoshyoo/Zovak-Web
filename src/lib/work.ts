import { WorkItem } from "@/types";

// A gallery slide is either a real screenshot or a reserved "coming soon" slot
export type Slide = { kind: "image"; src: string } | { kind: "placeholder"; n: number };

export function projectImages(item: WorkItem): string[] {
  if (item.images?.length) return item.images;
  return item.image ? [item.image] : [];
}

export function projectSlides(item: WorkItem): Slide[] {
  return [
    ...projectImages(item).map((src) => ({ kind: "image" as const, src })),
    ...Array.from({ length: item.upcomingShots ?? 0 }, (_, n) => ({ kind: "placeholder" as const, n })),
  ];
}

export function projectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function projectTitle(item: WorkItem, index: number) {
  return item.name || `Project ${projectNumber(index)}`;
}
