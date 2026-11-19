<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { blogPosts } from '#lib/data/site.ts';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://florida-shine-car-wash.pages.dev/blog' }
		]
	};
</script>

<Seo
	title="Blog — Car Care Tips — Florida Shine Car Wash"
	description="Florida car care tips from Florida Shine: love bug season paint protection, salt air and hard water care, and honest ceramic coating aftercare."
	canonical="/blog"
	ogImage="blog-lovebugs"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="BLOG"
	title="Car Care Tips for Florida Drivers"
	subtitle="Love bugs, salt air, hard water and ceramic coatings — practical advice from the team that washes Florida cars every day."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each blogPosts as post}
			<article class="flex flex-col overflow-hidden rounded-3xl bg-white shadow ring-1 ring-line">
				<a href="/blog/{post.slug}" class="block" aria-label={post.title}>
					<Picture src={post.image} alt={post.title} width={1200} height={800} class="block aspect-[3/2]" />
				</a>
				<div class="flex flex-1 flex-col p-6">
					<p class="text-xs font-black tracking-widest text-navy-light">{post.category.toUpperCase()} · {post.date} · {post.readTime}</p>
					<h2 class="mt-2 font-display text-xl font-black leading-snug text-navy"><a href="/blog/{post.slug}" class="hover:underline hover:underline-offset-2">{post.title}</a></h2>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
					<a href="/blog/{post.slug}" class="mt-4 inline-flex min-h-12 items-center font-black text-navy">READ THE ARTICLE →</a>
				</div>
			</article>
		{/each}
	</div>
</section>
