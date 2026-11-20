import { blogPosts, locations, packages, services } from '#lib/data/site.ts';
import { round3BlogPosts } from '#lib/data/round3.ts';
export const prerender = true;
const base = 'https://florida-shine-car-wash.pages.dev';
export function GET() {
	const staticRoutes = ['', 'packages', 'services', 'memberships', 'gallery', 'book', 'locations', 'about', 'reviews', 'gift-cards', 'faq', 'contact', 'careers', 'privacy', 'terms', 'fleet', 'offers', 'first-visit', 'accessibility', 'account', 'membership-terms', 'track-booking', 'sitemap', 'blog', 'loyalty', 'rain-guarantee', 'ev-and-oversized', 'referral', 'service-area', 'lost-and-found', 'quiz', 'sms-club'];
	const esRoutes = ['es', 'es/packages', 'es/memberships', 'es/book', 'es/locations', ...locations.map((l) => `es/locations/${l.slug}`)];
	const urls = [
		...staticRoutes,
		...esRoutes,
		...packages.map((p) => `packages/${p.slug}`),
		...services.map((s) => `services/${s.slug}`),
		...locations.map((l) => `locations/${l.slug}`),
		...blogPosts.map((b) => `blog/${b.slug}`),
		...round3BlogPosts.map((b) => `blog/${b.slug}`)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${base}/${u}</loc></url>`).join('\n')}\n</urlset>`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
