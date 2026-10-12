import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "dark" | "light";
type Size = "md" | "sm";

const base =
  "group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-hover",
  dark: "bg-text text-ink hover:bg-black",
  light: "bg-accent2 text-night hover:bg-mint", // for use on forest-green sections
  ghost: "bg-transparent text-text border border-border-strong hover:border-text/40 hover:bg-ink-elev",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.95rem]",
  sm: "h-9 px-4 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
}

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; as?: "a" };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" };

type ButtonProps = LinkButtonProps | NativeButtonProps;

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5"
    >
      →
    </span>
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children, arrow = false } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.as === "button") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, arrow: _a, ...rest } = props;
    return (
      <button className={classes} {...rest}>
        {children}
        {arrow && <Arrow />}
      </button>
    );
  }

  const { href, as: _as, variant: _v, size: _s, className: _c, children: _ch, arrow: _a, ...rest } =
    props as LinkButtonProps;

  return (
    <a href={href} className={classes} {...rest}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}
