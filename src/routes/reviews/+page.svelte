<script lang="ts">
	import { Star } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { locations, ratingSummary, reviews, reviewSources, services } from '#lib/data/site.ts';

	let locFilter = $state('all');
	let svcFilter = $state('all');
	const shown = $derived(
		reviews.filter((r) => (locFilter === 'all' || r.location === locFilter) && (svcFilter === 'all' || r.service === svcFilter))
	);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://florida-shine-car-wash.pages.dev/reviews' }
		]
	};
</script>
<Seo
	title="Reviews — Florida Shine Car Wash"
	description="Florida Shine Car Wash reviews: 4.8 out of 5 from 2,400+ Google reviews. Read 6 featured reviews from Miami, Tampa, Orlando and more — filter by location or service."
	canonical="/reviews"
	ogImage="club-car"
	jsonLd={jsonLd}
/>
<PageHero eyebrow="WHAT DRIVERS SAY" title="Customer Reviews" subtitle="Featured mock reviews from Florida drivers — 6 featured reviews, below. Our Google rating is 4.8 out of 5 from 2,400+ Google reviews." />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mx-auto max-w-md rounded-3xl bg-navy p-6 text-center text-white shadow-xl">
		<p class="font-display text-5xl font-black text-sun">{ratingSummary.average} <span class="text-2xl">/ 5</span></p>
		<p class="mt-2 flex justify-center gap-0.5 text-sun" aria-hidden="true">{#each Array(5) as _}<Star class="h-5 w-5 fill-current" />{/each}</p>
		<p class="mt-2 text-sm text-white/80">{ratingSummary.average} out of 5 from {ratingSummary.totalReviews.toLocaleString('en-US')}+ {ratingSummary.source} · {ratingSummary.featuredCount} featured mock reviews below</p>
	</div>

	<div class="mt-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter reviews by location">
		<button type="button" onclick={() => (locFilter = 'all')} aria-pressed={locFilter === 'all'} class="min-h-12 rounded-full px-5 py-2.5 text-sm font-black {locFilter === 'all' ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-line'}">All locations</button>
		{#each locations as l}
			<button type="button" onclick={() => (locFilter = l.slug)} aria-pressed={locFilter === l.slug} class="min-h-12 rounded-full px-5 py-2.5 text-sm font-black {locFilter === l.slug ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-line'}">{l.name}</button>
		{/each}
	</div>
	<div class="mt-3 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter reviews by service">
		<button type="button" onclick={() => (svcFilter = 'all')} aria-pressed={svcFilter === 'all'} class="min-h-12 rounded-full px-5 py-2.5 text-sm font-black {svcFilter === 'all' ? 'bg-sun text-navy' : 'bg-white text-navy ring-1 ring-line'}">All services</button>
		{#each [...new Set(reviews.map((r) => r.service))] as s}
			<button type="button" onclick={() => (svcFilter = s)} aria-pressed={svcFilter === s} class="min-h-12 rounded-full px-5 py-2.5 text-sm font-black {svcFilter === s ? 'bg-sun text-navy' : 'bg-white text-navy ring-1 ring-line'}">{s}</button>
		{/each}
	</div>

	<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each shown as r}
			<blockquote class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<p class="flex gap-0.5 text-sun" aria-label="{r.rating} out of 5 stars">{#each Array(r.rating) as _}<Star class="h-4 w-4 fill-current" aria-hidden="true" />{/each}</p>
				<p class="mt-3 leading-relaxed">"{r.text}"</p>
				<footer class="mt-4 text-sm"><strong class="text-navy">{r.name}</strong> <span class="text-muted">· {r.city} · {r.service} · {r.date}</span></footer>
			</blockquote>
		{/each}
		{#if shown.length === 0}
			<p class="rounded-3xl bg-white p-6 text-muted shadow ring-1 ring-line md:col-span-2 lg:col-span-3">No featured reviews match those filters yet — try a different location or service.</p>
		{/if}
	</div>

	<div class="mt-10 rounded-3xl bg-white p-6 text-center shadow ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-black text-navy">Washed with us? Tell Florida.</h2>
		<p class="mx-auto mt-2 max-w-xl text-muted">Leave a review on our Google profile — it takes a minute and it helps other drivers find us.</p>
		<div class="mt-5 flex flex-wrap justify-center gap-3">
			<a href={reviewSources.googleUrl} target="_blank" rel="noopener" class="inline-flex min-h-12 items-center rounded-full bg-sun px-8 py-3 font-black text-navy">Write a review on Google</a>
			<a href="mailto:hello@floridashinecarwash.com?subject=My%20Florida%20Shine%20review" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-8 py-3 font-black text-navy">Email us your review</a>
		</div>
		<p class="mt-4 text-sm text-muted">The 6 reviews above are featured mock reviews for this demo site.</p>
	</div>

	<p class="mt-10 text-center"><a href="/book" class="inline-flex min-h-12 items-center rounded-full bg-sun px-8 py-3 font-black text-navy">Experience it yourself — book a wash</a></p>
</section>
