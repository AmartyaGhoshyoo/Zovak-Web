import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  tone?: "light" | "dark"; // "dark" = on a forest-green section
}

export default function SectionHeading({ eyebrow, title, description, className = "", tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={`max-w-[640px] ${className}`}>
      <p
        className={`mb-5 flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] ${
          dark ? "text-accent2" : "text-accent"
        }`}
      >
        <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-accent2/70" : "bg-accent/60"}`} />
        {eyebrow}
      </p>
      <h2
        className={`font-display text-[2.2rem] font-normal leading-[1.08] tracking-[-0.02em] md:text-[3.2rem] ${
          dark ? "text-ink" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-[520px] text-[1.02rem] leading-relaxed ${dark ? "text-ink/70" : "text-text-muted"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
