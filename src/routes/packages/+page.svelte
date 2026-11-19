<script lang="ts">
	import { Check, Plus } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { addons, packages } from '#lib/data/site.ts';
</script>
<svelte:head><title>Wash Packages — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="CHOOSE YOUR SHINE" title="Wash Packages" subtitle="Three simple packages, one sparkling result. Every wash uses soft-touch foam, filtered water and a spot-free rinse — and every package can be booked online in two minutes." />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-3">
		{#each packages as pkg}
			<article class="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy/10 ring-1 ring-line {pkg.popular ? 'ring-2 ring-sun' : ''}">
				<Picture src={pkg.image} alt="{pkg.name} at Florida Shine" width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" class="h-44 w-full" />
				{#if pkg.popular}<span class="absolute left-4 top-4 rounded-full bg-sun px-3 py-1 text-xs font-black text-navy">MOST POPULAR</span>{/if}
				<div class="flex flex-1 flex-col p-6">
					<h2 class="font-display text-2xl font-black text-navy">{pkg.name.toUpperCase()}</h2>
					<p class="mt-1 text-sm text-muted">{pkg.tagline} {pkg.description}</p>
					<p class="mt-4 font-display text-4xl font-black text-navy">${pkg.price} <span class="text-sm font-bold text-muted">· {pkg.duration}</span></p>
					<ul class="mt-4 flex-1 space-y-2">
						{#each pkg.features as f}<li class="flex items-center gap-2 text-sm font-semibold"><Check class="h-5 w-5 shrink-0 text-sky" aria-hidden="true" /> {f}</li>{/each}
					</ul>
					<div class="mt-6 flex gap-2">
						<a href="/book?package={pkg.slug}" class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full px-4 py-3 text-sm font-black {pkg.popular ? 'bg-sun text-navy' : 'bg-navy text-white'}">BOOK THIS WASH</a>
						<a href="/packages/{pkg.slug}" class="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-navy px-4 py-3 text-sm font-black text-navy">Details</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="compare-heading">
	<h2 id="compare-heading" class="font-display text-3xl font-black text-navy">Compare Packages</h2>
	<div class="mt-6 overflow-x-auto rounded-3xl bg-white shadow ring-1 ring-line">
		<table class="w-full min-w-[560px] text-left text-sm">
			<thead><tr class="border-b border-line bg-sky-light"><th class="px-4 py-3 font-black text-navy">What's included</th>{#each packages as p}<th class="px-4 py-3 font-black text-navy">{p.name} — ${p.price}</th>{/each}</tr></thead>
			<tbody>
				{#each ['Exterior Wash', 'Wheel Cleaning', 'Tire Shine', 'Wax Protection', 'Triple Foam', 'Interior Cleaning', 'Dash & Door Detail'] as feat}
					<tr class="border-b border-line last:border-0">
						<td class="px-4 py-3 font-semibold">{feat}</td>
						{#each packages as p}<td class="px-4 py-3">{#if p.features.includes(feat)}<Check class="h-5 w-5 text-sky" aria-label="Included" />{:else}<span class="text-muted" aria-label="Not included">—</span>{/if}</td>{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6" aria-labelledby="addons-heading">
	<h2 id="addons-heading" class="font-display text-3xl font-black text-navy">Add-Ons — Make It Yours</h2>
	<p class="mt-2 max-w-2xl text-muted">Add any of these to any wash, at the wash or when you book online.</p>
	<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each addons as a}
			<article class="rounded-3xl bg-white p-5 shadow ring-1 ring-line">
				<Plus class="h-6 w-6 text-navy" aria-hidden="true" />
				<h3 class="mt-3 font-black text-navy">{a.name}</h3>
				<p class="mt-1 text-sm text-muted">{a.description}</p>
				<p class="mt-3 font-display text-xl font-black text-navy">${a.price} <span class="text-xs font-bold text-muted">· {a.time}</span></p>
			</article>
		{/each}
	</div>
</section>
