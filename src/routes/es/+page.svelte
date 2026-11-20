<script lang="ts">
	import { ArrowRight, BadgeCheck, Check, Droplets, MapPin, ShieldCheck, Star, Sun, Timer, Users } from '@lucide/svelte';
	import BeforeAfter from '#lib/components/BeforeAfter.svelte';
	import Counter from '#lib/components/Counter.svelte';
	import FloridaMap from '#lib/components/FloridaMap.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TestimonialCarousel from '#lib/components/TestimonialCarousel.svelte';
	import { beforeAfter, locations, packages, ratingSummary, site } from '#lib/data/site.ts';
	import {
		breadcrumb,
		featureNames,
		homeEs,
		hreflangUrls,
		packageNames,
		packageTaglines,
		reviewsEs,
		siteEs
	} from '#lib/data/es.ts';

	$effect(() => {
		document.documentElement.lang = 'es';
	});

	const icons: Record<string, typeof Droplets> = { Droplets, ShieldCheck, Timer, BadgeCheck, Sun, Users, MapPin };
	const alt = hreflangUrls('/es', '/');
	const orgJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Florida Shine Car Wash',
		description: 'Servicios premium de lavado y detailing en Florida.',
		telephone: '+1-305-555-0198',
		email: 'hello@floridashinecarwash.com',
		logo: 'https://florida-shine-car-wash.pages.dev/images/hero-soapy-car-1200.jpg',
		sameAs: site.socials.map((s) => s.href),
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1200 Biscayne Blvd',
			addressLocality: 'Miami',
			addressRegion: 'FL',
			postalCode: '33132',
			addressCountry: 'US'
		},
		contactPoint: { '@type': 'ContactPoint', telephone: '+1-305-555-0198', contactType: 'customer service' }
	};
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [orgJsonLd, breadcrumb([{ name: 'Inicio', path: '/es' }])]
	};
</script>

<svelte:head>
	<link rel="alternate" hreflang="es" href={alt.es} />
	<link rel="alternate" hreflang="en" href={alt.en} />
	<link rel="alternate" hreflang="x-default" href={alt.xDefault} />
</svelte:head>

<Seo
	title="Florida Shine Car Wash — Auto limpio. Días más brillantes."
	description="Lavado y detailing premium en Florida, en español. Paquetes desde $16, Club de Lavado Ilimitado desde $19/mes, 8 ubicaciones de Miami a Tampa. 4.8 de 5, de más de 2,400 reseñas de Google."
	canonical="/es"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>

<!-- HERO -->
<section class="relative overflow-hidden bg-navy text-white">
	<div class="absolute inset-0" aria-hidden="true">
		<Picture src="hero-soapy-car" alt="" width={1600} height={1000} sizes="100vw" eager class="h-full w-full opacity-40" />
		<div class="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/20"></div>
		<span class="bubble absolute left-[8%] top-[18%] h-10 w-10 rounded-full bg-white/15" style="animation-delay: -1s"></span>
		<span class="bubble absolute right-[12%] top-[30%] h-16 w-16 rounded-full bg-sky/25" style="animation-delay: -2.5s"></span>
		<span class="bubble absolute bottom-[22%] right-[30%] h-6 w-6 rounded-full bg-sun/30" style="animation-delay: -0.5s"></span>
		<span class="bubble absolute left-[38%] top-[12%] h-5 w-5 rounded-full bg-white/10" style="animation-delay: -3.5s"></span>
	</div>
	<div class="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
		<h1 class="max-w-2xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
			AUTO LIMPIO.<br />DÍAS MÁS BRILLANTES.<br /><span class="text-sun">FLORIDA</span><br />BRILLA.
		</h1>
		<p class="mt-5 max-w-md text-lg leading-relaxed text-white/90">{homeEs.heroSub}</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/es/packages" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 font-black text-navy shadow-lg transition-transform hover:-translate-y-0.5">
				{homeEs.viewPackages} <ArrowRight class="h-5 w-5" aria-hidden="true" />
			</a>
			<a href="/es/locations" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-6 py-3 font-black text-white transition-colors hover:bg-white/10">
				<MapPin class="h-5 w-5" aria-hidden="true" /> {homeEs.findLocation}
			</a>
		</div>
		<p class="mt-6 flex items-center gap-2 text-sm text-white/80">
			<span class="flex text-sun" aria-hidden="true"><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /></span>
			{homeEs.ratingLine} — {ratingSummary.average} de 5, de más de {ratingSummary.totalReviews.toLocaleString('es-ES')}+ {homeEs.ratingSource}
		</p>
	</div>
</section>

