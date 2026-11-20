<script lang="ts">
	import { CloudRain, CloudSun, Phone, ShieldCheck, Umbrella } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { rainGuarantee } from '#lib/data/round3.ts';

	let refInput = $state('');
	let phoneInput = $state('');
	let claimed = $state(false);
	let code = $state('');
	let err = $state('');

	function hashOf(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
		return h;
	}
	function claim(e: SubmitEvent) {
		e.preventDefault();
		const ref = refInput.trim().toUpperCase();
		if (!/^FS-\d{5}$/.test(ref)) {
			err = 'Enter a booking reference like FS-49886 — it starts with FS- followed by 5 digits.';
			claimed = false;
			return;
		}
		if (phoneInput.replace(/\D/g, '').length < 10) {
			err = 'Enter the phone number you booked with — at least 10 digits.';
			claimed = false;
			return;
		}
		err = '';
		code = `RW-${String(hashOf(ref + phoneInput)).padStart(5, '0')}`;
		claimed = true;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Rain Guarantee', item: 'https://florida-shine-car-wash.pages.dev/rain-guarantee' }
		]
	};
</script>

<Seo
	title="48-Hour Rain Guarantee — Free Rewash — Florida Shine Car Wash"
	description="If it rains within 48 hours of your Florida Shine wash, come back for a free rewash of the same car. Claim it here in 2 taps with your booking reference."
	canonical="/rain-guarantee"
	ogImage="blog-rainy-season"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="RAIN GUARANTEE"
	title="It Rains Within 48 Hours? The Rewash Is Free."
	subtitle="Florida weather is unpredictable — your shine should not be. If rain dirties your car within 48 hours of your wash, we rewash the same car free. Claim it here in 2 taps."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 lg:grid-cols-3">
		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8 lg:col-span-2">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><CloudRain class="h-6 w-6 text-navy-light" aria-hidden="true" /> What counts</h2>
			<ul class="mt-4 space-y-2 text-muted">
				{#each rainGuarantee.covered as item}
					<li class="flex gap-2"><ShieldCheck class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /><span>{item}</span></li>
				{/each}
			</ul>
			<h2 class="mt-8 flex items-center gap-2 font-display text-2xl font-black text-navy"><CloudSun class="h-6 w-6 text-navy-light" aria-hidden="true" /> What does not count</h2>
			<ul class="mt-4 space-y-2 text-muted">
				{#each rainGuarantee.notCovered as item}
					<li class="flex gap-2"><span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foam font-black text-navy" aria-hidden="true">×</span><span>{item}</span></li>
				{/each}
			</ul>
			<p class="mt-6 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">
				<strong class="text-navy">One rewash per paid wash, same vehicle only.</strong> The free rewash is at the same level as the wash you bought — Basic → Basic, Premium → Premium, Deluxe → Deluxe.
			</p>
		</article>

		<article class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black"><Umbrella class="h-6 w-6 text-sun" aria-hidden="true" /> Claim your free rewash</h2>
			<ol class="mt-4 space-y-2 text-sm leading-relaxed text-white/85">
				{#each rainGuarantee.claimSteps as step, i}
					<li><strong class="text-white">Step {i + 1}:</strong> {step}</li>
				{/each}
			</ol>
			<form class="mt-5 space-y-3" onsubmit={claim} novalidate>
				<div class="min-w-0">
					<label for="r-ref" class="text-sm font-bold">Booking reference *</label>
					<input id="r-ref" type="text" bind:value={refInput} placeholder="FS-49886" autocomplete="off" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy uppercase" />
				</div>
				<div class="min-w-0">
					<label for="r-phone" class="text-sm font-bold">Phone number used to book *</label>
					<input id="r-phone" type="tel" bind:value={phoneInput} autocomplete="tel" placeholder="(305) 555-0100" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
				</div>
				{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
				<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">CLAIM MY FREE REWASH</button>
			</form>
			{#if claimed}
				<div class="mt-4 rounded-2xl bg-sun p-4 text-navy" role="status">
					<p class="font-black">Your rewash code is {code}</p>
					<p class="mt-1 text-sm">Show this code at any Florida Shine location within 48 hours of the rain. This is a mock claim — no real rewash was booked.</p>
				</div>
			{/if}
			<p class="mt-4 text-xs leading-relaxed text-white/60">
				Already have a booking to manage? <a href="/track-booking" class="font-bold text-white underline underline-offset-2">Track your booking</a> — the rain-guarantee claim lives here, and track-booking links back to this page.
			</p>
		</article>
	</div>

	<div class="mt-6 grid gap-6 md:grid-cols-2">
		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-black text-navy">Members vs single washes</h2>
			<p class="mt-2 leading-relaxed text-muted">{rainGuarantee.memberTreatment}</p>
			<p class="mt-2 leading-relaxed text-muted">{rainGuarantee.singleWashTreatment}</p>
			<a href="/memberships" class="mt-4 inline-flex min-h-12 items-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">SEE UNLIMITED CLUB — FROM $19/MO</a>
		</article>
		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-black text-navy">Do you wash in the rain?</h2>
			<p class="mt-2 leading-relaxed text-muted">{rainGuarantee.weWashInRain}</p>
			<p class="mt-2 leading-relaxed text-muted">
				Questions? Call <a href="tel:+13055550198" class="font-bold text-navy underline underline-offset-2">(305) 555-0198</a> — a person answers, not a phone tree.
			</p>
			<a href="/offers" class="mt-4 inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 text-sm font-black text-navy">SEE ALL OFFERS</a>
		</article>
	</div>
	<p class="mt-6 flex items-center gap-2 text-center text-sm text-muted"><Phone class="h-4 w-4 shrink-0" aria-hidden="true" /> No booking reference? Bring your receipt to any location and we will look the wash up for you.</p>
</section>
