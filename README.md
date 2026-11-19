# Florida Shine Car Wash

Premium car wash & detailing in Florida — frontend-only website (mock data).
Svelte 5 + SvelteKit 3 + Tailwind CSS 4, static prerendered.

Live: https://florida-shine-car-wash.pages.dev

## Pages
Home, Packages (+ detail pages), Services (+ detail pages), Memberships (Unlimited Wash Club),
Gallery (filterable + before/after sliders), Book (4-step mock appointment flow), Locations
(+ detail pages, city/ZIP search), About, Reviews, Gift Cards, FAQ, Contact, Careers,
Privacy, Terms, 404. Sitemap + robots as +server.ts endpoints.

## Develop
```bash
npm install
npm run images   # convert PNG masters in static/images/original/ to AVIF/WebP/JPG
npm run check    # svelte-check, 0 errors
npm run build    # static output in build/
npm run preview
```

## Deploy
Push to `main` deploys via GitHub Actions + wrangler to Cloudflare Pages
(project `florida-shine-car-wash`). Repo secrets required:
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` (added by the user in the GitHub web UI).
Manual deploy: `python3 ~/workspace/custom-connectors/custom.cloudflare/bin/deploy_pages.py . florida-shine-car-wash 12194b4ebc148c425d4d2aca51befc6a main`

All content is mock data in `src/lib/data/site.ts`. No payments are taken anywhere.

## Motion stack
- **Svelte built-ins first** (`svelte/transition`, `svelte/motion` `Tween` for the
  home counters, `prefersReducedMotion` gating) — no extra JS for most motion.
- **GSAP 3.15 + ScrollTrigger-free** — hero entrance timeline only, on the home
  page, dynamically imported. GSAP is 100% free for commercial use since
  v3.13 (Webflow acquisition, 29–30 April 2025) but it is **NOT open source /
  NOT MIT**: Standard "No Charge" licence, IP remains Webflow's. Recorded here
  because the project has no open-source-only mandate; do not re-licence it
  as MIT.
- **Lenis 1.3** (`lenis`, NOT the deprecated `@studio-freight/lenis`) — smooth
  scroll, dynamically imported in `+layout.svelte`, driven by its own rAF loop.
- **Motion 14** (`motion`, vanilla, via `{@attach}`) — press micro-interaction
  on the hero CTA. No `framer-motion` / `motion/react` (React-only).
- **Embla Carousel 8.6** (`embla-carousel-svelte` + `embla-carousel-autoplay`)
  — testimonial carousel (home) and gallery carousel, autoplay 6s, swipe,
  keyboard controls, pause on hover/focus/interaction.
- Every JS animation is gated behind `prefers-reduced-motion` (matchMedia +
  live change listener); autoplay is off under reduced motion and every
  carousel has an explicit pause/play button. Scroll reveals default visible
  (see `Reveal.svelte`) and no GSAP tween ever targets a `.reveal` element.
