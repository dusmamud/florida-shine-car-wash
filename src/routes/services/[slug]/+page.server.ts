import { error } from '@sveltejs/kit';
import { services } from '#lib/data/site.ts';
import type { EntryGenerator, PageServerLoad } from './$types';
export const entries: EntryGenerator = () => services.map((s) => ({ slug: s.slug }));
export const load: PageServerLoad = ({ params }) => {
	const service = services.find((s) => s.slug === params.slug);
	if (!service) error(404, 'Service not found');
	return { service, others: services.filter((s) => s.slug !== params.slug) };
};
