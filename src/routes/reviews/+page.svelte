<script lang="ts">
	import { Star } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { reviews } from '#lib/data/site.ts';
	const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
</script>
<svelte:head><title>Reviews — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="WHAT DRIVERS SAY" title="Customer Reviews" subtitle="Real words from Florida drivers who washed with us. Ratings shown here are from our mock review set." />
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="mx-auto max-w-md rounded-3xl bg-navy p-6 text-center text-white shadow-xl">
		<p class="font-display text-5xl font-black text-sun">{avg} <span class="text-2xl">/ 5</span></p>
		<p class="mt-2 flex justify-center gap-0.5 text-sun" aria-hidden="true">{#each Array(5) as _}<Star class="h-5 w-5 fill-current" />{/each}</p>
		<p class="mt-2 text-sm text-white/80">Average across {reviews.length} mock reviews</p>
	</div>
	<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each reviews as r}
			<blockquote class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<p class="flex gap-0.5 text-sun" aria-label="{r.rating} out of 5 stars">{#each Array(r.rating) as _}<Star class="h-4 w-4 fill-current" aria-hidden="true" />{/each}</p>
				<p class="mt-3 leading-relaxed">"{r.text}"</p>
				<footer class="mt-4 text-sm"><strong class="text-navy">{r.name}</strong> <span class="text-muted">· {r.city} · {r.service}</span></footer>
			</blockquote>
		{/each}
	</div>
	<p class="mt-10 text-center"><a href="/book" class="inline-flex min-h-12 items-center rounded-full bg-sun px-8 py-3 font-black text-navy">Experience it yourself — book a wash</a></p>
</section>
