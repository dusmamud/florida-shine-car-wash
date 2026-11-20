<script lang="ts">
	import { Car, CreditCard, Mail, Pause, UserRound, X } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { membershipRules, memberships, site } from '#lib/data/site.ts';

	// Mock member portal — all state is client-side $state, prerender-safe.
	let email = $state('');
	let linkSent = $state(false);
	let loggedIn = $state(false);
	let err = $state('');
	let planSlug = $state('premium-club');
	let paused = $state(false);
	let cancelStep = $state(false);
	let cancelled = $state(false);
	let cardSaved = $state(false);
	let last4 = $state('4242');
	let newLast4 = $state('');
	let vehicles = $state([{ plate: 'FLA 4821', label: 'Toyota Camry (Sedan)', primary: true }]);
	let newPlate = $state('');
	let newLabel = $state('');
	let savedMsg = $state('');

	const plan = $derived(memberships.find((m) => m.slug === planSlug) ?? memberships[1]);
	const renewal = $derived(() => {
		const d = new Date();
		d.setMonth(d.getMonth() + 1);
		return d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
	});

	function sendLink(e: SubmitEvent) {
		e.preventDefault();
		if (!email.includes('@')) {
			err = 'Enter a valid email address and we will send your sign-in link.';
			return;
		}
		err = '';
		linkSent = true;
	}
	function saveCard(e: SubmitEvent) {
		e.preventDefault();
		if (!/^\d{4}$/.test(newLast4.trim())) {
			err = 'Enter just the last 4 digits of your new card (mock — no real card details are collected).';
			return;
		}
		err = '';
		last4 = newLast4.trim();
		newLast4 = '';
		cardSaved = true;
		savedMsg = 'Card updated in this demo — your new card ends in ' + last4 + '.';
	}
	function makePrimary(i: number) {
		vehicles = vehicles.map((x, j) => ({ ...x, primary: j === i }));
	}
	function addVehicle(e: SubmitEvent) {
		e.preventDefault();
		if (!newPlate.trim() || !newLabel.trim()) {
			err = 'Enter a plate and a vehicle description to add a vehicle.';
			return;
		}
		err = '';
		vehicles = [...vehicles, { plate: newPlate.trim().toUpperCase(), label: newLabel.trim(), primary: false }];
		newPlate = '';
		newLabel = '';
		savedMsg = 'Vehicle added. Switch your primary vehicle below — the RFID sticker follows the primary vehicle.';
	}
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Your Account', item: 'https://florida-shine-car-wash.pages.dev/account' }
		]
	};
</script>

