export const prerender = true;
export function GET() {
	return new Response('User-agent: *\nAllow: /\nSitemap: https://florida-shine-car-wash.pages.dev/sitemap.xml\n', { headers: { 'content-type': 'text/plain' } });
}
