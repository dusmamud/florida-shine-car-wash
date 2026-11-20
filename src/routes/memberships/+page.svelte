<script lang="ts">
	import { Check, Wallet } from '@lucide/svelte';
	import FitChecker from '#lib/components/FitChecker.svelte';
	import GiftMembership from '#lib/components/GiftMembership.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { membershipRules, memberships } from '#lib/data/site.ts';
	let selected = $state('premium-club');
	let joined = $state(false);
	let name = $state('');
	let email = $state('');
	let consent = $state(false);
	let errorMsg = $state('');
	// Mock payment method — no real payment is taken in this demo.
	let payMethod = $state('Card (mock)');
	function join(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim() || !email.includes('@')) {
			errorMsg = 'Please enter your name and a valid email address.';
			return;
		}
		if (!consent) {
			errorMsg = 'Please agree to the Membership Terms before joining.';
			return;
		}
		errorMsg = '';
		joined = true;
	}
	const plan = $derived(memberships.find((m) => m.slug === selected) ?? memberships[1]);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Memberships', item: 'https://florida-shine-car-wash.pages.dev/memberships' }
		]
	};
</script>

<Seo
	title="Unlimited Wash Club — Florida Shine Car Wash"
	description="Unlimited Wash Club from $19/mo: unlimited washes at all 8 Florida locations, RFID sticker recognition, 1 wash per day per vehicle, billed monthly on your join date, cancel anytime."
	canonical="/memberships"
	ogImage="club-car"
	jsonLd={jsonLd}
	hreflang={[
		{ lang: 'es', href: 'https://florida-shine-car-wash.pages.dev/es/memberships' },
		{ lang: 'x-default', href: 'https://florida-shine-car-wash.pages.dev/memberships' }
	]}
