<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { team } from '#lib/data/site.ts';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://florida-shine-car-wash.pages.dev/about' }
		]
	};
</script>
<Seo
	title="About Us — Florida Shine Car Wash"
	description="Florida Shine started in 2018 with one wash tunnel in Miami. Now 8 locations from Miami to Jacksonville, with eco-safe soaps, reclaimed water and a team that treats every car like its own."
	canonical="/about"
	ogImage="about-team"
	jsonLd={jsonLd}
/>
<PageHero eyebrow="ABOUT US" title="Born in Florida, Built for Florida" subtitle="Florida Shine started in 2018 with one wash tunnel in Miami and a simple idea: a clean car should be fast, affordable and kind to the planet." />
<section class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<Picture src="about-team" alt="The Florida Shine team beside a freshly washed car" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" eager class="h-72 w-full overflow-hidden rounded-3xl sm:h-96" />
	<div>
		<h2 class="font-display text-3xl font-black text-navy">Our story</h2>
		<p class="mt-4 leading-relaxed text-muted">Miami sun, salt air and beach sand are brutal on paint. We built Florida Shine to fight back — soft-touch foam, filtered recycled water, spot-free rinses and waxes made for Florida weather. What started as one tunnel is now 8 locations from Miami to Jacksonville, and the standard has never changed: if we wouldn't park it in our own driveway, it doesn't leave the wash.</p>
		<h2 class="mt-8 font-display text-3xl font-black text-navy">Our eco promise</h2>
		<ul class="mt-4 space-y-2 text-muted">
			<li>• Wash water is reclaimed and filtered for reuse wherever our systems allow — no percentage claimed, because it varies by location and season.</li>
			<li>• Biodegradable, eco-safe soaps — safe for Florida's waterways.</li>
			<li>• Nothing from the wash goes into storm drains — wash water is captured and treated.</li>
			<li>• LED lighting and solar panels at our newest locations.</li>
			<li>• Free vacuums, so you skip the single-use wipes.</li>
		</ul>
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="text-center font-display text-3xl font-black text-navy">Meet the Team</h2>
	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each team as t}
			<article class="overflow-hidden rounded-3xl bg-white shadow ring-1 ring-line">
				<Picture src={t.photo} alt="Portrait of {t.name}, {t.role} at Florida Shine" width={800} height={800} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" class="aspect-square w-full" />
				<div class="p-6">
					<h3 class="font-black text-navy">{t.name}</h3>
					<p class="text-sm font-bold text-navy-light">{t.role}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted">{t.bio}</p>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-10 text-center"><a href="/careers" class="inline-flex min-h-12 items-center rounded-full bg-navy px-8 py-3 font-black text-white">Join our team</a></p>
</section>
