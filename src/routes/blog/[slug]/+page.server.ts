import { error } from '@sveltejs/kit';
import { blogPosts } from '#lib/data/site.ts';
import { round3BlogPosts } from '#lib/data/round3.ts';
import type { EntryGenerator, PageServerLoad } from './$types';
// Round-3 (Worker B): the 2 new posts live in round3.ts, not site.ts.
const allPosts = [...blogPosts, ...round3BlogPosts];
export const entries: EntryGenerator = () => allPosts.map((p) => ({ slug: p.slug }));
export const load: PageServerLoad = ({ params }) => {
	const post = allPosts.find((p) => p.slug === params.slug);
	if (!post) error(404, 'Post not found');
	return { post, others: allPosts.filter((p) => p.slug !== params.slug) };
};