/>
<PageHero eyebrow="UNLIMITED WASH CLUB" title="Wash as Often as You Want" subtitle="One flat monthly price, unlimited washes at all 8 Florida locations. No contracts, cancel anytime — and members skip the line in the member-only lane." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-3">
		{#each memberships as m}
			<article class="relative flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-navy/10 ring-1 ring-line {m.popular ? 'ring-2 ring-sun md:-translate-y-2' : ''}">
				{#if m.popular}<span class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-4 py-1 text-xs font-black text-navy">MOST POPULAR</span>{/if}
				<h2 class="text-center font-display text-2xl font-black text-navy">{m.name.toUpperCase()}</h2>
				<p class="mt-1 text-center text-sm text-muted">{m.tagline}</p>
				<p class="mt-4 text-center font-display text-5xl font-black text-navy">${m.price}<span class="text-base font-bold text-muted">/mo</span></p>
				<p class="mt-2 text-center text-sm font-bold text-navy-light">{m.breakEven}</p>
				<ul class="mt-5 flex-1 space-y-2.5">
					{#each m.features as f}<li class="flex items-start gap-2 text-sm font-semibold"><Check class="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" /> {f}</li>{/each}
				</ul>
				<button
					type="button"
					onclick={() => {
						selected = m.slug;
						document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
					}}
					class="mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-black {m.popular ? 'bg-sun text-navy' : 'bg-navy text-white'}"
				>
					JOIN {m.name.toUpperCase()}
				</button>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="how-heading">
	<h2 id="how-heading" class="font-display text-3xl font-black text-navy">How membership works</h2>
	<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">Billing date</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">Every plan: {memberships[0].billing}. Your first month starts the day you join.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">How we recognise you</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">By {memberships[0].recognition.toLowerCase()} on your windshield — no card to show, no app to open. It works at all 8 locations.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">Daily limit</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{memberships[0].dailyLimit}. Wash every day if you like — just once a day per vehicle.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">Second car?</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Add an extra vehicle for ${memberships[0].extraVehiclePrice}/mo (Basic), ${memberships[1].extraVehiclePrice}/mo (Premium) or ${memberships[2].extraVehiclePrice}/mo (Deluxe).
			</p>
		</div>
	</div>
	<div class="mt-4 grid gap-4 md:grid-cols-3">
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">Pause your plan</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{membershipRules.pause} Pause or resume in <a href="/account" class="font-bold text-navy underline underline-offset-2">your account</a>.</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">Swap vehicles</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{membershipRules.vehicleSwaps}</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">Cancel in 2 clicks</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{membershipRules.cancel} Full rules in the <a href="/membership-terms" class="font-bold text-navy underline underline-offset-2">Membership Terms</a>.</p>
		</div>
	</div>
	<div class="mt-6 overflow-x-auto rounded-3xl bg-white shadow ring-1 ring-line">
		<table class="w-full min-w-[560px] text-left text-sm">
			<thead><tr class="border-b border-line bg-sky-light"><th class="px-4 py-3 font-black text-navy">Plan</th><th class="px-4 py-3 font-black text-navy">Price</th><th class="px-4 py-3 font-black text-navy">Pays for itself</th><th class="px-4 py-3 font-black text-navy">Extra vehicle</th></tr></thead>
			<tbody>
				{#each memberships as m}
					<tr class="border-b border-line last:border-0">
						<td class="px-4 py-3 font-bold text-navy">{m.name}</td>
						<td class="px-4 py-3">${m.price}/mo</td>
						<td class="px-4 py-3">{m.breakEven}</td>
						<td class="px-4 py-3">+${m.extraVehiclePrice}/mo</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="mt-3 text-sm text-muted">Break-even is worked out against the matching single wash: Basic Wash $16, Premium Wash $28, Deluxe Detail $45.</p>
</section>

<section id="join-form" class="mx-auto max-w-2xl px-4 pb-16 sm:px-6" aria-labelledby="join-heading">
	<div class="rounded-3xl bg-navy p-6 text-white shadow-xl sm:p-8">
		<h2 id="join-heading" class="font-display text-2xl font-black">Join the Club — {plan.name} <span class="text-sun">${plan.price}/mo</span></h2>
		<p class="mt-2 text-sm text-white/80">Mock sign-up — no payment is taken. We'll email you a welcome pack and your member sticker details.</p>
		{#if joined}
			<div class="mt-6 rounded-2xl bg-sun p-5 text-navy" role="status">
				<p class="font-black">Welcome to the club, {name}!</p>
				<p class="mt-1 text-sm">Your {plan.name} membership (${plan.price}/mo) is set up in this demo. A confirmation has been "sent" to {email}. Show this page at any location to activate your member sticker.</p>
				<p class="mt-3 text-sm">Your terms: ${plan.price}/mo, {plan.billing.toLowerCase()}, {plan.recognition} recognition, {plan.dailyLimit.toLowerCase()}, cancel anytime online or in person. Payment: {payMethod} (mock — no real payment taken).</p>
				<p class="mt-3 text-sm font-bold">Manage or cancel anytime in <a href="/account" class="underline underline-offset-2">your account</a> — no account was needed to join; set one up afterwards if you like. Questions? Call (305) 555-0198.</p>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={join} novalidate>
				<div>
					<label for="plan" class="text-sm font-bold">Choose your plan</label>
					<select id="plan" bind:value={selected} class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy">
						{#each memberships as m}<option value={m.slug}>{m.name} — ${m.price}/mo</option>{/each}
					</select>
				</div>
				<FitChecker />
				<div>
					<label for="mname" class="text-sm font-bold">Full name</label>
					<input id="mname" type="text" bind:value={name} autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="Alex Rivera" />
				</div>
				<div>
					<label for="memail" class="text-sm font-bold">Email</label>
					<input id="memail" type="email" bind:value={email} autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="alex@example.com" />
				</div>
				<div class="rounded-2xl bg-white/10 p-4 text-sm">
					<p class="font-bold">Terms summary — {plan.name}, ${plan.price}/mo</p>
					<p class="mt-1 text-white/80">{plan.billing}. Recognised by {plan.recognition.toLowerCase()}. {plan.dailyLimit}. Cancel anytime online or in person — no cancellation fee.</p>
				</div>
				<fieldset class="min-w-0">
					<legend class="text-sm font-bold">Payment method (mock — no real payment)</legend>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each ['Apple Pay', 'Google Pay', 'Card (mock)'] as method}
							<label class="cursor-pointer rounded-full border-2 px-4 py-2.5 text-sm font-bold focus-within:ring-2 focus-within:ring-sun {payMethod === method ? 'border-sun bg-sun text-navy' : 'border-white/40 text-white'}">
								<input type="radio" name="paymethod" value={method} bind:group={payMethod} class="sr-only" />
								<span class="flex items-center gap-1.5"><Wallet class="h-4 w-4" aria-hidden="true" /> {method}</span>
							</label>
						{/each}
					</div>
					<p class="mt-2 text-xs text-white/70">Mock payment only — no card details are collected and nothing is charged.</p>
				</fieldset>
				<label class="flex min-h-12 cursor-pointer items-start gap-3 text-sm">
					<input type="checkbox" bind:checked={consent} class="mt-1 h-6 w-6 shrink-0 accent-[#ffc700]" />
					<span>I agree to the <a href="/membership-terms" class="font-bold text-sun underline underline-offset-2">Membership Terms</a> — ${plan.price}/mo, billed monthly on my join date, cancel anytime online or in person.</span>
				</label>
				{#if errorMsg}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{errorMsg}</p>{/if}
				<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 font-black text-navy">JOIN NOW — {plan.name.toUpperCase()} ${plan.price}/MO</button>
				<p class="text-center text-xs text-white/60">Month-to-month. Cancel anytime. No payment collected in this demo.</p>
			</form>
		{/if}
	</div>
</section>

<section class="mx-auto max-w-4xl px-4 pb-16 sm:px-6" aria-labelledby="gift-heading">
	<h2 id="gift-heading" class="sr-only">Gift a membership</h2>
	<GiftMembership />
</section>
