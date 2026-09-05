import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

const base =
  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-hover",
  ghost: "bg-transparent text-text border border-border-strong hover:border-accent2 hover:text-accent2",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-[13px] text-[0.95rem]",
  sm: "px-[18px] py-[9px] text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; as?: "a" };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" };

type ButtonProps = LinkButtonProps | NativeButtonProps;

function Shine({ variant }: { variant: Variant }) {
  if (variant !== "primary") return null;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 w-10 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-shine"
    />
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.as === "button") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <button className={classes} {...rest}>
        <Shine variant={variant} />
        <span className="relative">{children}</span>
      </button>
    );
  }

  const { href, as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as LinkButtonProps;

  return (
    <a href={href} className={classes} {...rest}>
      <Shine variant={variant} />
      <span className="relative">{children}</span>
    </a>
  );
}
