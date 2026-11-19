<script lang="ts">
	import { Car, Check, Clock, Ruler } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { firstVisit } from '#lib/data/site.ts';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'First Visit', item: 'https://florida-shine-car-wash.pages.dev/first-visit' }
		]
	};
</script>

<Seo
	title="Your First Visit — Florida Shine Car Wash"
	description="First time at Florida Shine? Drive in, stay in your car, through the tunnel in about 5 minutes, then free vacuums for 15 minutes. Tunnel fits vehicles up to 7 ft tall."
	canonical="/first-visit"
	ogImage="first-visit-entrance"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="FIRST VISIT"
	title="Your First Wash, Step by Step"
	subtitle="No appointment, no getting out of your car, no guesswork. Here is exactly what happens from the moment you drive in."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-8 lg:grid-cols-2">
		<Picture src="first-visit-entrance" alt="Entrance to the Florida Shine tunnel wash with blue direction arrows" width={1200} height={800} eager={true} class="overflow-hidden rounded-3xl ring-1 ring-line" />
		<div>
			<ol class="space-y-4">
				{#each firstVisit.steps as step, i}
					<li class="flex gap-4 rounded-3xl bg-white p-5 shadow ring-1 ring-line">
						<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun font-display text-lg font-black text-navy" aria-hidden="true">{i + 1}</span>
						<div>
							<h2 class="font-display text-xl font-black text-navy">{step.title}</h2>
							<p class="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>

	<div class="mt-10 grid gap-4 md:grid-cols-3">
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<Clock class="h-6 w-6 text-navy" aria-hidden="true" />
			<h2 class="mt-3 font-display text-xl font-black text-navy">About 5 minutes</h2>
			<p class="mt-1 text-sm leading-relaxed text-muted">The tunnel wash itself takes about 5 minutes. Detailing is by appointment, so there is no waiting around for that either.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<Car class="h-6 w-6 text-navy" aria-hidden="true" />
			<h2 class="mt-3 font-display text-xl font-black text-navy">Stay in your car</h2>
			<p class="mt-1 text-sm leading-relaxed text-muted">You never need to get out for a tunnel wash. Put the car in neutral when the team signals, and let the conveyor do the work.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<Ruler class="h-6 w-6 text-navy" aria-hidden="true" />
			<h2 class="mt-3 font-display text-xl font-black text-navy">Fits up to 7 ft</h2>
			<p class="mt-1 text-sm leading-relaxed text-muted">The tunnel fits vehicles up to 7 ft tall and 7 ft wide — most trucks and SUVs included. Taller vehicles are detailed by appointment.</p>
		</div>
	</div>

	<div class="mt-10 rounded-3xl bg-navy p-6 text-white sm:p-8">
		<h2 class="font-display text-2xl font-black">Good to know before you arrive</h2>
		<ul class="mt-4 space-y-2.5">
			{#each firstVisit.notes as note}
				<li class="flex items-start gap-2 text-sm leading-relaxed text-white/85"><Check class="mt-0.5 h-5 w-5 shrink-0 text-sun" aria-hidden="true" /> {note}</li>
			{/each}
		</ul>
		<div class="mt-6 flex flex-col gap-3 sm:flex-row">
			<a href="/book" class="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">BOOK YOUR FIRST WASH</a>
			<a href="/offers" class="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white px-6 py-3 text-sm font-black text-white">FIRST WASH IS FREE — SEE OFFERS</a>
		</div>
	</div>
</section>
