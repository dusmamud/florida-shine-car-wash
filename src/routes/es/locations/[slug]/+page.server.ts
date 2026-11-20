import { error } from '@sveltejs/kit';
import { locations } from '#lib/data/site.ts';
import type { EntryGenerator, PageServerLoad } from './$types';
export const entries: EntryGenerator = () => locations.map((l) => ({ slug: l.slug }));
export const load: PageServerLoad = ({ params }) => {
	const location = locations.find((l) => l.slug === params.slug);
	if (!location) error(404, 'Location not found');
	return { location, others: locations.filter((l) => l.slug !== params.slug) };
};
