import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined, precompress: false, strict: true }),
			preprocess: vitePreprocess(),
			// Round-2 footer links to next-phase pages (/fleet, /offers, /account, …)
			// 404 until those routes land — warn, don't fail the build, for them only.
			prerender: {
				handleHttpError: ({ path, message }) => {
					const pending = ['/fleet', '/offers', '/first-visit', '/accessibility', '/account', '/track-booking', '/membership-terms', '/sitemap', '/blog', '/loyalty'];
					if (pending.some((p) => path === p || path.startsWith(p + '/'))) {
						console.warn(`Pending next-phase page (expected 404): ${path} — ${message}`);
						return;
					}
					throw new Error(message);
				}
			}
		})
	]
});
