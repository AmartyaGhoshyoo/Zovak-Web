# Zovak — Website

A marketing site for Zovak, a software studio offering websites, apps, and
AI solutions. Built with **Next.js 14 (App Router)**, **TypeScript**, and
**Tailwind CSS**.

## Getting started

Requires Node.js 18.17 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Start the local dev server            |
| `npm run build`     | Production build                     |
| `npm run start`     | Run the production build locally     |
| `npm run lint`      | Lint with ESLint                     |
| `npm run typecheck` | Type-check the project with `tsc`    |

## Project structure

```
src/
  app/
    layout.tsx       — root layout, fonts, metadata
    page.tsx          — home page, composes all sections
    globals.css        — Tailwind entrypoint + base styles
  components/
    Header.tsx         — sticky nav + mobile menu (client)
    Hero.tsx            — hero section
    Terminal.tsx        — animated terminal, hero's signature element (client)
    TrustedStrip.tsx    — industries strip
    Services.tsx        — services grid
    Work.tsx             — project showcase grid
    Process.tsx          — 4-step process
    Testimonials.tsx     — client quotes
    Contact.tsx           — booking CTA + contact form (client)
    Footer.tsx
    Reveal.tsx            — scroll-in-view animation wrapper (client)
    Button.tsx / Container.tsx — shared UI primitives
    icons/ServiceIcons.tsx
  data/                  — typed content (services, work, process, testimonials)
  types/                 — shared TypeScript interfaces
```

All page content lives in `src/data/*.ts` — edit those files to change
copy without touching component code.

## Things to customize before launch

- **Contact info**: email and phone in `src/components/Contact.tsx`.
- **Social links**: currently `#` placeholders in `Contact.tsx` and `Footer.tsx`.
- **Contact form backend**: `Contact.tsx` has a `TODO` where you should wire
  up a real submission — e.g. [Formspree](https://formspree.io), a Next.js
  [API route](https://nextjs.org/docs/app/building-your-application/routing/route-handlers),
  or your own backend.
- **"Book a call" link**: currently scrolls to the contact form. Swap it for
  a real Calendly/Cal.com link if you want a scheduling widget instead.
- **Work section images**: see `public/work/README.md` — drop screenshots in
  `public/work/` and set the `image` field on the matching entry in
  `src/data/work.ts`. Cards fall back to a gradient placeholder until you do.
- **Testimonials**: `src/data/testimonials.ts` has placeholder quotes —
  replace with real client feedback.

## Deploying

This is a standard Next.js app — deploy it to
[Vercel](https://vercel.com) (zero-config), Netlify, or any Node host.
