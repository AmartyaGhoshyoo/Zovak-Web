"use client";

import { CSSProperties } from "react";
import { WorkItem } from "@/types";

interface WorkCardProps {
  item: WorkItem;
  index: number;
  onOpen: () => void;
}

export default function WorkCard({ item, index, onOpen }: WorkCardProps) {
  const gallery =
    item.images && item.images.length > 0
      ? item.images
      : item.image
        ? [item.image]
        : [];

  const pageImages = gallery.slice(1, 3); // real extra shots, if any exist yet
  const blankPages = Math.max(0, 2 - pageImages.length); // decorative filler pages until more images are added
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="group/card relative">
      {/* Page stack, furthest back first — purely decorative "book page" edges
          that peek out on hover. Real project screenshots (once added via
          `images` in work.ts) replace the blank filler pages automatically. */}
      {Array.from({ length: blankPages }).map((_, i) => {
        const depth = pageImages.length + i; // 0 = closest behind cover
        const rot = depth % 2 === 0 ? -6 - depth * 2 : 6 + depth * 2;
        const restTranslate = depth % 2 === 0 ? "-6px, 8px" : "8px, 10px";
        const hoverTranslate = depth % 2 === 0 ? "-20px, 20px" : "22px, 24px";
        return (
          <div
            key={`blank-${i}`}
            aria-hidden="true"
            style={
              {
                "--rot": `${rot}deg`,
                "--rest": `translate(${restTranslate}) rotate(${rot * 0.5}deg)`,
                "--hover": `translate(${hoverTranslate}) rotate(${rot}deg)`,
              } as CSSProperties
            }
            className="absolute inset-0 rounded-[24px] border border-border-strong bg-ink-elev shadow-[0_20px_45px_-30px_rgba(20,35,28,0.5)] transition-transform duration-500 ease-out [transform:var(--rest)] group-hover/card:[transform:var(--hover)]"
          >
            <div className="absolute inset-4 flex flex-col gap-2 opacity-40">
              <div className="h-1.5 w-2/3 rounded-full bg-text-faint/40" />
              <div className="h-1.5 w-1/2 rounded-full bg-text-faint/30" />
            </div>
          </div>
        );
      })}

      {pageImages.map((src, i) => {
        const depth = i;
        const rot = depth % 2 === 0 ? -7 - depth * 3 : 7 + depth * 3;
        const restTranslate = depth % 2 === 0 ? "-6px, 8px" : "8px, 10px";
        const hoverTranslate = depth % 2 === 0 ? "-22px, 22px" : "24px, 26px";
        return (
          <div
            key={src + i}
            aria-hidden="true"
            style={
              {
                "--rest": `translate(${restTranslate}) rotate(${rot * 0.5}deg)`,
                "--hover": `translate(${hoverTranslate}) rotate(${rot}deg)`,
              } as CSSProperties
            }
            className="absolute inset-0 overflow-hidden rounded-[24px] border border-border-strong shadow-[0_20px_45px_-30px_rgba(20,35,28,0.5)] transition-transform duration-500 ease-out [transform:var(--rest)] group-hover/card:[transform:var(--hover)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover opacity-70 saturate-[0.4] transition-opacity duration-500 group-hover/card:opacity-90"
            />
            <div className="absolute inset-0 bg-[#14231C]/35" />
          </div>
        );
      })}

      {/* Main card */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View gallery for ${item.name || "this project"}`}
        className="group relative block w-full overflow-hidden rounded-[24px] border border-border bg-ink text-left shadow-[0_30px_80px_-45px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_40px_90px_-40px_rgba(47,107,79,0.35)]"
      >
        <div className={`relative overflow-hidden ${item.image ? "" : "aspect-[4/3]"}`}>
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={`${item.name || "Project"} preview`}
              className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-[1.06] ${item.gradient}`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#14231C] via-[#14231C]/45 to-transparent opacity-95" />

          <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#14231C]/60 px-3 py-1.5 font-mono text-[0.7rem] tracking-wide text-white backdrop-blur-sm">
            <span className="text-white/50">{number}</span>
            {item.type}
          </span>

          {gallery.length > 1 && (
            <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-[#14231C]/60 px-3 py-1.5 font-mono text-[0.68rem] tracking-wide text-white backdrop-blur-sm">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1" y="2.5" width="8" height="7" rx="1.2" stroke="currentColor" strokeWidth="1" />
                <path d="M3.2 4.6L4.6 6.2L5.8 5L7.8 7.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {gallery.length}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
            {item.name && (
              <h3 className="font-display text-2xl font-semibold text-white md:text-[1.8rem]">
                {item.name}
              </h3>
            )}
            {item.description && (
              <p className="mt-2 max-w-[36ch] text-[0.92rem] text-white/70">{item.description}</p>
            )}
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-[0.78rem] text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:bg-accent-hover">
              View gallery
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
