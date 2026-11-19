<script lang="ts">
	import { ArrowRight, Check, Clock, ShieldCheck, Star } from '@lucide/svelte';
	import BeforeAfter from '#lib/components/BeforeAfter.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageData } from './$types';
	import { addons, beforeAfter, faqs, reviews } from '#lib/data/site.ts';
	let { data }: { data: PageData } = $props();
	const s = $derived(data.service);
	const review = $derived(reviews.find((r) => r.service === s.name) ?? reviews[0]);
	const relatedFaqs = $derived(faqs.filter((f) => f.category === 'Wash' || f.category === 'Booking').slice(0, 3));
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Product',
				name: `${s.name} — Florida Shine Car Wash`,
				description: s.description,
				offers: { '@type': 'Offer', price: s.priceFrom, priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: 'https://florida-shine-car-wash.pages.dev/services' },
					{ '@type': 'ListItem', position: 3, name: s.name, item: `https://florida-shine-car-wash.pages.dev/services/${s.slug}` }
				]
			}
		]
	});
</script>

<Seo
	title="{s.name} — Florida Shine Car Wash"
	description="{s.name} at Florida Shine: {s.short} From ${s.priceFrom}, {s.duration}. Book online or drive in at any of our 8 Florida locations."
	canonical="/services/{s.slug}"
	ogImage={s.image}
	type="product"
	jsonLd={jsonLd}
/>
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

{#if s.process}
	<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="process-heading">
		<h2 id="process-heading" class="font-display text-3xl font-black text-navy">How it works — step by step</h2>
		<ol class="mt-6 grid gap-4 md:grid-cols-2">
			{#each s.process as step, i}
				<li class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
					<p class="flex h-10 w-10 items-center justify-center rounded-full bg-sun font-display text-lg font-black text-navy" aria-hidden="true">{i + 1}</p>
					<p class="mt-3 leading-relaxed text-muted">{step}</p>
				</li>
			{/each}
		</ol>
	</section>
	<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
		<div class="grid gap-8 lg:grid-cols-2">
			<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-black text-navy">Spray ceramic vs professional coating</h2>
				<p class="mt-3 leading-relaxed text-muted">{s.sprayVsPro}</p>
				<h3 class="mt-6 font-display text-xl font-black text-navy">Aftercare</h3>
				<p class="mt-2 leading-relaxed text-muted">{s.aftercare}</p>
				{#if s.warranty}
					<p class="mt-4 flex items-start gap-2 rounded-2xl bg-sky-light p-4 text-sm font-bold text-navy"><ShieldCheck class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> {s.warranty}</p>
				{/if}
			</div>
			<div>
				<h2 class="font-display text-2xl font-black text-navy">Before &amp; after</h2>
				<div class="mt-4">
					<BeforeAfter image={beforeAfter.after} beforeImage={beforeAfter.before} alt="Dark blue sports car covered in white soap foam at a Florida car wash" title="Ceramic coating finish" caption={beforeAfter.caption} />
				</div>
				{#if s.limits}
					<h3 class="mt-6 font-display text-xl font-black text-navy">Honest limits</h3>
					<ul class="mt-3 space-y-2 text-sm leading-relaxed text-muted">
						{#each s.limits as l}<li class="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-line">{l}</li>{/each}
					</ul>
				{/if}
			</div>
		</div>
	</section>
{/if}

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="addons-heading">
	<h2 id="addons-heading" class="font-display text-2xl font-black text-navy">Add something extra</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each addons.slice(0, 4) as a}
			<article class="rounded-3xl bg-white p-5 shadow ring-1 ring-line">
				<h3 class="font-black text-navy">{a.name}</h3>
				<p class="mt-1 text-sm text-muted">{a.note}</p>
				<p class="mt-3 font-display text-xl font-black text-navy">${a.price} <span class="text-xs font-bold text-muted">· {a.time}</span></p>
				<a href="/book?service={s.slug}" class="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-navy-light underline-offset-2 hover:underline">Add when you book →</a>
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
	<h2 class="font-display text-2xl font-black text-navy">More services</h2>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each data.others as o}<a href="/services/{o.slug}" class="inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-bold text-navy shadow ring-1 ring-line hover:bg-sun">{o.name}</a>{/each}
	</div>
</section>
