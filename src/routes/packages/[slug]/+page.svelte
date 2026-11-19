<script lang="ts">
	import { ArrowRight, Check, Clock } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const pkg = $derived(data.pkg);
</script>
<svelte:head><title>{pkg.name} — ${pkg.price} | Florida Shine Car Wash</title></svelte:head>
<section class="bg-navy text-white"><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<p class="text-xs font-black tracking-[0.3em] text-sun">WASH PACKAGES</p>
	<h1 class="mt-3 font-display text-4xl font-black sm:text-5xl">{pkg.name.toUpperCase()}</h1>
	<p class="mt-3 max-w-2xl text-lg text-white/85">{pkg.tagline} {pkg.description}</p>
	<p class="mt-4 flex items-center gap-2 text-white/80"><Clock class="h-5 w-5" aria-hidden="true" /> {pkg.duration}</p>
</div></section>
<section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<Picture src={pkg.image} alt="{pkg.name} at Florida Shine" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" eager class="h-72 w-full overflow-hidden rounded-3xl sm:h-96" />
	<div>
		<p class="font-display text-5xl font-black text-navy">${pkg.price}</p>
		<h2 class="mt-6 font-display text-2xl font-black text-navy">What's included</h2>
		<ul class="mt-4 space-y-3">
			{#each pkg.features as f}<li class="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Check class="h-5 w-5 shrink-0 text-sky" aria-hidden="true" /> {f}</li>{/each}
		</ul>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/book?package={pkg.slug}" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-8 py-3 font-black text-navy">BOOK THIS WASH <ArrowRight class="h-5 w-5" aria-hidden="true" /></a>
			<a href="/memberships" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">Wash unlimited from $19/mo</a>
		</div>
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="font-display text-2xl font-black text-navy">Other packages</h2>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each data.others as o}<a href="/packages/{o.slug}" class="inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-bold text-navy shadow ring-1 ring-line hover:bg-sun">{o.name} — ${o.price}</a>{/each}
	</div>
</section>
