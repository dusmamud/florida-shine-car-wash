<script lang="ts">
	import { Search } from '@lucide/svelte';
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { faqs } from '#lib/data/site.ts';
	let query = $state('');
	let category = $state('All');
	const categories = ['All', ...new Set(faqs.map((f) => f.category))];
	const shown = $derived(
		faqs.filter(
			(f) =>
				(category === 'All' || f.category === category) &&
				(!query.trim() || `${f.q} ${f.a}`.toLowerCase().includes(query.trim().toLowerCase()))
		)
	);
</script>
<Seo
	title="FAQs — Florida Shine Car Wash"
	description="Frequently asked questions about Florida Shine Car Wash: wash times, appointments, memberships, rain-checks, vehicle height limits, gift cards and all 8 Florida locations."
	canonical="/faq"
	ogImage="foam-wash"
/>
<PageHero eyebrow="GOOD QUESTIONS" title="Frequently Asked Questions" subtitle="Everything Florida drivers ask us — wash times, appointments, memberships and rainy days." />
<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	<label for="faq-search" class="font-black text-navy">Search questions</label>
	<div class="relative mt-2">
		<Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
		<input id="faq-search" type="search" bind:value={query} placeholder="Try rain, membership or height…" class="min-h-12 w-full rounded-full border-2 border-line bg-white py-3 pl-12 pr-4 text-navy" />
	</div>
	<div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter questions by category">
		{#each categories as c}
			<button type="button" onclick={() => (category = c)} aria-pressed={category === c} class="min-h-12 rounded-full px-5 py-2.5 text-sm font-black {category === c ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-line'}">{c}</button>
		{/each}
	</div>
	<p class="mt-3 text-sm text-muted" role="status">{shown.length} question{shown.length === 1 ? '' : 's'}</p>
	<div class="mt-4">
		<FaqAccordion items={shown} />
	</div>
	{#if shown.length === 0}
		<p class="mt-4 rounded-3xl bg-white p-6 text-muted shadow ring-1 ring-line">No questions match "{query}". Try a different word — or ask us directly below.</p>
	{/if}
	<p class="mt-8 text-center text-muted">Still curious? Call <a class="inline-flex min-h-11 items-center font-bold text-navy" href="tel:+13055550198">(305) 555-0198</a> or <a class="inline-flex min-h-11 items-center font-bold text-navy" href="/contact">send us a message</a>.</p>
</section>
