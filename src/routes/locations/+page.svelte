<script lang="ts">
	import { Clock, MapPin, Phone, Search } from '@lucide/svelte';
	import FloridaMap from '#lib/components/FloridaMap.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { locations } from '#lib/data/site.ts';
	let query = $state('');
	const shown = $derived(
		locations.filter((l) => !query.trim() || `${l.city} ${l.name} ${l.address} ${l.zip}`.toLowerCase().includes(query.trim().toLowerCase()))
	);
</script>
<svelte:head><title>Locations — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="CLOSE TO YOU" title="Find a Location Near You" subtitle="From Miami to Tampa, we're here to keep Florida shining. 8 locations, open 7 days a week." />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-8 lg:grid-cols-2">
		<FloridaMap />
		<div>
			<label for="loc-search" class="font-black text-navy">Search by city or ZIP</label>
			<div class="relative mt-2">
				<Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
				<input id="loc-search" type="search" bind:value={query} placeholder="Try Miami, Tampa or 33132…" class="min-h-12 w-full rounded-full border-2 border-line bg-white py-3 pl-12 pr-4 text-navy" />
			</div>
			<p class="mt-2 text-sm text-muted" role="status">{shown.length} location{shown.length === 1 ? '' : 's'} found</p>
		</div>
	</div>
	<div class="mt-10 grid gap-6 md:grid-cols-2">
		{#each shown as loc}
			<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<h2 class="font-display text-xl font-black text-navy">{loc.city} — {loc.name}</h2>
				<p class="mt-2 flex items-start gap-2 text-sm text-muted"><MapPin class="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> {loc.address}, {loc.city}, FL {loc.zip}</p>
				<p class="mt-1 flex items-center gap-2 text-sm text-muted"><Phone class="h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> <a href="tel:+1{loc.phone.replace(/[^0-9]/g, '')}" class="font-bold text-navy-light">{loc.phone}</a></p>
				<p class="mt-1 flex items-center gap-2 text-sm text-muted"><Clock class="h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> {loc.hours}</p>
				<div class="mt-3 flex flex-wrap gap-2">{#each loc.features as f}<span class="rounded-full bg-sky-light px-2.5 py-1 text-xs font-bold text-navy">{f}</span>{/each}</div>
				<div class="mt-5 flex gap-2">
					<a href="/locations/{loc.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-navy px-4 py-3 text-sm font-black text-white">LOCATION DETAILS</a>
					<a href="/book?location={loc.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-sun px-4 py-3 text-sm font-black text-navy">BOOK HERE</a>
				</div>
			</article>
		{/each}
		{#if shown.length === 0}
			<p class="rounded-3xl bg-white p-6 text-muted shadow ring-1 ring-line md:col-span-2">No locations match "{query}". Try a nearby city — or call <a class="font-bold text-navy" href="tel:+13055550198">(305) 555-0198</a> and we'll point you to the closest wash.</p>
		{/if}
	</div>
</section>
