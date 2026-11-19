<script lang="ts">
	import { ArrowRight, Check } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { services } from '#lib/data/site.ts';
</script>
<Seo
	title="Services — Florida Shine Car Wash"
	description="Car wash & detailing services across Florida: exterior wash from $16, interior detailing from $45, ceramic coating from $199, wax & polish, wheel care and pet hair removal."
	canonical="/services"
	ogImage="foam-wash"
/>
<PageHero eyebrow="WHAT WE DO" title="Car Wash & Detailing Services" subtitle="From a quick 10-minute wash to a full ceramic coating — every service is done by local Florida experts with paint-safe products and eco-friendly water systems." />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each services as s}
			<article class="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy/10 ring-1 ring-line">
				<Picture src={s.image} alt={s.name} width={800} height={500} sizes="(max-width: 768px) 100vw, 33vw" class="h-44 w-full" />
				<div class="flex flex-1 flex-col p-6">
					<h2 class="font-display text-xl font-black text-navy">{s.name}</h2>
					<p class="mt-1 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
					<p class="mt-3 text-sm font-bold text-navy">From ${s.priceFrom} · {s.duration}</p>
					<ul class="mt-3 space-y-1.5 text-sm">
						{#each s.includes.slice(0, 3) as i}<li class="flex items-center gap-2"><Check class="h-4 w-4 shrink-0 text-sky" aria-hidden="true" /> {i}</li>{/each}
					</ul>
					<a href="/services/{s.slug}" class="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-black text-white">LEARN MORE <ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-10 text-center"><a href="/book" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-8 py-3 font-black text-navy">Book a service <ArrowRight class="h-5 w-5" aria-hidden="true" /></a></p>
</section>
