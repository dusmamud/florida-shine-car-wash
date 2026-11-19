<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { team } from '#lib/data/site.ts';
</script>
<svelte:head><title>About Us — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="ABOUT US" title="Born in Florida, Built for Florida" subtitle="Florida Shine started in 2018 with one wash tunnel in Miami and a simple idea: a clean car should be fast, affordable and kind to the planet." />
<section class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<Picture src="about-team" alt="The Florida Shine team beside a freshly washed car" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" eager class="h-72 w-full overflow-hidden rounded-3xl sm:h-96" />
	<div>
		<h2 class="font-display text-3xl font-black text-navy">Our story</h2>
		<p class="mt-4 leading-relaxed text-muted">Miami sun, salt air and beach sand are brutal on paint. We built Florida Shine to fight back — soft-touch foam, filtered recycled water, spot-free rinses and waxes made for Florida weather. What started as one tunnel is now 8 locations from Miami to Jacksonville, and the standard has never changed: if we wouldn't park it in our own driveway, it doesn't leave the wash.</p>
		<h2 class="mt-8 font-display text-3xl font-black text-navy">Our eco promise</h2>
		<ul class="mt-4 space-y-2 text-muted">
			<li>• Up to 80% of wash water is reclaimed and filtered for reuse.</li>
			<li>• Biodegradable, eco-safe soaps — safe for Florida's waterways.</li>
			<li>• LED lighting and solar panels at our newest locations.</li>
			<li>• Free vacuums, so you skip the single-use wipes.</li>
		</ul>
	</div>
</section>
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
	<h2 class="text-center font-display text-3xl font-black text-navy">Meet the Team</h2>
	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each team as t}
			<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-xl font-black text-sun" aria-hidden="true">{t.name.split(' ').map((w) => w[0]).join('')}</span>
				<h3 class="mt-4 font-black text-navy">{t.name}</h3>
				<p class="text-sm font-bold text-navy-light">{t.role}</p>
				<p class="mt-2 text-sm leading-relaxed text-muted">{t.bio}</p>
			</article>
		{/each}
	</div>
	<p class="mt-10 text-center"><a href="/careers" class="inline-flex min-h-12 items-center rounded-full bg-navy px-8 py-3 font-black text-white">Join our team</a></p>
</section>
