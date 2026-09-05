import { SVGProps } from "react";
import { ServiceIcon } from "@/types";

function WebGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="5" y="9" width="38" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 17H43" stroke="currentColor" strokeWidth="2" />
      <circle cx="11" cy="13" r="1.4" fill="currentColor" />
      <circle cx="16" cy="13" r="1.4" fill="currentColor" />
    </svg>
  );
}

function AppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="14" y="4" width="20" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M14 36H34" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="40" r="1.6" fill="currentColor" />
    </svg>
  );
}

function AiGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M24 4V13M24 35V44M4 24H13M35 24H44M10 10L16 16M32 32L38 38M38 10L32 16M16 32L10 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: Record<ServiceIcon, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  web: WebGlyph,
  app: AppGlyph,
  ai: AiGlyph,
};

export function ServiceGlyph({
  icon,
  className,
}: {
  icon: ServiceIcon;
  className?: string;
}) {
  const Glyph = ICONS[icon];
  return <Glyph className={className} />;
}
