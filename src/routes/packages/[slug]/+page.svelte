<script lang="ts">
	import { ArrowRight, Check, Clock, Star } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageData } from './$types';
	import { addons, faqs, memberships, reviews, sizeUpchargeNote } from '#lib/data/site.ts';
	let { data }: { data: PageData } = $props();
	const pkg = $derived(data.pkg);
	const club = $derived(
		pkg.slug === 'basic-wash' ? memberships[0] : pkg.slug === 'premium-wash' ? memberships[1] : memberships[2]
	);
	const review = $derived(reviews.find((r) => r.service === pkg.name) ?? reviews[0]);
	const relatedFaqs = $derived(faqs.filter((f) => f.category === 'Wash').slice(0, 3));
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Product',
				name: `${pkg.name} — Florida Shine Car Wash`,
				description: pkg.description,
				offers: { '@type': 'Offer', price: pkg.price, priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
					{ '@type': 'ListItem', position: 2, name: 'Packages', item: 'https://florida-shine-car-wash.pages.dev/packages' },
					{ '@type': 'ListItem', position: 3, name: pkg.name, item: `https://florida-shine-car-wash.pages.dev/packages/${pkg.slug}` }
				]
			}
		]
	});
</script>

<Seo
	title="{pkg.name} — ${pkg.price} | Florida Shine Car Wash"
	description="{pkg.name} at Florida Shine: {pkg.tagline} {pkg.description} {pkg.duration}. Book online or drive in at any of our 8 Florida locations."
	canonical="/packages/{pkg.slug}"
	ogImage={pkg.image}
	type="product"
	jsonLd={jsonLd}
/>
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
		<p class="mt-2 text-sm text-muted">{sizeUpchargeNote}</p>
		<p class="mt-2 rounded-2xl bg-sky-light px-4 py-3 text-sm font-bold text-navy">
			Wash unlimited instead: {club.breakEven} with {club.name} (${club.price}/mo). {club.billing}; {club.recognition}; {club.dailyLimit}.
		</p>
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

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="addons-heading">
	<h2 id="addons-heading" class="font-display text-2xl font-black text-navy">Add something extra</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each addons.slice(0, 4) as a}
			<article class="rounded-3xl bg-white p-5 shadow ring-1 ring-line">
				<h3 class="font-black text-navy">{a.name}</h3>
				<p class="mt-1 text-sm text-muted">{a.note}</p>
				<p class="mt-3 font-display text-xl font-black text-navy">${a.price} <span class="text-xs font-bold text-muted">· {a.time}</span></p>
				<a href="/book?package={pkg.slug}" class="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-navy-light underline-offset-2 hover:underline">Add when you book →</a>
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
			<h2 class="font-display text-2xl font-black text-navy">What drivers say</h2>
			<blockquote class="mt-4 rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<p class="flex gap-0.5 text-sun" aria-label="{review.rating} out of 5 stars">
					{#each Array(review.rating) as _}<Star class="h-4 w-4 fill-current" aria-hidden="true" />{/each}
				</p>
				<p class="mt-3 leading-relaxed">"{review.text}"</p>
				<footer class="mt-4 text-sm"><strong class="text-navy">{review.name}</strong> <span class="text-muted">· {review.city} · {review.service} · {review.date}</span></footer>
			</blockquote>
			<p class="mt-4"><a href="/reviews" class="inline-flex min-h-11 items-center font-bold text-navy-light underline-offset-2 hover:underline">Read all reviews →</a></p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="font-display text-2xl font-black text-navy">Other packages</h2>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each data.others as o}<a href="/packages/{o.slug}" class="inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-bold text-navy shadow ring-1 ring-line hover:bg-sun">{o.name} — ${o.price}</a>{/each}
	</div>
</section>
