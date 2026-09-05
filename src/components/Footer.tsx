import Container from "./Container";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border pt-14">
      <Container className="flex flex-wrap items-start justify-between gap-8 pb-8">
        <div>
          <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-[0.95rem] text-ink">
              Z
            </span>
            <span className="font-display italic">Zovak</span>
          </a>
          <p className="mt-2.5 max-w-[240px] text-[0.9rem] text-text-muted">
            Websites, apps, and AI solutions — built to ship.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.92rem] text-text-muted transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-5 text-[0.9rem] text-text-muted">
          <a href="#" className="hover:text-accent2">
            X
          </a>
          <a href="#" className="hover:text-accent2">
            LinkedIn
          </a>
          <a href="#" className="hover:text-accent2">
            Instagram
          </a>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-5">
          <p className="m-0 text-[0.82rem] text-text-faint">
            © {new Date().getFullYear()} Zovak. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
