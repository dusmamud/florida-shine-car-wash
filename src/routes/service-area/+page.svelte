<script lang="ts">
	import { MapPin, Search } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { notServedYet, serviceArea } from '#lib/data/round3.ts';

	let interestName = $state('');
	let interestEmail = $state('');
	let interestArea = $state('');
	let submitted = $state(false);
	let err = $state('');

	function submitInterest(e: SubmitEvent) {
		e.preventDefault();
		if (!interestName.trim()) {
			err = 'Tell us your name.';
			return;
		}
		if (!interestEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(interestEmail.trim())) {
			err = 'Enter a valid email so we can tell you when we open near you.';
			return;
		}
		if (!interestArea.trim()) {
			err = 'Tell us which area you would like a Florida Shine in.';
			return;
		}
		err = '';
		submitted = true;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Service Area', item: 'https://florida-shine-car-wash.pages.dev/service-area' }
		]
	};
</script>

<Seo
	title="Service Area — Where We Wash — Florida Shine Car Wash"
	description="Florida Shine serves Miami, Tampa, Orlando, Jacksonville, Fort Lauderdale, Naples and Sarasota from 8 locations. See which areas we cover, which we do not yet, and tell us where to open next."
	canonical="/service-area"
	ogImage="wash-building"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="SERVICE AREA"
	title="Where We Wash"
	subtitle="Eight locations across Florida — and a short drive from plenty more. We are a drive-in wash: you come to us, at whichever location is closest to you."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<h2 class="font-display text-2xl font-black text-navy">Our 8 locations</h2>
	<p class="mt-2 max-w-3xl leading-relaxed text-muted">
		Every location is open Monday–Saturday 7:00 AM–7:00 PM and Sunday 8:00 AM–6:00 PM, and every Unlimited Wash Club plan works at all 8. We do not publish a mileage radius or a ZIP-code count — if you are within a short drive of one of these washes, you are in our service area.
	</p>
	<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each serviceArea as area}
			<article class="flex flex-col rounded-3xl bg-white p-5 shadow ring-1 ring-line">
				<p class="flex items-center gap-1.5 text-xs font-black tracking-widest text-navy-light"><MapPin class="h-4 w-4" aria-hidden="true" /> {area.county.toUpperCase()}</p>
				<h3 class="mt-2 font-display text-xl font-black text-navy">{area.city} — {area.name}</h3>
				<p class="mt-1 flex-1 text-sm text-muted">{area.address}, {area.city}, FL {area.zip}<br />{area.phone}</p>
				<a href="/locations/{area.slug}" class="mt-3 inline-flex min-h-12 items-center font-black text-navy">SEE THIS LOCATION →</a>
			</article>
		{/each}
	</div>

	<div class="mt-6 grid gap-6 lg:grid-cols-2">
		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-black text-navy">Where we do not serve — yet</h2>
			<p class="mt-2 leading-relaxed text-muted">We would rather say so plainly than let you drive an hour to a wash that does not exist:</p>
			<ul class="mt-4 space-y-3">
				{#each notServedYet as place}
					<li class="rounded-2xl bg-mist p-4"><strong class="text-navy">{place.area}</strong><span class="block text-sm text-muted">{place.note}</span></li>
				{/each}
			</ul>
			<p class="mt-4 text-sm text-muted">If you live in one of these areas, the interest form is how we decide where to open next — the areas with the most requests go first.</p>
		</article>

		<article class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black"><Search class="h-6 w-6 text-sun" aria-hidden="true" /> Want a Florida Shine near you?</h2>
			<p class="mt-2 text-sm leading-relaxed text-white/80">Tell us where. This is a mock signup — nothing is sent and no email is stored.</p>
			{#if submitted}
				<div class="mt-5 rounded-2xl bg-sun p-5 text-navy" role="status">
					<p class="font-black">Thanks, {interestName}!</p>
					<p class="mt-1 text-sm">We have noted your interest in {interestArea}. If Florida Shine opens there, we will email {interestEmail} first. (Mock signup — nothing was sent.)</p>
				</div>
			{:else}
				<form class="mt-5 space-y-3" onsubmit={submitInterest} novalidate>
					<div class="min-w-0">
						<label for="s-name" class="text-sm font-bold">Your name *</label>
						<input id="s-name" type="text" bind:value={interestName} placeholder="Alex Rivera" autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
					</div>
					<div class="min-w-0">
						<label for="s-email" class="text-sm font-bold">Email *</label>
						<input id="s-email" type="email" bind:value={interestEmail} placeholder="alex@example.com" autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
					</div>
					<div class="min-w-0">
						<label for="s-area" class="text-sm font-bold">Area you want us in *</label>
						<input id="s-area" type="text" bind:value={interestArea} placeholder="e.g. West Palm Beach" autocomplete="off" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
					</div>
					{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
					<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">TELL US WHERE TO OPEN NEXT</button>
				</form>
			{/if}
			<p class="mt-4 text-xs leading-relaxed text-white/60">Prefer to find your nearest wash now? <a href="/locations" class="font-bold text-white underline underline-offset-2">Browse all 8 locations</a>.</p>
		</article>
	</div>
</section>
