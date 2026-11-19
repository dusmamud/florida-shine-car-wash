<script lang="ts">
	import { ArrowRight, Check, Clock } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const s = $derived(data.service);
</script>
<svelte:head><title>{s.name} — Florida Shine Car Wash</title></svelte:head>
<section class="bg-navy text-white"><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<p class="text-xs font-black tracking-[0.3em] text-sun">SERVICES</p>
	<h1 class="mt-3 font-display text-4xl font-black sm:text-5xl">{s.name}</h1>
	<p class="mt-3 max-w-2xl text-lg text-white/85">{s.description}</p>
	<p class="mt-4 text-white/80"><Clock class="mr-1 inline h-5 w-5" aria-hidden="true" /> {s.duration} · From ${s.priceFrom}</p>
</div></section>
<section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<Picture src={s.image} alt={s.name} width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" eager class="h-72 w-full overflow-hidden rounded-3xl sm:h-96" />
	<div>
		<h2 class="font-display text-2xl font-black text-navy">What's included</h2>
		<ul class="mt-4 space-y-3">
			{#each s.includes as i}<li class="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Check class="h-5 w-5 shrink-0 text-sky" aria-hidden="true" /> {i}</li>{/each}
		</ul>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/book?service={s.slug}" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-8 py-3 font-black text-navy">BOOK THIS SERVICE <ArrowRight class="h-5 w-5" aria-hidden="true" /></a>
			<a href="/packages" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">See wash packages</a>
		</div>
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="font-display text-2xl font-black text-navy">More services</h2>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each data.others as o}<a href="/services/{o.slug}" class="inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-bold text-navy shadow ring-1 ring-line hover:bg-sun">{o.name}</a>{/each}
	</div>
</section>
