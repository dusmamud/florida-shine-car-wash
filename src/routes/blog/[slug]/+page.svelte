<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://florida-shine-car-wash.pages.dev/blog' },
			{ '@type': 'ListItem', position: 3, name: post.title, item: `https://florida-shine-car-wash.pages.dev/blog/${post.slug}` }
		]
	});
</script>

<Seo
	title="{post.title} — Florida Shine Car Wash"
	description={post.excerpt}
	canonical="/blog/{post.slug}"
	ogImage={post.image}
	type="article"
	jsonLd={jsonLd}
/>
<PageHero eyebrow="BLOG · {post.category.toUpperCase()}" title={post.title} subtitle="{post.date} · {post.readTime}" />

<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	<Picture src={post.image} alt={post.title} width={1200} height={800} eager={true} class="overflow-hidden rounded-3xl ring-1 ring-line" />
	<div class="mt-8 space-y-5 leading-relaxed text-muted">
		{#each post.body as para}
			<p>{para}</p>
		{/each}
	</div>
	{#if post.slug === 'ceramic-aftercare'}
		<aside class="mt-8 rounded-3xl bg-navy p-6 text-white">
			<h2 class="font-display text-xl font-black">The honest summary</h2>
			<p class="mt-2 text-sm leading-relaxed text-white/85">Spray ceramic is a top-up that lasts weeks. A professional coating bonds to the paint and lasts up to 12 months. Neither one stops rock chips or makes paint scratch-proof — a coating is a thin chemical layer, not armour.</p>
			<a href="/services/ceramic-coating" class="mt-4 inline-flex min-h-12 items-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">SEE CERAMIC COATING — FROM $199</a>
		</aside>
	{/if}
	<div class="mt-10 border-t border-line pt-8">
		<h2 class="font-display text-2xl font-black text-navy">More car care tips</h2>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			{#each data.others as other}
				<a href="/blog/{other.slug}" class="group block rounded-3xl bg-white p-5 shadow ring-1 ring-line">
					<p class="text-xs font-black tracking-widest text-navy-light">{other.category.toUpperCase()} · {other.date}</p>
					<h3 class="mt-2 font-display text-lg font-black leading-snug text-navy group-hover:underline group-hover:underline-offset-2">{other.title}</h3>
					<p class="mt-1 text-sm text-muted">{other.excerpt}</p>
				</a>
			{/each}
		</div>
		<p class="mt-8 text-center"><a href="/blog" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 text-sm font-black text-navy">← ALL ARTICLES</a></p>
	</div>
</article>
