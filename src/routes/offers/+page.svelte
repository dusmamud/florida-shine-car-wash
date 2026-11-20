<script lang="ts">
	import { BadgePercent, CloudRain, Gift, Star } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { loyalty, memberships, offers } from '#lib/data/site.ts';

	const icons = [Gift, BadgePercent, CloudRain];
	const premium = memberships.find((m) => m.slug === 'premium-club') ?? memberships[1];
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Offers', item: 'https://florida-shine-car-wash.pages.dev/offers' }
		]
	};
</script>

<Seo
	title="Offers & Deals — Florida Shine Car Wash"
	description="Florida Shine offers: first wash free with code SHINEFREE, first month of Premium Club 50% off ($14.50, then $29/mo), and a free rain-check rewash within 48 hours of rain."
	canonical="/offers"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="OFFERS"
	title="Deals Worth Driving In For"
	subtitle="First wash free, half-price first month of Premium Club, and a free rewash if Florida rain ruins your shine. Terms are written under each offer — no surprises."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 lg:grid-cols-3">
		{#each offers as offer, i}
			<article class="flex flex-col rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				{#if icons[i]}
					{@const Icon = icons[i]}
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-sun/40 text-navy"><Icon class="h-6 w-6" aria-hidden="true" /></span>
				{/if}
				<h2 class="mt-4 font-display text-2xl font-black text-navy">{offer.title}</h2>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{offer.detail}</p>
				{#if offer.slug === 'premium-club-half-price'}
					<div class="mt-4 rounded-2xl bg-sky-light p-4 text-sm">
						<p class="font-black text-navy">Full price after month one: ${premium.price}/mo</p>
						<p class="mt-1 text-muted">Renews at ${premium.price}/mo on your join-date anniversary each month. {premium.billing}. {premium.dailyLimit}.</p>
					</div>
				{/if}
				<p class="mt-4 rounded-2xl bg-mist p-4 text-xs leading-relaxed text-muted"><strong class="text-navy">Terms:</strong> {offer.terms}</p>
				{#if offer.slug === 'first-wash-free'}
					<a href="/book?promo=SHINEFREE" class="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white">BOOK YOUR FREE WASH</a>
				{:else if offer.slug === 'premium-club-half-price'}
					<a href="/memberships" class="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">JOIN PREMIUM CLUB — $14.50 FIRST MONTH</a>
				{:else}
					<a href="/faq" class="mt-5 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-navy px-6 py-3 text-sm font-black text-navy">HOW THE RAIN-CHECK WORKS</a>
				{/if}
			</article>
		{/each}
	</div>

	<article class="mt-6 flex flex-col gap-4 rounded-3xl bg-navy p-6 text-white shadow sm:flex-row sm:items-center sm:justify-between sm:p-8">
		<div>
			<p class="flex items-center gap-2 font-display text-2xl font-black"><Star class="h-6 w-6 text-sun" aria-hidden="true" /> {loyalty.name} — rewards, not a membership</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">{loyalty.model} {loyalty.referral} {loyalty.birthday} {loyalty.note}</p>
		</div>
		<a href="/loyalty" class="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">SEE LOYALTY REWARDS</a>
	</article>
	<p class="mt-6 text-center text-sm text-muted">Offers cannot be combined unless the terms say so. Prices in US dollars. Questions? Call (305) 555-0198.</p>
</section>
