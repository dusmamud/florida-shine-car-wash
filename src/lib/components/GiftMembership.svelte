<script lang="ts">
	import { Gift } from '@lucide/svelte';
	import { memberships } from '#lib/data/site.ts';

	// Gift a Club plan — mock checkout shared by /gift-cards and /memberships.
	// Choose plan + duration + recipient; no payment is taken in this demo.
	let planSlug = $state('premium-club');
	let months = $state(3);
	let recipientName = $state('');
	let recipientEmail = $state('');
	let senderName = $state('');
	let done = $state(false);
	let errorMsg = $state('');

	const plan = $derived(memberships.find((m) => m.slug === planSlug) ?? memberships[1]);
	const total = $derived(plan.price * months);

	function gift(e: SubmitEvent) {
		e.preventDefault();
		if (!recipientName.trim() || !senderName.trim()) {
			errorMsg = 'Please add the recipient and your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
			errorMsg = 'Please enter a valid recipient email address.';
			return;
		}
		errorMsg = '';
		done = true;
	}
</script>

<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
	{#if done}
		<div role="status">
			<p class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Gift class="h-6 w-6" aria-hidden="true" /> Gift membership noted!</p>
			<p class="mt-2 leading-relaxed text-muted">
				{months} month{months === 1 ? '' : 's'} of {plan.name} (${plan.price}/mo — ${total} total) for {recipientName},
				from {senderName}. A gift email would go to {recipientEmail}. This is a mock gift — no payment was taken. To
				buy it for real, call <a class="font-bold text-navy" href="tel:+13055550198">(305) 555-0198</a> or pick one up at
				any Florida Shine location.
			</p>
			<p class="mt-3 text-sm text-muted">Gift memberships follow the same terms as a regular plan: billed monthly on the join date once activated, 1 wash per day per vehicle, cancel anytime. See the <a href="/membership-terms" class="font-bold text-navy underline underline-offset-2">Membership Terms</a>.</p>
			<button type="button" onclick={() => (done = false)} class="mt-5 inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 text-sm font-black text-navy">GIFT ANOTHER MEMBERSHIP</button>
		</div>
	{:else}
		<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Gift class="h-6 w-6" aria-hidden="true" /> Gift a Club Membership</h2>
		<p class="mt-2 text-sm leading-relaxed text-muted">Give unlimited washes: pick a plan and how many months, and we email the gift to them. Mock checkout — no payment is taken online.</p>
		<form class="mt-6 space-y-4" onsubmit={gift} novalidate>
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="gm-plan" class="font-bold text-navy">Plan</label>
					<select id="gm-plan" bind:value={planSlug} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
						{#each memberships as m}<option value={m.slug}>{m.name} — ${m.price}/mo</option>{/each}
					</select>
				</div>
				<div>
					<label for="gm-months" class="font-bold text-navy">Duration</label>
					<select id="gm-months" bind:value={months} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
						{#each [1, 3, 6, 12] as n}<option value={n}>{n} month{n === 1 ? '' : 's'}</option>{/each}
					</select>
				</div>
			</div>
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="gm-recipient" class="font-bold text-navy">Recipient name *</label>
					<input id="gm-recipient" type="text" bind:value={recipientName} autocomplete="off" placeholder="Sam Rivera" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" />
				</div>
				<div>
					<label for="gm-recipient-email" class="font-bold text-navy">Recipient email *</label>
					<input id="gm-recipient-email" type="email" bind:value={recipientEmail} autocomplete="email" placeholder="sam@example.com" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" />
				</div>
			</div>
			<div>
				<label for="gm-sender" class="font-bold text-navy">Your name (sender) *</label>
				<input id="gm-sender" type="text" bind:value={senderName} autocomplete="name" placeholder="Alex Rivera" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" />
			</div>
			<p class="rounded-2xl bg-sky-light p-4 text-sm"><strong class="text-navy">Gift total: ${total}</strong> <span class="text-muted">— {plan.name} at ${plan.price}/mo × {months} month{months === 1 ? '' : 's'}. No payment taken in this demo.</span></p>
			{#if errorMsg}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{errorMsg}</p>{/if}
			<button type="submit" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 font-black text-navy"><Gift class="h-5 w-5" aria-hidden="true" /> GIFT {months} MONTH{months === 1 ? '' : 'S'} — ${total}</button>
		</form>
	{/if}
</div>
