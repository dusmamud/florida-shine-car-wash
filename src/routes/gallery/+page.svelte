<script lang="ts">
	import BeforeAfter from '#lib/components/BeforeAfter.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { gallery } from '#lib/data/site.ts';
	let filter = $state('All');
	const categories = ['All', ...new Set(gallery.map((g) => g.category))];
	const shown = $derived(filter === 'All' ? gallery : gallery.filter((g) => g.category === filter));
</script>

<svelte:head><title>Gallery — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="THE SHINE, UP CLOSE" title="Gallery" subtitle="Real results from our Florida washes — foam baths, hand wax, ceramic beading and interiors that look brand new." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by service">
		{#each categories as c}
			<button type="button" onclick={() => (filter = c)} aria-pressed={filter === c} class="min-h-12 rounded-full px-5 py-2.5 text-sm font-black {filter === c ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-line'}">{c}</button>
		{/each}
	</div>
	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as item}
			<figure class="overflow-hidden rounded-3xl bg-white shadow ring-1 ring-line">
				<Picture src={item.image} alt={item.alt} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" class="aspect-[4/3] w-full" />
				<figcaption class="flex items-center justify-between gap-2 px-4 py-3">
					<span class="font-bold text-navy">{item.title}</span>
					<span class="shrink-0 rounded-full bg-sky-light px-2.5 py-1 text-xs font-bold text-navy">{item.category}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
	{#if shown.length === 0}<p class="mt-8 text-center text-muted">No photos in this category yet.</p>{/if}
</section>

<section class="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
	<h2 class="text-center font-display text-3xl font-black text-navy">Before &amp; After</h2>
	<p class="mt-2 text-center text-muted">Drag the slider — or use the arrow keys — to compare. The "before" view is the same photo with a dull filter applied, a mock preview.</p>
	<div class="mt-6"><BeforeAfter image="gallery-sedan" alt="Freshly washed red sedan gleaming in the sun" title="Wax & polish on a red sedan" /></div>
	<div class="mt-6"><BeforeAfter image="interior-detail" alt="Spotless car interior being detailed" title="Interior detail" /></div>
</section>
