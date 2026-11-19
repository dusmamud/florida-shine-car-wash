<script lang="ts">
	import { ArrowRight, Clock, MapPin, Phone } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const loc = $derived(data.location);
</script>
<svelte:head><title>{loc.city} — {loc.name} | Florida Shine Car Wash</title></svelte:head>
<section class="bg-navy text-white"><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<p class="text-xs font-black tracking-[0.3em] text-sun">OUR LOCATIONS</p>
	<h1 class="mt-3 font-display text-4xl font-black sm:text-5xl">{loc.city} — {loc.name}</h1>
	<p class="mt-3 text-lg text-white/85">{loc.address}, {loc.city}, FL {loc.zip}</p>
</div></section>
<section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<Picture src="wash-building" alt="Florida Shine car wash building" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" eager class="h-72 w-full overflow-hidden rounded-3xl sm:h-96" />
	<div>
		<ul class="space-y-3">
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><MapPin class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> {loc.address}, {loc.city}, FL {loc.zip}</li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Phone class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> <a href="tel:+1{loc.phone.replace(/[^0-9]/g, '')}" class="text-navy-light">{loc.phone}</a></li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Clock class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> {loc.hours}</li>
		</ul>
		<div class="mt-4 flex flex-wrap gap-2">{#each loc.features as f}<span class="rounded-full bg-sky-light px-3 py-1.5 text-xs font-bold text-navy">{f}</span>{/each}</div>
		<div class="mt-6 flex flex-wrap gap-3">
			<a href="/book?location={loc.slug}" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-8 py-3 font-black text-navy">BOOK AT THIS LOCATION <ArrowRight class="h-5 w-5" aria-hidden="true" /></a>
			<a href="/locations" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">All locations</a>
		</div>
		<div class="mt-6 overflow-hidden rounded-3xl ring-1 ring-line">
			<iframe title="Map of {loc.city} — {loc.name}" src="https://maps.google.com/maps?q={encodeURIComponent(loc.address + ', ' + loc.city + ', FL')}&output=embed" class="h-72 w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="font-display text-2xl font-black text-navy">Other locations</h2>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each data.others as o}<a href="/locations/{o.slug}" class="inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-bold text-navy shadow ring-1 ring-line hover:bg-sun">{o.city} — {o.name}</a>{/each}
	</div>
</section>
