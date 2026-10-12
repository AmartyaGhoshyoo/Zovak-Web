export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-[0.8rem] font-medium text-ink">
        Z
      </span>
      <span className="font-display text-[1.2rem] italic tracking-tight text-forest">Zovak</span>
    </span>
  );
}
