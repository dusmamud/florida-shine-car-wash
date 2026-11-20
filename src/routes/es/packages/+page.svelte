<script lang="ts">
	import { Check, Plus } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { addons, memberships, packages } from '#lib/data/site.ts';
	import {
		addonDescriptions,
		addonNames,
		addonNotes,
		breadcrumb,
		compareFeatures,
		featureNames,
		hreflangUrls,
		membershipBreakEven,
		membershipNames,
		packageDescriptions,
		packageNames,
		packageTaglines,
		packagesPageEs,
		sizeUpchargeNoteEs
	} from '#lib/data/es.ts';

	$effect(() => {
		document.documentElement.lang = 'es';
	});

	const alt = hreflangUrls('/es/packages', '/packages');
	const jsonLd = breadcrumb([
		{ name: 'Inicio', path: '/es' },
		{ name: 'Paquetes', path: '/es/packages' }
	]);
	// English feature names in site.ts order, for the compare table lookup.
	const compareFeaturesEn = ['Exterior Wash', 'Wheel Cleaning', 'Tire Shine', 'Wax Protection', 'Triple Foam', 'Interior Cleaning', 'Dash & Door Detail'];
	const clubFor = (slug: string) => {
		if (slug === 'basic-wash') return memberships[0];
		if (slug === 'premium-wash') return memberships[1];
		return memberships[2];
	};
</script>

<svelte:head>
	<link rel="alternate" hreflang="es" href={alt.es} />
	<link rel="alternate" hreflang="en" href={alt.en} />
	<link rel="alternate" hreflang="x-default" href={alt.xDefault} />
</svelte:head>

<Seo
	title={packagesPageEs.title}
	description={packagesPageEs.description}
	canonical="/es/packages"
	ogImage="foam-wash"
	jsonLd={jsonLd}
/>
<PageHero eyebrow={packagesPageEs.eyebrow} title={packagesPageEs.heading} subtitle={packagesPageEs.subtitle} />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-3">
		{#each packages as pkg}
			{@const club = clubFor(pkg.slug)}
			<article class="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy/10 ring-1 ring-line {pkg.popular ? 'ring-2 ring-sun' : ''}">
				<Picture src={pkg.image} alt="{packageNames[pkg.slug] ?? pkg.name} en Florida Shine" width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" class="h-44 w-full" />
				{#if pkg.popular}<span class="absolute left-4 top-4 rounded-full bg-sun px-3 py-1 text-xs font-black text-navy">EL MÁS POPULAR</span>{/if}
				<div class="flex flex-1 flex-col p-6">
					<h2 class="font-display text-2xl font-black text-navy">{(packageNames[pkg.slug] ?? pkg.name).toUpperCase()}</h2>
					<p class="mt-1 text-sm text-muted">{packageTaglines[pkg.slug] ?? pkg.tagline} {packageDescriptions[pkg.slug] ?? pkg.description}</p>
					<p class="mt-4 font-display text-4xl font-black text-navy">${pkg.price} <span class="text-sm font-bold text-muted">· {pkg.duration}</span></p>
					<p class="mt-2 text-sm text-muted">{packagesPageEs.breakEvenWith(membershipNames[club.slug] ?? club.name, club.price, membershipBreakEven[club.slug] ?? '')}</p>
					<ul class="mt-4 flex-1 space-y-2">
						{#each pkg.features as f}<li class="flex items-center gap-2 text-sm font-semibold"><Check class="h-5 w-5 shrink-0 text-sky" aria-hidden="true" /> {featureNames[f] ?? f}</li>{/each}
					</ul>
					<div class="mt-6 flex gap-2">
						<a href="/es/book?package={pkg.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full px-4 py-3 text-sm font-black {pkg.popular ? 'bg-sun text-navy' : 'bg-navy text-white'}">{packagesPageEs.bookThisWash}</a>
						<a href="/es/packages" class="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-navy px-4 py-3 text-sm font-black text-navy">{packagesPageEs.details}</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="compare-heading">
	<h2 id="compare-heading" class="font-display text-3xl font-black text-navy">{packagesPageEs.compareHeading}</h2>
	<div class="mt-6 overflow-x-auto rounded-3xl bg-white shadow ring-1 ring-line">
		<table class="w-full min-w-[560px] text-left text-sm">
			<thead><tr class="border-b border-line bg-sky-light"><th class="px-4 py-3 font-black text-navy">{packagesPageEs.includedCol}</th>{#each packages as p}<th class="px-4 py-3 font-black text-navy">{packageNames[p.slug] ?? p.name} — ${p.price}</th>{/each}</tr></thead>
			<tbody>
				{#each compareFeaturesEn as feat, i}
					<tr class="border-b border-line last:border-0">
						<td class="px-4 py-3 font-semibold">{compareFeatures[i]}</td>
						{#each packages as p}<td class="px-4 py-3">{#if p.features.includes(feat)}<Check class="h-5 w-5 text-sky" aria-label={packagesPageEs.included} />{:else}<span class="text-muted" aria-label={packagesPageEs.notIncluded}>—</span>{/if}</td>{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="mt-4 text-sm text-muted">{sizeUpchargeNoteEs}</p>
</section>
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6" aria-labelledby="addons-heading">
	<h2 id="addons-heading" class="font-display text-3xl font-black text-navy">{packagesPageEs.addonsHeading}</h2>
	<p class="mt-2 max-w-2xl text-muted">{packagesPageEs.addonsSub}</p>
	<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each addons as a}
			<article class="rounded-3xl bg-white p-5 shadow ring-1 ring-line">
				<Plus class="h-6 w-6 text-navy" aria-hidden="true" />
				<h3 class="mt-3 font-black text-navy">{addonNames[a.name] ?? a.name}</h3>
				<p class="mt-1 text-sm text-muted">{addonDescriptions[a.name] ?? a.description}</p>
				<p class="mt-2 text-sm text-muted"><em>{addonNotes[a.name] ?? a.note}</em></p>
				<p class="mt-3 font-display text-xl font-black text-navy">${a.price} <span class="text-xs font-bold text-muted">· {a.time}</span></p>
			</article>
		{/each}
	</div>
</section>
