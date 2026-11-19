<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { loyalty } from '#lib/data/site.ts';

	const stamps = [1, 2, 3, 4, 5, 6, 7, 8];
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Loyalty', item: 'https://florida-shine-car-wash.pages.dev/loyalty' }
		]
	};
</script>

<Seo
	title="Shine Rewards Loyalty — Florida Shine Car Wash"
	description="Shine Rewards: 1 stamp per wash, 8 stamps earns a free Basic Wash, stamps expire after 12 months, give $5 get $5 referral, and a free wash in your birthday month."
	canonical="/loyalty"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="LOYALTY"
	title="Shine Rewards"
	subtitle="Our loyalty programme for pay-per-wash drivers — stamps, referrals and a birthday wash. It is separate from the Unlimited Wash Club, so you are never paying twice for the same thing."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 lg:grid-cols-3">
		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8 lg:col-span-2">
			<h2 class="font-display text-2xl font-black text-navy">How stamps work</h2>
			<p class="mt-2 leading-relaxed text-muted">{loyalty.model} Show your Shine Rewards card — or give the phone number on your account — at the wash and we stamp it for you.</p>
			<div class="mt-6 flex flex-wrap gap-3" aria-label="Stamp card: 8 stamps earn a free Basic Wash">
				{#each stamps as n}
					<span class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-navy/40 font-display text-lg font-black text-navy {n === 8 ? 'border-solid border-sun bg-sun text-navy' : ''}">{n === 8 ? 'FREE' : n}</span>
				{/each}
			</div>
			<p class="mt-4 text-sm font-bold text-navy">8th stamp = a free Basic Wash.</p>
			<p class="mt-1 text-sm text-muted">{loyalty.stampExpiry} Stamps are earned on paid washes only — a free wash does not earn a stamp.</p>
		</article>
		<article class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8">
			<h2 class="font-display text-2xl font-black">Birthday wash</h2>
			<p class="mt-2 text-sm leading-relaxed text-white/80">{loyalty.birthday} Tell us your birthday when you join Shine Rewards and we will send your free-wash code in your birthday month.</p>
			<h2 class="mt-6 font-display text-2xl font-black">Refer a friend</h2>
			<p class="mt-2 text-sm leading-relaxed text-white/80">{loyalty.referral}</p>
		</article>
	</div>

	<div class="mt-6 rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-black text-navy">Rewards or Club — which fits you?</h2>
		<div class="mt-4 grid gap-4 md:grid-cols-2">
			<div class="rounded-2xl bg-mist p-5">
				<h3 class="font-black text-navy">Shine Rewards — wash occasionally</h3>
				<p class="mt-1 text-sm leading-relaxed text-muted">Pay per wash, collect stamps, and get a free Basic Wash every 8th wash. Best if you wash a few times a month.</p>
			</div>
			<div class="rounded-2xl bg-mist p-5">
				<h3 class="font-black text-navy">Unlimited Wash Club — wash often</h3>
				<p class="mt-1 text-sm leading-relaxed text-muted">From $19/mo for unlimited washes. Best if you wash twice a month or more — the Club pays for itself in 2 washes. <a href="/memberships" class="font-bold text-navy underline underline-offset-2">Compare Club plans</a>.</p>
			</div>
		</div>
		<p class="mt-4 text-sm text-muted">{loyalty.note}</p>
		<div class="mt-5 flex flex-col gap-3 sm:flex-row">
			<a href="/offers" class="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">SEE CURRENT OFFERS</a>
			<a href="/book" class="inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white">BOOK A WASH &amp; EARN A STAMP</a>
		</div>
	</div>
</section>
