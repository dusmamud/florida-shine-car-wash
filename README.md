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
