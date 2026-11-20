<script lang="ts">
	import { Clock, MapPin, Phone, Search } from '@lucide/svelte';
	import FloridaMap from '#lib/components/FloridaMap.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { locations } from '#lib/data/site.ts';
	import { breadcrumb, hreflangUrls, locationBusyHours, locationFeatures, locationsPageEs, siteEs } from '#lib/data/es.ts';

	$effect(() => {
		document.documentElement.lang = 'es';
	});

	const alt = hreflangUrls('/es/locations', '/locations');
	const jsonLd = breadcrumb([
		{ name: 'Inicio', path: '/es' },
		{ name: 'Ubicaciones', path: '/es/locations' }
	]);

	let query = $state('');
	const shown = $derived(
		locations.filter((l) => !query.trim() || `${l.city} ${l.name} ${l.address} ${l.zip}`.toLowerCase().includes(query.trim().toLowerCase()))
	);
</script>

<svelte:head>
	<link rel="alternate" hreflang="es" href={alt.es} />
	<link rel="alternate" hreflang="en" href={alt.en} />
	<link rel="alternate" hreflang="x-default" href={alt.xDefault} />
</svelte:head>

<Seo
	title={locationsPageEs.title}
	description={locationsPageEs.description}
	canonical="/es/locations"
	ogImage="wash-building"
	jsonLd={jsonLd}
/>
<PageHero eyebrow={locationsPageEs.eyebrow} title={locationsPageEs.heading} subtitle={locationsPageEs.subtitle} />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<FloridaMap base="/es/locations" />
			<div class="mt-6 rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<h2 class="font-display text-xl font-black text-navy">{locationsPageEs.whenHeading}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{locationsPageEs.whenText}</p>
				<h2 class="mt-5 font-display text-xl font-black text-navy">{locationsPageEs.offersHeading}</h2>
				<ul class="mt-2 space-y-1.5 text-sm text-muted">
					{#each locationsPageEs.offers as o}<li>• {o}</li>{/each}
				</ul>
			</div>
		</div>
		<div>
			<label for="loc-search" class="font-black text-navy">{locationsPageEs.searchLabel}</label>
			<div class="relative mt-2">
				<Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
				<input id="loc-search" type="search" bind:value={query} placeholder={locationsPageEs.searchPlaceholder} class="min-h-12 w-full rounded-full border-2 border-line bg-white py-3 pl-12 pr-4 text-navy" />
			</div>
			<p class="mt-2 text-sm text-muted" role="status">{locationsPageEs.found(shown.length)}</p>
			<div class="mt-4 space-y-4">
				{#each shown as loc}
					<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
						<h2 class="font-display text-xl font-black text-navy">{loc.name}</h2>
						<p class="mt-2 flex items-start gap-2 text-sm text-muted"><MapPin class="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> {loc.address}, {loc.city}, FL {loc.zip}</p>
						<p class="mt-1 flex items-center gap-2 text-sm text-muted"><Phone class="h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> <a href="tel:+1{loc.phone.replace(/[^0-9]/g, '')}" class="inline-flex min-h-11 items-center font-bold text-navy-light">{loc.phone}</a></p>
						<p class="mt-1 flex items-center gap-2 text-sm text-muted"><Clock class="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" /> {siteEs.hoursEs}</p>
						<p class="mt-1 text-sm text-muted">{locationBusyHours[loc.slug] ?? loc.busyHours}</p>
						<div class="mt-3 flex flex-wrap gap-2">{#each loc.features as f}<span class="rounded-full bg-sky-light px-2.5 py-1 text-xs font-bold text-navy">{locationFeatures[f] ?? f}</span>{/each}</div>
						<div class="mt-5 flex gap-2">
							<a href="/es/locations/{loc.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-navy px-4 py-3 text-sm font-black text-white">{locationsPageEs.detailsButton}</a>
							<a href="/es/book?location={loc.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-sun px-4 py-3 text-sm font-black text-navy">{locationsPageEs.bookHereButton}</a>
						</div>
					</article>
				{/each}
				{#if shown.length === 0}
					<p class="rounded-3xl bg-white p-6 text-muted shadow ring-1 ring-line">{locationsPageEs.noneFound(query)}</p>
				{/if}
			</div>
		</div>
	</div>
</section>
