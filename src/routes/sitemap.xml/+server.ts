import { locations, packages, services } from '#lib/data/site.ts';
export const prerender = true;
const base = 'https://florida-shine-car-wash.pages.dev';
export function GET() {
	const staticRoutes = ['', 'packages', 'services', 'memberships', 'gallery', 'book', 'locations', 'about', 'reviews', 'gift-cards', 'faq', 'contact', 'careers', 'privacy', 'terms'];
	const urls = [
		...staticRoutes,
		...packages.map((p) => `packages/${p.slug}`),
		...services.map((s) => `services/${s.slug}`),
		...locations.map((l) => `locations/${l.slug}`)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${base}/${u}</loc></url>`).join('\n')}\n</urlset>`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
