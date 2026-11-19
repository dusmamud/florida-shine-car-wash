import { error } from '@sveltejs/kit';
import { packages } from '#lib/data/site.ts';
import type { EntryGenerator, PageServerLoad } from './$types';
export const entries: EntryGenerator = () => packages.map((p) => ({ slug: p.slug }));
export const load: PageServerLoad = ({ params }) => {
	const pkg = packages.find((p) => p.slug === params.slug);
	if (!pkg) error(404, 'Package not found');
	return { pkg, others: packages.filter((p) => p.slug !== params.slug) };
};