<Seo
	title="Your Account — Florida Shine Car Wash"
	description="Manage your Florida Shine membership: sign in with a magic link, change or pause your plan, update your card, swap vehicles, or cancel online in a few clicks."
	canonical="/account"
	ogImage="club-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="MEMBER ACCOUNT"
	title="Manage My Plan"
	subtitle="Sign in with a magic link — no password to remember. Change your plan, pause, swap vehicles or cancel online in a few clicks."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	{#if !loggedIn}
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Mail class="h-6 w-6" aria-hidden="true" /> Sign in with a magic link</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Enter the email on your membership and we will send you a sign-in link. No password, no account to remember — the link signs you in for this session.</p>
			{#if linkSent}
				<div class="mt-6 rounded-2xl bg-sun/40 p-5" role="status">
					<p class="font-black text-navy">Magic link sent to {email}.</p>
					<p class="mt-1 text-sm text-navy/80">In this demo the link arrives instantly — click below to open your member dashboard.</p>
					<button type="button" onclick={() => (loggedIn = true)} class="mt-4 inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white">OPEN MY DASHBOARD (DEMO LINK)</button>
					<p class="mt-3 text-xs text-navy/70">For a real account, the link in your email expires after 15 minutes and works once.</p>
				</div>
			{:else}
				<form class="mt-6 space-y-4" onsubmit={sendLink} novalidate>
					<div><label for="a-email" class="font-bold text-navy">Email on your membership *</label><input id="a-email" type="email" bind:value={email} autocomplete="email" placeholder="alex@example.com" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
					<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 font-black text-navy">SEND MAGIC LINK</button>
				</form>
			{/if}
			<p class="mt-4 text-center text-sm text-muted">Not a member yet? <a href="/memberships" class="font-bold text-navy underline underline-offset-2">Join the Unlimited Wash Club</a> from $19/mo.</p>
		</div>
	{:else if cancelled}
		<div class="rounded-3xl bg-white p-6 text-center shadow ring-1 ring-line sm:p-8" role="status">
			<h2 class="font-display text-2xl font-black text-navy">Your plan is cancelled.</h2>
			<p class="mx-auto mt-2 max-w-md text-muted">Your {plan.name} plan ends at the end of the paid month. You can still wash until then, and you can rejoin anytime — your RFID sticker stays valid until the plan ends.</p>
			<p class="mt-2 text-sm text-muted">A confirmation has been sent to {email}.</p>
			<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
				<a href="/memberships" class="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">REJOIN THE CLUB</a>
				<button type="button" onclick={() => { cancelled = false; cancelStep = false; }} class="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-navy px-6 py-3 text-sm font-black text-navy">UNDO CANCELLATION (DEMO)</button>
			</div>
		</div>
	{:else}
		<div class="space-y-6">
			<div class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8">
				<p class="flex items-center gap-2 text-sm font-bold text-sun"><UserRound class="h-5 w-5" aria-hidden="true" /> Signed in as {email}</p>
				<h2 class="mt-3 font-display text-3xl font-black">{plan.name} — ${plan.price}/mo</h2>
				<p class="mt-2 text-sm text-white/80">{plan.billing}. Renews {renewal()}. {plan.recognition}. {plan.dailyLimit}.</p>
				{#if paused}<p class="mt-3 inline-block rounded-full bg-sun px-4 py-1 text-xs font-black text-navy" role="status">PAUSED — washes are on hold until you resume</p>{/if}
				<div class="mt-5">
					<label for="a-plan" class="text-sm font-bold">Change plan</label>
					<select id="a-plan" bind:value={planSlug} class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy">
						{#each memberships as m}<option value={m.slug}>{m.name} — ${m.price}/mo</option>{/each}
					</select>
					<p class="mt-2 text-xs text-white/70">Plan changes apply from your next billing date. Extra vehicles: +${plan.extraVehiclePrice}/mo.</p>
				</div>
				<div class="mt-5 flex flex-wrap gap-3">
					<button type="button" onclick={() => (paused = !paused)} class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-5 py-3 text-sm font-black text-white"><Pause class="h-4 w-4" aria-hidden="true" /> {paused ? 'RESUME PLAN' : 'PAUSE PLAN'}</button>
					{#if !cancelStep}
						<button type="button" onclick={() => (cancelStep = true)} class="inline-flex min-h-12 items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white"><X class="h-4 w-4" aria-hidden="true" /> CANCEL PLAN</button>
					{/if}
				</div>
				<p class="mt-3 text-xs text-white/70">{membershipRules.pause}</p>
				{#if cancelStep}
					<div class="mt-5 rounded-2xl bg-white/10 p-5" role="alert">
						<p class="font-black">Cancel {plan.name}?</p>
						<p class="mt-1 text-sm text-white/80">Your plan runs to the end of the paid month — you keep washing until then. No cancellation fee, and no phone call needed. You can rejoin anytime.</p>
						<div class="mt-4 flex flex-wrap gap-3">
							<button type="button" onclick={() => (cancelled = true)} class="inline-flex min-h-12 items-center rounded-full bg-sun px-5 py-3 text-sm font-black text-navy">YES, CANCEL MY PLAN</button>
							<button type="button" onclick={() => (cancelStep = false)} class="inline-flex min-h-12 items-center rounded-full border-2 border-white px-5 py-3 text-sm font-black text-white">KEEP MY PLAN</button>
						</div>
					</div>
				{/if}
			</div>

			{#if savedMsg}<p class="rounded-xl bg-sun/40 px-4 py-3 text-sm font-bold text-navy" role="status">{savedMsg}</p>{/if}
			{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}

			<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
				<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><CreditCard class="h-6 w-6" aria-hidden="true" /> Payment card</h2>
				<p class="mt-2 text-sm text-muted">Card on file ends in <strong class="text-navy">•••• {last4}</strong>. Billed monthly on your join date.</p>
				{#if cardSaved}<p class="mt-2 text-sm font-bold text-navy">Card updated.</p>{/if}
				<form class="mt-4 flex flex-col gap-3 sm:flex-row" onsubmit={saveCard} novalidate>
					<div class="min-w-0 flex-1"><label for="a-last4" class="font-bold text-navy">New card — last 4 digits (mock)</label><input id="a-last4" type="text" inputmode="numeric" maxlength="4" bind:value={newLast4} placeholder="e.g. 4242" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					<button type="submit" class="inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white sm:self-end">UPDATE CARD</button>
				</form>
				<p class="mt-2 text-xs text-muted">No real card details are collected on this page — enter only the last 4 digits for this demo.</p>
			</div>

			<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
				<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Car class="h-6 w-6" aria-hidden="true" /> Your vehicles</h2>
				<ul class="mt-4 space-y-3">
					{#each vehicles as v, i}
						<li class="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mist p-4">
							<span><strong class="text-navy">{v.label}</strong><span class="block text-sm text-muted">Plate {v.plate}</span></span>
							{#if v.primary}
								<span class="rounded-full bg-sun px-3 py-1 text-xs font-black text-navy">PRIMARY — RFID STICKER</span>
							{:else}
								<button type="button" onclick={() => makePrimary(i)} class="inline-flex min-h-11 items-center rounded-full border-2 border-navy px-4 py-2 text-xs font-black text-navy">MAKE PRIMARY</button>
							{/if}
						</li>
					{/each}
				</ul>
				<form class="mt-4 grid gap-3 sm:grid-cols-2" onsubmit={addVehicle} novalidate>
					<div class="min-w-0"><label for="a-plate" class="font-bold text-navy">Plate</label><input id="a-plate" type="text" bind:value={newPlate} placeholder="e.g. FLA 1234" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					<div class="min-w-0"><label for="a-vehicle" class="font-bold text-navy">Vehicle</label><input id="a-vehicle" type="text" bind:value={newLabel} placeholder="e.g. Honda CR-V (SUV)" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					<button type="submit" class="inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white sm:col-span-2">ADD VEHICLE</button>
				</form>
				<p class="mt-3 text-sm text-muted">One vehicle per plan. Extra vehicles cost +${plan.extraVehiclePrice}/mo — see the <a href="/membership-terms" class="font-bold text-navy underline underline-offset-2">Membership Terms</a>.</p>
				<p class="mt-2 text-sm text-muted">{membershipRules.vehicleSwaps}</p>
			</div>

			<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-black text-navy">Your membership rules</h2>
				<ul class="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
					<li><strong class="text-navy">Billing:</strong> {membershipRules.billing}</li>
					<li><strong class="text-navy">Pause:</strong> {membershipRules.pause}</li>
					<li><strong class="text-navy">Vehicle swaps:</strong> {membershipRules.vehicleSwaps}</li>
					<li><strong class="text-navy">Extra vehicle:</strong> {membershipRules.extraVehicle}</li>
					<li><strong class="text-navy">Cancel:</strong> {membershipRules.cancel}</li>
				</ul>
				<p class="mt-4 text-sm text-muted">Full rules in the <a href="/membership-terms" class="font-bold text-navy underline underline-offset-2">Membership Terms</a> · <a href="/memberships" class="font-bold text-navy underline underline-offset-2">Compare Club plans</a></p>
			</div>

			<p class="text-center text-sm text-muted">Questions about your plan? Call <a href={site.phoneHref} class="font-bold text-navy">{site.phone}</a> or see the <a href="/membership-terms" class="font-bold text-navy underline underline-offset-2">Membership Terms</a>.</p>
		</div>
	{/if}
</section>
