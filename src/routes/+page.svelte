<script lang="ts">
	import { ArrowRight, BadgeCheck, Check, Droplets, MapPin, ShieldCheck, Star, Sun, Timer, Users } from '@lucide/svelte';
	import { animate, press } from 'motion';
	import BeforeAfter from '#lib/components/BeforeAfter.svelte';
	import Counter from '#lib/components/Counter.svelte';
	import FloridaMap from '#lib/components/FloridaMap.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TestimonialCarousel from '#lib/components/TestimonialCarousel.svelte';
	import { beforeAfter, gallery, locations, packages, ratingSummary, reviews, site, trustItems, whyItems } from '#lib/data/site.ts';

	// Hero entrance (GSAP, home only, dynamically imported so no timeline JS
	// ships on other pages). The hero elements do NOT use .reveal, so the
	// gsap.from() opacity tween can never fight Reveal.svelte (Kanigiri
	// lesson). Content is visible by default; the tween only runs in JS.
	let heroEl: HTMLElement | undefined = $state();
	$effect(() => {
		if (!heroEl) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let ctx: { revert: () => void } | undefined;
		let cancelled = false;
		import('gsap').then((mod) => {
			if (cancelled) return;
			const gsap = mod.default;
			ctx = gsap.context(() => {
				gsap.from('[data-hero-animate]', {
					y: 16,
					opacity: 0,
					duration: 0.35,
					stagger: 0.08,
					ease: 'power3.out',
					clearProps: 'all'
				});
			}, heroEl);
		});
		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});

	// Motion `press` micro-interaction on the hero primary CTA: a small scale
	// dip while pressed (transform only, keyboard-accessible via Motion).
	// Skipped entirely under reduced motion.
	function pressScale(element: HTMLElement) {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
		return press(element, () => {
			animate(element, { scale: 0.96 }, { type: 'spring', stiffness: 500, damping: 30 });
			return () => animate(element, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 30 });
		});
	}

	const icons: Record<string, typeof Droplets> = { Droplets, ShieldCheck, Timer, BadgeCheck, Sun, Users, MapPin };
	const orgJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Florida Shine Car Wash',
		description: 'Premium car wash & detailing services in Florida.',
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
</script>

<Seo
	title="Florida Shine Car Wash — Clean Car. Brighter Days."
	description="Premium car wash & detailing across Florida. Wash packages from $16, Unlimited Wash Club from $19/mo, 8 locations from Miami to Tampa. 4.8 out of 5 from 2,400+ Google reviews."
	canonical="/"
	ogImage="hero-soapy-car"
	jsonLd={orgJsonLd}
/>

<!-- HERO -->
<section bind:this={heroEl} class="relative overflow-hidden bg-navy text-white">
	<div class="absolute inset-0" aria-hidden="true">
		<Picture src="hero-soapy-car" alt="" width={1600} height={1000} sizes="100vw" eager class="h-full w-full opacity-40" />
		<div class="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/20"></div>
		<!-- Soap-bubble decorations (existing .bubble CSS: transform-only drift) -->
		<span class="bubble absolute left-[8%] top-[18%] h-10 w-10 rounded-full bg-white/15" style="animation-delay: -1s"></span>
		<span class="bubble absolute right-[12%] top-[30%] h-16 w-16 rounded-full bg-sky/25" style="animation-delay: -2.5s"></span>
		<span class="bubble absolute bottom-[22%] right-[30%] h-6 w-6 rounded-full bg-sun/30" style="animation-delay: -0.5s"></span>
		<span class="bubble absolute left-[38%] top-[12%] h-5 w-5 rounded-full bg-white/10" style="animation-delay: -3.5s"></span>
	</div>
	<div class="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
		<h1 data-hero-animate class="max-w-2xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
			CLEAN CAR.<br />BRIGHTER DAYS.<br /><span class="text-sun">FLORIDA</span><br />SHINES.
		</h1>
		<p data-hero-animate class="mt-5 max-w-md text-lg leading-relaxed text-white/90">Premium car wash &amp; detailing services in Florida.</p>
		<div data-hero-animate class="mt-8 flex flex-wrap gap-3">
			<a href="/packages" {@attach pressScale} class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 font-black text-navy shadow-lg transition-transform hover:-translate-y-0.5">
				VIEW PACKAGES <ArrowRight class="h-5 w-5" aria-hidden="true" />
			</a>
			<a href="/locations" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-6 py-3 font-black text-white transition-colors hover:bg-white/10">
				<MapPin class="h-5 w-5" aria-hidden="true" /> FIND A LOCATION
			</a>
		</div>
		<p data-hero-animate class="mt-6 flex items-center gap-2 text-sm text-white/80">
			<span class="flex text-sun" aria-hidden="true"><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /><Star class="h-4 w-4 fill-current" /></span>
			Loved by Florida drivers — {ratingSummary.average} out of 5 from {ratingSummary.totalReviews.toLocaleString('en-US')}+ {ratingSummary.source}
		</p>
	</div>
</section>

