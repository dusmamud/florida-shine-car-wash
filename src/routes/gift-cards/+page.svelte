<script lang="ts">
	import { Gift, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { giftCards } from '#lib/data/site.ts';
	let picked = $state(50);
	let done = $state(false);
</script>
<svelte:head><title>Gift Cards — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="GIVE THE SHINE" title="Gift Cards" subtitle="A clean car is always the right gift. Gift cards from $25 to $200, valid at all 8 Florida locations, and they never expire." />
<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each giftCards as g}
			<button type="button" onclick={() => { picked = g.amount; done = false; }} aria-pressed={picked === g.amount} class="rounded-3xl bg-white p-6 text-left shadow ring-1 ring-line {picked === g.amount ? 'ring-2 ring-sun' : ''}">
				<Gift class="h-8 w-8 text-navy" aria-hidden="true" />
				<p class="mt-3 font-display text-4xl font-black text-navy">${g.amount}</p>
				<p class="mt-1 text-sm text-muted">{g.note}</p>
			</button>
		{/each}
	</div>
	<div class="mt-8 rounded-3xl bg-navy p-6 text-white shadow-xl sm:p-8">
		{#if done}
			<div role="status">
				<p class="font-display text-2xl font-black">Gift card request noted!</p>
				<p class="mt-2 text-white/85">This is a mock request — no payment was taken. To buy a ${picked} gift card for real, call <a class="font-bold text-sun" href="tel:+13055550198">(305) 555-0198</a> or pick one up at any Florida Shine location. We'll have it ready in minutes.</p>
			</div>
		{:else}
			<h2 class="font-display text-2xl font-black">Get a ${picked} gift card</h2>
			<p class="mt-2 text-white/85">No payment online — buy by phone or in-store. Tell us it's a gift and we'll wrap it with a wash voucher.</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<button type="button" onclick={() => (done = true)} class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 font-black text-navy"><Gift class="h-5 w-5" aria-hidden="true" /> REQUEST ${picked} GIFT CARD</button>
				<a href="tel:+13055550198" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-6 py-3 font-black text-white"><Phone class="h-5 w-5" aria-hidden="true" /> CALL TO BUY</a>
			</div>
		{/if}
	</div>
</section>
