<script lang="ts">
	import { Gift, Phone } from '@lucide/svelte';
	import GiftMembership from '#lib/components/GiftMembership.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { giftCards } from '#lib/data/site.ts';
	let picked = $state(50);
	let done = $state(false);
	let recipientName = $state('');
	let recipientEmail = $state('');
	let senderName = $state('');
	let message = $state('');
	let delivery = $state('Email');
	let errorMsg = $state('');

	function request(e: SubmitEvent) {
		e.preventDefault();
		if (!recipientName.trim() || !senderName.trim()) {
			errorMsg = 'Please add the recipient and sender names.';
			return;
		}
		if (delivery === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
			errorMsg = 'For email delivery, please enter a valid recipient email address.';
			return;
		}
		errorMsg = '';
		done = true;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Gift Cards', item: 'https://florida-shine-car-wash.pages.dev/gift-cards' }
		]
	};
</script>
<Seo
	title="Gift Cards — Florida Shine Car Wash"
	description="Florida Shine gift cards from $25 to $200, valid at all 8 Florida locations. Email it, print it at home or pick it up in store — and they never expire."
	canonical="/gift-cards"
	ogImage="club-car"
	jsonLd={jsonLd}
/>
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
				<p class="mt-2 text-white/85">
					A ${picked} gift card for {recipientName} ({delivery === 'Email' ? `to be emailed to ${recipientEmail}` : delivery === 'Print at home' ? 'to print at home' : 'to pick up in store'}), from {senderName}. This is a mock request — no payment was taken. To buy it for real, call <a class="font-bold text-sun" href="tel:+13055550198">(305) 555-0198</a> or pick one up at any Florida Shine location.
				</p>
				{#if message}<p class="mt-3 rounded-2xl bg-white/10 p-4 text-sm italic">"{message}"</p>{/if}
			</div>
		{:else}
			<h2 class="font-display text-2xl font-black">Get a ${picked} gift card</h2>
			<p class="mt-2 text-white/85">No payment online — buy by phone or in-store. Gift cards never expire and no fees are ever charged after purchase (Florida §501.95): under the federal 5-year rule they are valid for at least five years from purchase, and at Florida Shine they carry no expiry date at all.</p>
			<form class="mt-6 space-y-4" onsubmit={request} novalidate>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="g-recipient" class="text-sm font-bold">Recipient name *</label>
						<input id="g-recipient" type="text" bind:value={recipientName} autocomplete="off" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="Sam Rivera" />
					</div>
					<div>
						<label for="g-recipient-email" class="text-sm font-bold">Recipient email {delivery === 'Email' ? '*' : '(for email delivery)'}</label>
						<input id="g-recipient-email" type="email" bind:value={recipientEmail} autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="sam@example.com" />
					</div>
				</div>
				<div>
					<label for="g-sender" class="text-sm font-bold">Your name (sender) *</label>
					<input id="g-sender" type="text" bind:value={senderName} autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="Alex Rivera" />
				</div>
				<div>
					<label for="g-message" class="text-sm font-bold">Message (optional)</label>
					<textarea id="g-message" bind:value={message} rows="3" class="mt-1 block w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="Happy birthday — your car deserves this!"></textarea>
				</div>
				<fieldset class="min-w-0">
					<legend class="text-sm font-bold">How should they get it?</legend>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each ['Email', 'Print at home', 'Pick up in store'] as d}
							<label class="cursor-pointer rounded-full border-2 px-4 py-2.5 text-sm font-bold focus-within:ring-2 focus-within:ring-sun {delivery === d ? 'border-sun bg-sun text-navy' : 'border-white/40 text-white'}">
								<input type="radio" name="delivery" value={d} bind:group={delivery} class="sr-only" />
								{d}
							</label>
						{/each}
					</div>
				</fieldset>
				{#if errorMsg}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{errorMsg}</p>{/if}
				<div class="flex flex-wrap gap-3">
					<button type="submit" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 font-black text-navy"><Gift class="h-5 w-5" aria-hidden="true" /> REQUEST ${picked} GIFT CARD</button>
					<a href="tel:+13055550198" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-6 py-3 font-black text-white"><Phone class="h-5 w-5" aria-hidden="true" /> CALL TO BUY</a>
				</div>
			</form>
		{/if}
	</div>
	<div class="mt-8">
		<GiftMembership />
	</div>
	<p class="mt-8 text-center text-sm text-muted">Gift cards never expire and carry no fees after purchase — see the <a href="/terms" class="font-bold text-navy underline underline-offset-2">Terms of Service</a>.</p>
</section>