<!-- TRUST STRIP -->
<section class="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6" aria-label="Why trust Florida Shine">
	<div class="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line shadow-xl shadow-navy/10 lg:grid-cols-4">
		{#each trustItems as item}
			{@const TrustIcon = icons[item.icon]}
			<div class="flex flex-col items-center bg-white px-4 py-6 text-center">
				<TrustIcon class="h-8 w-8 text-navy" aria-hidden="true" />
				<p class="mt-3 text-sm font-black tracking-wide text-navy"><strong>{item.title}</strong></p>
				<p class="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
			</div>
		{/each}
	</div>
</section>

<!-- MARQUEE (existing .marquee/.marquee-track CSS: transform-only loop, pauses on hover) -->
<div class="marquee mt-12 overflow-hidden bg-sun py-3" aria-hidden="true">
	<div class="marquee-track items-center text-sm font-black tracking-[0.2em] text-navy">
		{#each [0, 1] as _}
			<span class="flex shrink-0 items-center gap-8 pr-8">
				<span>FREE VACUUMS</span><span>•</span>
				<span>SPOT-FREE RINSE</span><span>•</span>
				<span>SOFT-TOUCH FOAM</span><span>•</span>
				<span>RAIN-CHECK REWASH</span><span>•</span>
				<span>OPEN 7 DAYS</span><span>•</span>
				<span>{locations.length} FLORIDA LOCATIONS</span><span>•</span>
			</span>
		{/each}
	</div>
</div>

<!-- COUNTERS — numbers from site data only: locations, Google reviews, rating, founded 2018 (team bio) -->
<section class="mx-auto max-w-7xl px-4 pt-12 sm:px-6" aria-label="Florida Shine by the numbers">
	<div class="grid grid-cols-2 gap-6 rounded-3xl bg-white px-4 py-8 shadow-md shadow-navy/5 ring-1 ring-line lg:grid-cols-4">
		<Counter value={locations.length} label="LOCATIONS ACROSS FLORIDA" />
		<Counter value={ratingSummary.totalReviews} suffix="+" label="GOOGLE REVIEWS" />
		<Counter value={ratingSummary.average} decimals={1} label="AVERAGE RATING" />
		<Counter value={2018} grouping={false} label="SHINING SINCE" />
	</div>
</section>

<!-- PACKAGES -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="packages-heading">
	<Reveal>
		<p class="text-center text-xs font-black tracking-[0.3em] text-navy-light">— CHOOSE YOUR SHINE —</p>
		<h2 id="packages-heading" class="mt-2 text-center font-display text-4xl font-black text-navy sm:text-5xl">WASH PACKAGES</h2>
		<p class="mx-auto mt-3 max-w-xl text-center text-muted">Every wash includes our soft-touch foam, spot-free rinse and a smile. Upgrade anytime at the wash.</p>
	</Reveal>
	<div class="mt-10 grid gap-6 md:grid-cols-3">
		{#each packages as pkg}
			<article class="relative flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-navy/10 ring-1 ring-line {pkg.popular ? 'ring-2 ring-sun md:-translate-y-2' : ''}">
				{#if pkg.popular}
					<span class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-4 py-1 text-xs font-black text-navy">MOST POPULAR</span>
				{/if}
				<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full {pkg.popular ? 'bg-navy text-sun' : 'bg-sky-light text-navy'}" aria-hidden="true">
					<svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16l1.5-5A2 2 0 0 1 8.4 9.5h7.2a2 2 0 0 1 1.9 1.5L19 16" /><path d="M4 16h16v3.5H4z" /><circle cx="7.5" cy="19.5" r="1.4" /><circle cx="16.5" cy="19.5" r="1.4" /><path d="M7 12h2M15 12h2" /></svg>
				</div>
				<h3 class="mt-4 text-center font-display text-2xl font-black tracking-wide text-navy">{pkg.name.toUpperCase()}</h3>
				<p class="mt-1 text-center text-sm text-muted">{pkg.tagline}</p>
				<p class="mt-3 text-center font-display text-4xl font-black text-navy">${pkg.price}</p>
				<ul class="mt-5 flex-1 space-y-2.5">
					{#each pkg.features as f}
						<li class="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
							<span>{f.toUpperCase()}</span><Check class="h-5 w-5 shrink-0 text-sky" aria-hidden="true" />
						</li>
					{/each}
				</ul>
				<a href="/book?package={pkg.slug}" class="mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-black {pkg.popular ? 'bg-sun text-navy' : 'bg-sky-light text-navy'} transition-transform hover:-translate-y-0.5">GET STARTED</a>
				<a href="/packages/{pkg.slug}" class="mt-2 inline-flex min-h-11 items-center justify-center text-center text-sm font-bold text-navy-light underline-offset-2 hover:underline">See full details</a>
			</article>
		{/each}
	</div>
	<p class="mt-6 text-center"><a href="/packages" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-navy px-6 py-3 font-black text-navy">Compare all packages &amp; add-ons <ArrowRight class="h-5 w-5" aria-hidden="true" /></a></p>
</section>

<!-- UNLIMITED WASH CLUB -->
<section class="mx-auto max-w-7xl px-4 sm:px-6" aria-labelledby="club-heading">
	<Reveal>
		<div class="grid overflow-hidden rounded-3xl bg-navy text-white shadow-xl shadow-navy/20 md:grid-cols-2">
			<Picture src="club-car" alt="Clean dark blue sedan driving away from a Florida Shine car wash" width={1200} height={800} sizes="(max-width: 768px) 100vw, 50vw" class="h-56 w-full md:h-full" />
			<div class="relative flex flex-col justify-center p-6 sm:p-10">
				<h2 id="club-heading" class="font-display text-3xl font-black sm:text-4xl">UNLIMITED <span class="text-sun">WASH CLUB</span></h2>
				<p class="mt-2 text-lg font-bold">Wash as often as you want!</p>
				<ul class="mt-4 space-y-2">
					{#each ['Unlimited washes', 'Cancel anytime', 'Exclusive member perks'] as perk}
						<li class="flex items-center gap-2"><span class="flex h-6 w-6 items-center justify-center rounded-full bg-sun text-navy"><Check class="h-4 w-4" aria-hidden="true" /></span>{perk}</li>
					{/each}
				</ul>
				<div class="mt-6 flex flex-wrap items-center gap-4">
					<a href="/memberships" class="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-black text-navy">JOIN NOW</a>
					<span class="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-sun text-center font-black text-navy shadow-lg">
						<span class="text-[0.6rem] tracking-wide">STARTING AT</span>
						<span class="text-2xl leading-none">$19</span>
						<span class="text-[0.6rem]">/MO</span>
					</span>
				</div>
			</div>
		</div>
	</Reveal>
</section>

<!-- WHY US -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="why-heading">
	<Reveal>
		<h2 id="why-heading" class="text-center font-display text-3xl font-black text-navy sm:text-4xl">WHY FLORIDA DRIVERS CHOOSE US</h2>
	</Reveal>
	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each whyItems as item}
			{@const WhyIcon = icons[item.icon]}
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
		<h2 id="ba-heading" class="text-center font-display text-3xl font-black text-navy sm:text-4xl">SEE THE SHINE</h2>
		<p class="mx-auto mt-3 max-w-xl text-center text-muted">Drag the slider to see the difference a Florida Shine wash makes.</p>
		<div class="mx-auto mt-8 max-w-3xl">
			<BeforeAfter image={beforeAfter.after} beforeImage={beforeAfter.before} alt="Dark blue sports car covered in white soap foam at a Florida car wash" title="Triple foam wash" caption={beforeAfter.caption} />
		</div>
		<p class="mt-6 text-center"><a href="/gallery" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 py-3 font-black text-white">View the full gallery <ArrowRight class="h-5 w-5" aria-hidden="true" /></a></p>
	</Reveal>
</section>

<!-- LOCATIONS -->
<section class="bg-white py-16" aria-labelledby="loc-heading">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
		<Reveal>
			<FloridaMap />
		</Reveal>
		<div>
			<p class="text-xs font-black tracking-[0.3em] text-navy-light">CLOSE TO YOU</p>
			<h2 id="loc-heading" class="mt-2 font-display text-4xl font-black text-navy sm:text-5xl">FIND A LOCATION NEAR YOU</h2>
			<p class="mt-4 max-w-md text-lg text-muted">From Miami to Tampa, we're here to keep Florida shining.</p>
			<p class="mt-3 text-muted">8 locations across Florida — open 7 days a week, with free vacuums and friendly local teams at every wash.</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/locations" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 font-black text-navy">VIEW ALL LOCATIONS <ArrowRight class="h-5 w-5" aria-hidden="true" /></a>
				<a href="/book" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">Book an Appointment</a>
			</div>
		</div>
	</div>
</section>

<!-- REVIEWS PREVIEW -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="rev-heading">
	<Reveal>
		<h2 id="rev-heading" class="text-center font-display text-3xl font-black text-navy sm:text-4xl">FLORIDA DRIVERS LOVE THE SHINE</h2>
	</Reveal>
	<div class="mx-auto mt-8 max-w-3xl min-w-0">
		<TestimonialCarousel reviews={reviews} />
	</div>
	<p class="mt-6 text-center"><a href="/reviews" class="inline-flex min-h-11 items-center font-bold text-navy-light underline-offset-2 hover:underline">Read all reviews →</a></p>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
	<div class="rounded-3xl bg-sun px-6 py-10 text-center text-navy shadow-xl sm:px-12">
		<h2 class="font-display text-3xl font-black sm:text-4xl">READY TO SHINE?</h2>
		<p class="mx-auto mt-3 max-w-lg">Book a wash or detail in under two minutes — or just drive in. Your car will thank you.</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a href="/book" class="inline-flex min-h-12 items-center rounded-full bg-navy px-8 py-3 font-black text-white">BOOK AN APPOINTMENT</a>
			<a href={site.phoneHref} class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-8 py-3 font-black text-navy">CALL {site.phone}</a>
		</div>
	</div>
</section>
