import { error } from '@sveltejs/kit';
import { blogPosts } from '#lib/data/site.ts';
import type { EntryGenerator, PageServerLoad } from './$types';
export const entries: EntryGenerator = () => blogPosts.map((p) => ({ slug: p.slug }));
export const load: PageServerLoad = ({ params }) => {
	const post = blogPosts.find((p) => p.slug === params.slug);
	if (!post) error(404, 'Post not found');
	return { post, others: blogPosts.filter((p) => p.slug !== params.slug) };
};
