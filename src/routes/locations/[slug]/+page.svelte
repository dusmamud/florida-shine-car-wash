<script lang="ts">
	import { ArrowRight, Clock, MapPin, Phone, Star } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageData } from './$types';
	import { addons, faqs, ratingSummary, reviews, reviewSources } from '#lib/data/site.ts';
	let { data }: { data: PageData } = $props();
	const loc = $derived(data.location);
	const locReviews = $derived(reviews.filter((r) => r.location === loc.slug));
	const review = $derived(locReviews[0] ?? reviews[0]);
	const relatedFaqs = $derived(faqs.filter((f) => f.category === 'Locations' || f.category === 'Wash').slice(0, 3));
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'AutoWash',
				name: `Florida Shine Car Wash — ${loc.name}`,
				description: `Soft-touch tunnel car wash in ${loc.city}, Florida.`,
				telephone: loc.phone,
				priceRange: '$16 - $199',
				address: {
					'@type': 'PostalAddress',
					streetAddress: loc.address,
					addressLocality: loc.city,
					addressRegion: 'FL',
					postalCode: loc.zip,
					addressCountry: 'US'
				},
				geo: { '@type': 'GeoCoordinates', latitude: loc.lat, longitude: loc.lng },
				openingHoursSpecification: [
					{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '19:00' },
					{ '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '08:00', closes: '18:00' }
				]
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
					{ '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://florida-shine-car-wash.pages.dev/locations' },
					{ '@type': 'ListItem', position: 3, name: loc.name, item: `https://florida-shine-car-wash.pages.dev/locations/${loc.slug}` }
				]
			}
		]
	});
</script>

<Seo
	title="{loc.name}, {loc.city} — Florida Shine Car Wash"
	description="Florida Shine Car Wash in {loc.city} ({loc.name}), {loc.address}. {loc.washType}, {loc.vacuums} free vacuums, open 7 days a week. Washes from $16 — drive in or book online."
	canonical="/locations/{loc.slug}"
	ogImage={loc.image}
	jsonLd={jsonLd}
	hreflang={[
		{ lang: 'es', href: `https://florida-shine-car-wash.pages.dev/es/locations/${loc.slug}` },
		{ lang: 'x-default', href: `https://florida-shine-car-wash.pages.dev/locations/${loc.slug}` }
	]}
/>
<section class="bg-navy text-white"><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<p class="text-xs font-black tracking-[0.3em] text-sun">OUR LOCATIONS</p>
	<h1 class="mt-3 font-display text-4xl font-black sm:text-5xl">{loc.name} — {loc.city}</h1>
	<p class="mt-3 text-lg text-white/85">{loc.address}, {loc.city}, FL {loc.zip}</p>
</div></section>
<section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<Picture src={loc.image} alt="Florida Shine car wash at {loc.name}, {loc.city}" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" eager class="h-72 w-full overflow-hidden rounded-3xl sm:h-96" />
	<div>
		<ul class="space-y-3">
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><MapPin class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> {loc.address}, {loc.city}, FL {loc.zip}</li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Phone class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> <a href="tel:+1{loc.phone.replace(/[^0-9]/g, '')}" class="inline-flex min-h-11 items-center text-navy-light">{loc.phone}</a></li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Clock class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> {loc.hours} · {loc.lastWash}</li>
		</ul>
		<div class="mt-4 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-line">
			<p><strong class="text-navy">How to get in:</strong> {loc.entrance}.</p>
			<p class="mt-2"><strong class="text-navy">When it is busy:</strong> {loc.busyHours}.</p>
			<p class="mt-2"><strong class="text-navy">Wash type:</strong> {loc.washType} · <strong class="text-navy">Free vacuums:</strong> {loc.vacuums} bays · <strong class="text-navy">Membership:</strong> works at all locations.</p>
		</div>
		<div class="mt-4 flex flex-wrap gap-2">{#each loc.features as f}<span class="rounded-full bg-sky-light px-3 py-1.5 text-xs font-bold text-navy">{f}</span>{/each}</div>
		<div class="mt-6 flex flex-wrap gap-3">
			<a href="/book?location={loc.slug}" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-8 py-3 font-black text-navy">BOOK AT THIS LOCATION <ArrowRight class="h-5 w-5" aria-hidden="true" /></a>
			<a href="/locations" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">All locations</a>
		</div>
		<div class="mt-6 overflow-hidden rounded-3xl ring-1 ring-line">
			<iframe title="Map of {loc.name}, {loc.city}" src="https://maps.google.com/maps?q={encodeURIComponent(loc.address + ', ' + loc.city + ', FL')}&output=embed" class="h-72 w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="addons-heading">
	<h2 id="addons-heading" class="font-display text-2xl font-black text-navy">Add something extra</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each addons.slice(0, 4) as a}
			<article class="rounded-3xl bg-white p-5 shadow ring-1 ring-line">
				<h3 class="font-black text-navy">{a.name}</h3>
				<p class="mt-1 text-sm text-muted">{a.note}</p>
				<p class="mt-3 font-display text-xl font-black text-navy">${a.price} <span class="text-xs font-bold text-muted">· {a.time}</span></p>
				<a href="/book?location={loc.slug}" class="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-navy-light underline-offset-2 hover:underline">Add when you book →</a>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<h2 class="font-display text-2xl font-black text-navy">Good to know</h2>
			<div class="mt-4 space-y-3">
				{#each relatedFaqs as f}
					<div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line">
						<p class="font-bold text-navy">{f.q}</p>
						<p class="mt-1 text-sm leading-relaxed text-muted">{f.a}</p>
					</div>
				{/each}
			</div>
		</div>
		<div>
			<h2 class="font-display text-2xl font-black text-navy">What drivers say here</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				{loc.name} holds {ratingSummary.average} out of 5 from {ratingSummary.totalReviews.toLocaleString('en-US')}+ {ratingSummary.source}.
				{#if locReviews.length > 0}
					{locReviews.length} featured review{locReviews.length === 1 ? '' : 's'} from this location, most recent {review.date}.
				{:else}
					No featured review from this location yet.
				{/if}
			</p>
			{#if locReviews.length > 0}
				<blockquote class="mt-4 rounded-3xl bg-white p-6 shadow ring-1 ring-line">
					<p class="flex gap-0.5 text-sun" aria-label="{review.rating} out of 5 stars">
						{#each Array(review.rating) as _}<Star class="h-4 w-4 fill-current" aria-hidden="true" />{/each}
					</p>
					<p class="mt-3 leading-relaxed">"{review.text}"</p>
					<footer class="mt-4 text-sm"><strong class="text-navy">{review.name}</strong> <span class="text-muted">· {review.city} · {review.service} · {review.date}</span></footer>
				</blockquote>
			{/if}
			<p class="mt-4 flex flex-wrap gap-3">
				<a href="/reviews" class="inline-flex min-h-11 items-center font-bold text-navy-light underline-offset-2 hover:underline">Read all reviews →</a>
				<a href={reviewSources.googleUrl} target="_blank" rel="noopener" class="inline-flex min-h-11 items-center font-bold text-navy-light underline-offset-2 hover:underline">Write a review on Google →</a>
			</p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="font-display text-2xl font-black text-navy">Other locations</h2>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each data.others as o}<a href="/locations/{o.slug}" class="inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-bold text-navy shadow ring-1 ring-line hover:bg-sun">{o.name}</a>{/each}
	</div>
</section>