<!-- TRUST STRIP -->
<section class="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6" aria-label="Por qué confiar en Florida Shine">
	<div class="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line shadow-xl shadow-navy/10 lg:grid-cols-4">
		{#each homeEs.trustItems as item, i}
			{@const TrustIcon = icons[['Droplets', 'ShieldCheck', 'Timer', 'BadgeCheck'][i]]}
			<div class="flex flex-col items-center bg-white px-4 py-6 text-center">
				<TrustIcon class="h-8 w-8 text-navy" aria-hidden="true" />
				<p class="mt-3 text-sm font-black tracking-wide text-navy"><strong>{item.title}</strong></p>
				<p class="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
			</div>
		{/each}
	</div>
</section>

<!-- MARQUEE -->
<div class="marquee mt-12 overflow-hidden bg-sun py-3" aria-hidden="true">
	<div class="marquee-track items-center text-sm font-black tracking-[0.2em] text-navy">
		{#each [0, 1] as _}
			<span class="flex shrink-0 items-center gap-8 pr-8">
				{#each homeEs.marquee as m}<span>{m}</span><span>•</span>{/each}
				<span>{locations.length} UBICACIONES EN FLORIDA</span><span>•</span>
			</span>
		{/each}
	</div>
</div>

<!-- COUNTERS -->
<section class="mx-auto max-w-7xl px-4 pt-12 sm:px-6" aria-label="Florida Shine en números">
	<div class="grid grid-cols-2 gap-6 rounded-3xl bg-white px-4 py-8 shadow-md shadow-navy/5 ring-1 ring-line lg:grid-cols-4">
		<Counter value={locations.length} label={homeEs.counters.locations} />
		<Counter value={ratingSummary.totalReviews} suffix="+" label={homeEs.counters.reviews} />
		<Counter value={ratingSummary.average} decimals={1} label={homeEs.counters.rating} />
		<Counter value={2018} grouping={false} label={homeEs.counters.since} />
	</div>
</section>

<!-- PACKAGES -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="packages-heading">
	<Reveal>
		<p class="text-center text-xs font-black tracking-[0.3em] text-navy-light">{homeEs.packagesEyebrow}</p>
		<h2 id="packages-heading" class="mt-2 text-center font-display text-4xl font-black text-navy sm:text-5xl">{homeEs.packagesHeading}</h2>
		<p class="mx-auto mt-3 max-w-xl text-center text-muted">{homeEs.packagesSub}</p>
	</Reveal>
	<div class="mt-10 grid gap-6 md:grid-cols-3">
		{#each packages as pkg}
			<article class="relative flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-navy/10 ring-1 ring-line {pkg.popular ? 'ring-2 ring-sun md:-translate-y-2' : ''}">
				{#if pkg.popular}
					<span class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-4 py-1 text-xs font-black text-navy">{homeEs.mostPopular}</span>
				{/if}
				<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full {pkg.popular ? 'bg-navy text-sun' : 'bg-sky-light text-navy'}" aria-hidden="true">
					<svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16l1.5-5A2 2 0 0 1 8.4 9.5h7.2a2 2 0 0 1 1.9 1.5L19 16" /><path d="M4 16h16v3.5H4z" /><circle cx="7.5" cy="19.5" r="1.4" /><circle cx="16.5" cy="19.5" r="1.4" /><path d="M7 12h2M15 12h2" /></svg>
				</div>
				<h3 class="mt-4 text-center font-display text-2xl font-black tracking-wide text-navy">{(packageNames[pkg.slug] ?? pkg.name).toUpperCase()}</h3>
				<p class="mt-1 text-center text-sm text-muted">{packageTaglines[pkg.slug] ?? pkg.tagline}</p>
				<p class="mt-3 text-center font-display text-4xl font-black text-navy">${pkg.price}</p>
				<ul class="mt-5 flex-1 space-y-2.5">
					{#each pkg.features as f}
						<li class="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
							<span>{(featureNames[f] ?? f).toUpperCase()}</span><Check class="h-5 w-5 shrink-0 text-sky" aria-hidden="true" />
						</li>
					{/each}
				</ul>
				<a href="/es/book?package={pkg.slug}" class="mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-black {pkg.popular ? 'bg-sun text-navy' : 'bg-sky-light text-navy'} transition-transform hover:-translate-y-0.5">{homeEs.getStarted}</a>
				<a href="/es/packages" class="mt-2 inline-flex min-h-11 items-center justify-center text-center text-sm font-bold text-navy-light underline-offset-2 hover:underline">{homeEs.seeDetails}</a>
			</article>
		{/each}
	</div>
	<p class="mt-6 text-center"><a href="/es/packages" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-navy px-6 py-3 font-black text-navy">{homeEs.compareAll} <ArrowRight class="h-5 w-5" aria-hidden="true" /></a></p>
</section>

<!-- UNLIMITED WASH CLUB -->
<section class="mx-auto max-w-7xl px-4 sm:px-6" aria-labelledby="club-heading">
	<Reveal>
		<div class="grid overflow-hidden rounded-3xl bg-navy text-white shadow-xl shadow-navy/20 md:grid-cols-2">
			<Picture src="club-car" alt="Sedán azul oscuro recién lavado saliendo de un lavado Florida Shine" width={1200} height={800} sizes="(max-width: 768px) 100vw, 50vw" class="h-56 w-full md:h-full" />
			<div class="relative flex flex-col justify-center p-6 sm:p-10">
				<h2 id="club-heading" class="font-display text-3xl font-black sm:text-4xl">{homeEs.clubHeading.replace('ILIMITADO', '')}<span class="text-sun">ILIMITADO</span></h2>
				<p class="mt-2 text-lg font-bold">{homeEs.clubSub}</p>
				<ul class="mt-4 space-y-2">
					{#each homeEs.clubPerks as perk}
						<li class="flex items-center gap-2"><span class="flex h-6 w-6 items-center justify-center rounded-full bg-sun text-navy"><Check class="h-4 w-4" aria-hidden="true" /></span>{perk}</li>
					{/each}
				</ul>
				<div class="mt-6 flex flex-wrap items-center gap-4">
					<a href="/es/memberships" class="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-black text-navy">{homeEs.joinNow}</a>
					<span class="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-sun text-center font-black text-navy shadow-lg">
						<span class="text-[0.6rem] tracking-wide">{homeEs.startingAt}</span>
						<span class="text-2xl leading-none">$19</span>
						<span class="text-[0.6rem]">{homeEs.perMonth}</span>
					</span>
				</div>
			</div>
		</div>
	</Reveal>
</section>

<!-- WHY US -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="why-heading">
	<Reveal>
		<h2 id="why-heading" class="text-center font-display text-3xl font-black text-navy sm:text-4xl">{homeEs.whyHeading}</h2>
	</Reveal>
	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each homeEs.whyItems as item, i}
			{@const WhyIcon = icons[['Sun', 'Droplets', 'Users', 'MapPin'][i]]}
			<div class="rounded-3xl bg-white p-6 text-center shadow-md shadow-navy/5 ring-1 ring-line">
				<WhyIcon class="mx-auto h-9 w-9 text-navy" aria-hidden="true" />
				<h3 class="mt-3 text-sm font-black tracking-wide text-navy">{item.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
			</div>
		{/each}
	</div>
</section>

<!-- BEFORE / AFTER -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6" aria-labelledby="ba-heading">
	<Reveal>
		<h2 id="ba-heading" class="text-center font-display text-3xl font-black text-navy sm:text-4xl">{homeEs.baHeading}</h2>
		<p class="mx-auto mt-3 max-w-xl text-center text-muted">{homeEs.baSub}</p>
		<div class="mx-auto mt-8 max-w-3xl">
			<BeforeAfter image={beforeAfter.after} beforeImage={beforeAfter.before} alt="Auto deportivo azul oscuro cubierto de espuma blanca en un lavado Florida Shine" title={homeEs.baTitle} caption={homeEs.baCaption} beforeLabel="ANTES" afterLabel="DESPUÉS" />
		</div>
		<p class="mt-6 text-center"><a href="/gallery" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 py-3 font-black text-white">{homeEs.galleryLink} <ArrowRight class="h-5 w-5" aria-hidden="true" /></a></p>
	</Reveal>
</section>

<!-- LOCATIONS -->
<section class="bg-white py-16" aria-labelledby="loc-heading">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
		<Reveal>
			<FloridaMap base="/es/locations" />
		</Reveal>
		<div>
			<p class="text-xs font-black tracking-[0.3em] text-navy-light">{homeEs.locEyebrow}</p>
			<h2 id="loc-heading" class="mt-2 font-display text-4xl font-black text-navy sm:text-5xl">{homeEs.locHeading}</h2>
			<p class="mt-4 max-w-md text-lg text-muted">{homeEs.locText}</p>
			<p class="mt-3 text-muted">{homeEs.locSub}</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/es/locations" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 font-black text-navy">{homeEs.viewAllLocations} <ArrowRight class="h-5 w-5" aria-hidden="true" /></a>
				<a href="/es/book" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">{homeEs.bookAppointment}</a>
			</div>
		</div>
	</div>
</section>

<!-- REVIEWS PREVIEW -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="rev-heading">
	<Reveal>
		<h2 id="rev-heading" class="text-center font-display text-3xl font-black text-navy sm:text-4xl">{homeEs.reviewsHeading}</h2>
	</Reveal>
	<div class="mx-auto mt-8 max-w-3xl min-w-0">
		<TestimonialCarousel
			reviews={reviewsEs}
			regionLabel="Opiniones de clientes"
			dotLabel="Opinión"
			prevLabel="Opinión anterior"
			nextLabel="Opinión siguiente"
			pauseLabel="Pausar reproducción automática"
			playLabel="Reproducir"
		/>
	</div>
	<p class="mt-6 text-center"><a href="/reviews" class="inline-flex min-h-11 items-center font-bold text-navy-light underline-offset-2 hover:underline">{homeEs.readAllReviews} →</a></p>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
	<div class="rounded-3xl bg-sun px-6 py-10 text-center text-navy shadow-xl sm:px-12">
		<h2 class="font-display text-3xl font-black sm:text-4xl">{homeEs.ctaHeading}</h2>
		<p class="mx-auto mt-3 max-w-lg">{homeEs.ctaText}</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a href="/es/book" class="inline-flex min-h-12 items-center rounded-full bg-navy px-8 py-3 font-black text-white">{homeEs.ctaBook}</a>
			<a href={siteEs.phoneHref} class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-8 py-3 font-black text-navy">{homeEs.ctaCall} {siteEs.phone}</a>
		</div>
	</div>
</section>
