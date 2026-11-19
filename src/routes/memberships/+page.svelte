<script lang="ts">
	import { Check } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { memberships } from '#lib/data/site.ts';
	let selected = $state('premium-club');
	let joined = $state(false);
	let name = $state('');
	let email = $state('');
	let errorMsg = $state('');
	function join(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim() || !email.includes('@')) {
			errorMsg = 'Please enter your name and a valid email address.';
			return;
		}
		errorMsg = '';
		joined = true;
	}
	const plan = $derived(memberships.find((m) => m.slug === selected) ?? memberships[1]);
</script>

<svelte:head><title>Unlimited Wash Club — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="UNLIMITED WASH CLUB" title="Wash as Often as You Want" subtitle="One flat monthly price, unlimited washes at all 8 Florida locations. No contracts, cancel anytime — and members skip the line in the member-only lane." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-3">
		{#each memberships as m}
			<article class="relative flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-navy/10 ring-1 ring-line {m.popular ? 'ring-2 ring-sun md:-translate-y-2' : ''}">
				{#if m.popular}<span class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-4 py-1 text-xs font-black text-navy">MOST POPULAR</span>{/if}
				<h2 class="text-center font-display text-2xl font-black text-navy">{m.name.toUpperCase()}</h2>
				<p class="mt-1 text-center text-sm text-muted">{m.tagline}</p>
				<p class="mt-4 text-center font-display text-5xl font-black text-navy">${m.price}<span class="text-base font-bold text-muted">/mo</span></p>
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

<section id="join-form" class="mx-auto max-w-2xl px-4 pb-16 sm:px-6" aria-labelledby="join-heading">
	<div class="rounded-3xl bg-navy p-6 text-white shadow-xl sm:p-8">
		<h2 id="join-heading" class="font-display text-2xl font-black">Join the Club — {plan.name} <span class="text-sun">${plan.price}/mo</span></h2>
		<p class="mt-2 text-sm text-white/80">Mock sign-up — no payment is taken. We'll email you a welcome pack and your member sticker details.</p>
		{#if joined}
			<div class="mt-6 rounded-2xl bg-sun p-5 text-navy" role="status">
				<p class="font-black">Welcome to the club, {name}!</p>
				<p class="mt-1 text-sm">Your {plan.name} membership (${plan.price}/mo) is set up in this demo. A confirmation has been "sent" to {email}. Show this page at any location to activate your member sticker.</p>
				<p class="mt-3 text-sm font-bold">Questions? Call (305) 555-0198.</p>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={join} novalidate>
				<div>
					<label for="plan" class="text-sm font-bold">Choose your plan</label>
					<select id="plan" bind:value={selected} class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy">
						{#each memberships as m}<option value={m.slug}>{m.name} — ${m.price}/mo</option>{/each}
					</select>
				</div>
				<div>
					<label for="mname" class="text-sm font-bold">Full name</label>
					<input id="mname" type="text" bind:value={name} autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="Alex Rivera" />
				</div>
				<div>
					<label for="memail" class="text-sm font-bold">Email</label>
					<input id="memail" type="email" bind:value={email} autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="alex@example.com" />
				</div>
				{#if errorMsg}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{errorMsg}</p>{/if}
				<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 font-black text-navy">JOIN NOW — {plan.name.toUpperCase()} ${plan.price}/MO</button>
				<p class="text-center text-xs text-white/60">Month-to-month. Cancel anytime. No payment collected in this demo.</p>
			</form>
		{/if}
	</div>
</section>
