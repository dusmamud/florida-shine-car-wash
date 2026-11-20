<script lang="ts">
	import { ArrowRight, Clock, MapPin, Phone, Star } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageData } from './$types';
	import { addons } from '#lib/data/site.ts';
	import {
		addonNames,
		addonNotes,
		breadcrumb,
		faqsEs,
		hreflangUrls,
		locationBusyHours,
		locationDetailEs,
		locationEntrance,
		locationFeatures,
		reviewsEs,
		siteEs
	} from '#lib/data/es.ts';

	$effect(() => {
		document.documentElement.lang = 'es';
	});

	let { data }: { data: PageData } = $props();
	const loc = $derived(data.location);
	const locReviews = $derived(reviewsEs.filter((r) => r.city === loc.city));
	const review = $derived(locReviews[0] ?? reviewsEs[0]);
	const relatedFaqs = $derived(faqsEs.slice(0, 3));
	const alt = $derived(hreflangUrls(`/es/locations/${loc.slug}`, `/locations/${loc.slug}`));
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'AutoWash',
				name: `Florida Shine Car Wash — ${loc.name}`,
				description: `Túnel de lavado suave en ${loc.city}, Florida.`,
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
			breadcrumb([
				{ name: 'Inicio', path: '/es' },
				{ name: 'Ubicaciones', path: '/es/locations' },
				{ name: loc.name, path: `/es/locations/${loc.slug}` }
			])
		]
	});
</script>

<svelte:head>
	<link rel="alternate" hreflang="es" href={alt.es} />
	<link rel="alternate" hreflang="en" href={alt.en} />
	<link rel="alternate" hreflang="x-default" href={alt.xDefault} />
</svelte:head>

<Seo
	title="{loc.name}, {loc.city} — Florida Shine Car Wash"
	description="Florida Shine Car Wash en {loc.city} ({loc.name}), {loc.address}. Túnel de lavado suave, {loc.vacuums} aspiradoras gratis, abierto 7 días a la semana. Lavados desde $16: venga o reserve en línea."
	canonical="/es/locations/{loc.slug}"
	ogImage={loc.image}
	jsonLd={jsonLd}
/>
<section class="bg-navy text-white"><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<p class="text-xs font-black tracking-[0.3em] text-sun">{locationDetailEs.eyebrow}</p>
	<h1 class="mt-3 font-display text-4xl font-black sm:text-5xl">{loc.name}</h1>
	<p class="mt-3 text-lg text-white/85">{loc.address}, {loc.city}, FL {loc.zip}</p>
</div></section>
<section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<Picture src={loc.image} alt="Lavado de autos Florida Shine en {loc.name}, {loc.city}" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" eager class="h-72 w-full overflow-hidden rounded-3xl sm:h-96" />
	<div>
		<ul class="space-y-3">
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><MapPin class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> {loc.address}, {loc.city}, FL {loc.zip}</li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Phone class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> <a href="tel:+1{loc.phone.replace(/[^0-9]/g, '')}" class="inline-flex min-h-11 items-center text-navy-light">{loc.phone}</a></li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 font-semibold shadow-sm ring-1 ring-line"><Clock class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /> {siteEs.hoursEs} · {siteEs.lastWashEs}</li>
		</ul>
		<div class="mt-4 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-line">
			<p><strong class="text-navy">{locationDetailEs.howToEnter}</strong> {locationEntrance[loc.slug] ?? loc.entrance}.</p>
			<p class="mt-2"><strong class="text-navy">{locationDetailEs.busyLabel}</strong> {locationBusyHours[loc.slug] ?? loc.busyHours}.</p>
			<p class="mt-2"><strong class="text-navy">{locationDetailEs.washTypeLabel}</strong> Túnel de lavado suave · <strong class="text-navy">{locationDetailEs.vacuumsLabel}</strong> {locationDetailEs.vacuumsBays(loc.vacuums)} · <strong class="text-navy">{locationDetailEs.membershipLabel}</strong> {locationDetailEs.membershipText}</p>
		</div>
		<div class="mt-4 flex flex-wrap gap-2">{#each loc.features as f}<span class="rounded-full bg-sky-light px-3 py-1.5 text-xs font-bold text-navy">{locationFeatures[f] ?? f}</span>{/each}</div>
		<div class="mt-6 flex flex-wrap gap-3">
			<a href="/es/book?location={loc.slug}" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-8 py-3 font-black text-navy">{locationDetailEs.bookHere} <ArrowRight class="h-5 w-5" aria-hidden="true" /></a>
			<a href="/es/locations" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">{locationDetailEs.allLocations}</a>
		</div>
		<div class="mt-6 overflow-hidden rounded-3xl ring-1 ring-line">
			<iframe title={locationDetailEs.mapTitle(loc.name, loc.city)} src="https://maps.google.com/maps?q={encodeURIComponent(loc.address + ', ' + loc.city + ', FL')}&output=embed" class="h-72 w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="addons-heading">
	<h2 id="addons-heading" class="font-display text-2xl font-black text-navy">{locationDetailEs.addonsHeading}</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each addons.slice(0, 4) as a}
			<article class="rounded-3xl bg-white p-5 shadow ring-1 ring-line">
				<h3 class="font-black text-navy">{addonNames[a.name] ?? a.name}</h3>
				<p class="mt-1 text-sm text-muted">{addonNotes[a.name] ?? a.note}</p>
				<p class="mt-3 font-display text-xl font-black text-navy">${a.price} <span class="text-xs font-bold text-muted">· {a.time}</span></p>
				<a href="/es/book?location={loc.slug}" class="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-navy-light underline-offset-2 hover:underline">{locationDetailEs.addWhenBooking}</a>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<h2 class="font-display text-2xl font-black text-navy">{locationDetailEs.goodToKnow}</h2>
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
			<h2 class="font-display text-2xl font-black text-navy">{locationDetailEs.driversSay}</h2>
			<blockquote class="mt-4 rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<p class="flex gap-0.5 text-sun" aria-label="{review.rating} de 5 estrellas">
					{#each Array(review.rating) as _}<Star class="h-4 w-4 fill-current" aria-hidden="true" />{/each}
				</p>
				<p class="mt-3 leading-relaxed">"{review.text}"</p>
				<footer class="mt-4 text-sm"><strong class="text-navy">{review.name}</strong> <span class="text-muted">· {review.city} · {review.service} · {review.date}</span></footer>
			</blockquote>
			<p class="mt-4"><a href="/reviews" class="inline-flex min-h-11 items-center font-bold text-navy-light underline-offset-2 hover:underline">{locationDetailEs.readAllReviews}</a></p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="font-display text-2xl font-black text-navy">{locationDetailEs.otherLocations}</h2>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each data.others as o}<a href="/es/locations/{o.slug}" class="inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-bold text-navy shadow ring-1 ring-line hover:bg-sun">{o.name}</a>{/each}
	</div>
</section>
