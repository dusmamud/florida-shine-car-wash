<script lang="ts">
	import { Clock, MapPin, Phone, Search } from '@lucide/svelte';
	import FloridaMap from '#lib/components/FloridaMap.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { locations } from '#lib/data/site.ts';
	let query = $state('');
	const shown = $derived(
		locations.filter((l) => !query.trim() || `${l.city} ${l.name} ${l.address} ${l.zip}`.toLowerCase().includes(query.trim().toLowerCase()))
	);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://florida-shine-car-wash.pages.dev/locations' }
		]
	};
</script>
<Seo
	title="Locations — Florida Shine Car Wash"
	description="8 Florida Shine Car Wash locations from Miami to Jacksonville — Miami, Tampa, Orlando, Fort Lauderdale, Naples and Sarasota. Soft-touch tunnel, free vacuums, open 7 days a week."
	canonical="/locations"
	ogImage="wash-building"
	jsonLd={jsonLd}
	hreflang={[
		{ lang: 'es', href: 'https://florida-shine-car-wash.pages.dev/es/locations' },
		{ lang: 'x-default', href: 'https://florida-shine-car-wash.pages.dev/locations' }
	]}
/>
<PageHero eyebrow="CLOSE TO YOU" title="Find a Location Near You" subtitle="From Miami to Tampa, we're here to keep Florida shining. 8 locations, open 7 days a week." />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<FloridaMap />
			<div class="mt-6 rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<h2 class="font-display text-xl font-black text-navy">When to come</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Typical busy and quiet times are shown on each location page — Saturdays 10 AM–2 PM are usually the busiest, weekday mornings the quietest. These are typical hours, not live wait times.
				</p>
				<h2 class="mt-5 font-display text-xl font-black text-navy">What every location offers</h2>
				<ul class="mt-2 space-y-1.5 text-sm text-muted">
					<li>• Soft-touch tunnel wash, safe for every paint type</li>
					<li>• Free vacuums after every wash — free for 15 minutes with any wash</li>
					<li>• {locations[0].lastWash}</li>
					<li>• Memberships work at all 8 locations — your RFID sticker is recognised everywhere</li>
					<li>• Tunnel fits vehicles up to 7 ft tall</li>
				</ul>
			</div>
		</div>
		<div>
			<label for="loc-search" class="font-black text-navy">Search by city or ZIP</label>
			<div class="relative mt-2">
				<Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
				<input id="loc-search" type="search" bind:value={query} placeholder="Try Miami, Tampa or 33132…" class="min-h-12 w-full rounded-full border-2 border-line bg-white py-3 pl-12 pr-4 text-navy" />
			</div>
			<p class="mt-2 text-sm text-muted" role="status">{shown.length} location{shown.length === 1 ? '' : 's'} found</p>
			<div class="mt-4 space-y-4">
				{#each shown as loc}
					<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
						<h2 class="font-display text-xl font-black text-navy">{loc.name}</h2>
						<p class="mt-2 flex items-start gap-2 text-sm text-muted"><MapPin class="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> {loc.address}, {loc.city}, FL {loc.zip}</p>
						<p class="mt-1 flex items-center gap-2 text-sm text-muted"><Phone class="h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> <a href="tel:+1{loc.phone.replace(/[^0-9]/g, '')}" class="inline-flex min-h-11 items-center font-bold text-navy-light">{loc.phone}</a></p>
						<p class="mt-1 flex items-center gap-2 text-sm text-muted"><Clock class="h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> {loc.hours}</p>
						<p class="mt-1 text-sm text-muted">{loc.busyHours}</p>
						<div class="mt-3 flex flex-wrap gap-2">{#each loc.features as f}<span class="rounded-full bg-sky-light px-2.5 py-1 text-xs font-bold text-navy">{f}</span>{/each}</div>
						<div class="mt-5 flex gap-2">
							<a href="/locations/{loc.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-navy px-4 py-3 text-sm font-black text-white">LOCATION DETAILS</a>
							<a href="/book?location={loc.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-sun px-4 py-3 text-sm font-black text-navy">BOOK HERE</a>
						</div>
					</article>
				{/each}
				{#if shown.length === 0}
					<p class="rounded-3xl bg-white p-6 text-muted shadow ring-1 ring-line">No locations match "{query}". Try a nearby city — or call <a class="inline-flex min-h-11 items-center font-bold text-navy" href="tel:+13055550198">(305) 555-0198</a> and we'll point you to the closest wash.</p>
				{/if}
			</div>
		</div>
	</div>
</section>
