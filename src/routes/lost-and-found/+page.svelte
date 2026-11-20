<script lang="ts">
	import { KeyRound, PackageSearch, ShieldCheck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { locations } from '#lib/data/site.ts';
	import { lostAndFound } from '#lib/data/round3.ts';

	let itemDesc = $state('');
	let locationSlug = $state('miami-downtown');
	let washDate = $state('');
	let claimantName = $state('');
	let contact = $state('');
	let submitted = $state(false);
	let claimRef = $state('');
	let err = $state('');

	function hashOf(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
		return h;
	}
	function submitClaim(e: SubmitEvent) {
		e.preventDefault();
		if (!itemDesc.trim()) {
			err = 'Describe the item — colour, brand, and where in the car you left it.';
			return;
		}
		if (!washDate) {
			err = 'Tell us the date of your wash, so we know which shift to ask.';
			return;
		}
		if (!claimantName.trim() || !contact.trim()) {
			err = 'Enter your name and a phone number or email so we can reach you.';
			return;
		}
		err = '';
		claimRef = `LF-${String(hashOf(itemDesc.trim().toLowerCase() + washDate)).padStart(5, '0')}`;
		submitted = true;
	}
	const chosenLocation = $derived(locations.find((l) => l.slug === locationSlug) ?? locations[0]);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Lost and Found', item: 'https://florida-shine-car-wash.pages.dev/lost-and-found' }
		]
	};
</script>

<Seo
	title="Lost and Found — Florida Shine Car Wash"
	description="Left something in your car at Florida Shine? Here is what happens to items left behind, how to claim them, and where to pick them up — held for 30 days at the location where they were found."
	canonical="/lost-and-found"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="LOST AND FOUND"
	title="Left Something in Your Car?"
	subtitle="It happens — sunglasses in the cup holder, a phone on the back seat. Anything left behind goes to the location manager the same day and is held for 30 days."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 lg:grid-cols-2">
		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><PackageSearch class="h-6 w-6 text-navy-light" aria-hidden="true" /> What happens to items left in cars</h2>
			<ol class="mt-4 space-y-3 text-muted">
				{#each lostAndFound.whatHappens as step, i}
					<li class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun font-display font-black text-navy">{i + 1}</span><span class="leading-relaxed">{step}</span></li>
				{/each}
			</ol>
			<h3 class="mt-6 flex items-center gap-2 font-black text-navy"><ShieldCheck class="h-5 w-5" aria-hidden="true" /> What to bring when you collect</h3>
			<ul class="mt-2 list-disc space-y-1 pl-5 text-muted">
				{#each lostAndFound.whatToBring as item}
					<li>{item}</li>
				{/each}
			</ul>
			<p class="mt-4 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">{lostAndFound.note}</p>
		</article>

		<article class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black"><KeyRound class="h-6 w-6 text-sun" aria-hidden="true" /> Report a lost item</h2>
			<p class="mt-2 text-sm leading-relaxed text-white/80">Tell us what you lost and where. This is a mock form — nothing is sent, but the claim reference works the same way a real one would.</p>
			{#if submitted}
				<div class="mt-5 rounded-2xl bg-sun p-5 text-navy" role="status">
					<p class="font-black">Claim logged — reference {claimRef}</p>
					<p class="mt-1 text-sm">Thanks, {claimantName}. We have logged your {itemDesc} from {chosenLocation.city} — {chosenLocation.name}. Call {chosenLocation.phone} and quote {claimRef} — if it was found, we will hold it for you to collect. (Mock claim — nothing was sent.)</p>
				</div>
			{:else}
				<form class="mt-5 space-y-3" onsubmit={submitClaim} novalidate>
					<div class="min-w-0">
						<label for="l-item" class="text-sm font-bold">What did you lose? *</label>
						<input id="l-item" type="text" bind:value={itemDesc} placeholder="e.g. Black Ray-Ban sunglasses, front cup holder" autocomplete="off" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="min-w-0">
							<label for="l-location" class="text-sm font-bold">Which location? *</label>
							<select id="l-location" bind:value={locationSlug} class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy">
								{#each locations as loc}
									<option value={loc.slug}>{loc.city} — {loc.name}</option>
								{/each}
							</select>
						</div>
						<div class="min-w-0">
							<label for="l-date" class="text-sm font-bold">Date of your wash *</label>
							<input id="l-date" type="date" bind:value={washDate} class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
						</div>
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="min-w-0">
							<label for="l-name" class="text-sm font-bold">Your name *</label>
							<input id="l-name" type="text" bind:value={claimantName} placeholder="Alex Rivera" autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
						</div>
						<div class="min-w-0">
							<label for="l-contact" class="text-sm font-bold">Phone or email *</label>
							<input id="l-contact" type="text" bind:value={contact} placeholder="(305) 555-0100" autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
						</div>
					</div>
					{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
					<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">REPORT MY LOST ITEM</button>
				</form>
			{/if}
			<p class="mt-4 text-xs leading-relaxed text-white/60">In a hurry? Call the location directly — the numbers are in the pickup list below. Found items are kept at the location where they were found, not moved between sites.</p>
		</article>
	</div>

	<article class="mt-6 rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-black text-navy">Pick up in person — per location</h2>
		<p class="mt-1 text-sm text-muted">Lost items are collected at the location where they were found. Bring photo ID and your claim reference.</p>
		<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each locations as loc}
				<div class="rounded-2xl bg-mist p-4">
					<p class="font-black text-navy">{loc.city} — {loc.name}</p>
					<p class="mt-1 text-sm text-muted">{loc.address}, FL {loc.zip}<br />{loc.phone}<br />{loc.hours}</p>
				</div>
			{/each}
		</div>
		<p class="mt-4 text-sm text-muted">Rather talk to someone? <a href="/contact" class="font-bold text-navy underline underline-offset-2">Contact us</a> or call <a href="tel:+13055550198" class="font-bold text-navy underline underline-offset-2">(305) 555-0198</a>.</p>
	</article>
</section>
