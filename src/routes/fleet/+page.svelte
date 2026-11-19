<script lang="ts">
	import { Building2, Check, FileText, Mail, Phone, Ruler, Truck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { fleet, locations, site } from '#lib/data/site.ts';

	let company = $state('');
	let contactName = $state('');
	let email = $state('');
	let phone = $state('');
	let vehicleCount = $state('');
	let vehicleTypes = $state('');
	let homeLocation = $state(locations[0].slug);
	let frequency = $state('Weekly');
	let billing = $state('Monthly invoice');
	let notes = $state('');
	let submitted = $state(false);
	let err = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!company.trim() || !contactName.trim() || !email.includes('@') || !phone.trim() || !vehicleCount.trim()) {
			err = 'Please fill in your company, contact name, a valid work email, phone and number of vehicles.';
			return;
		}
		err = '';
		submitted = true;
	}
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Fleet Accounts', item: 'https://florida-shine-car-wash.pages.dev/fleet' }
		]
	};
</script>

<Seo
	title="Fleet & Commercial Accounts — Florida Shine Car Wash"
	description="Fleet car wash accounts in Florida: volume pricing from 10% off, monthly invoicing, fleet card or plate recognition, 7 ft tunnel height limit. Enquire with Maria Santos."
	canonical="/fleet"
	ogImage="fleet-trucks"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="FLEET & COMMERCIAL"
	title="Fleet Accounts for Florida Businesses"
	subtitle="One account for every vehicle in your fleet — volume pricing, one monthly invoice, and a wash your drivers can use at any of our 8 locations."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-8 lg:grid-cols-2">
		<div>
			<Picture src="fleet-trucks" alt="Fleet vehicles lined up outside a Florida Shine Car Wash" width={1200} height={800} class="overflow-hidden rounded-3xl ring-1 ring-line" />
			<div class="mt-6 space-y-4">
				<div class="flex items-start gap-3 rounded-2xl bg-white p-5 shadow ring-1 ring-line">
					<FileText class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
					<p class="text-sm leading-relaxed text-muted"><strong class="text-navy">Monthly invoicing.</strong> {fleet.invoicing}</p>
				</div>
				<div class="flex items-start gap-3 rounded-2xl bg-white p-5 shadow ring-1 ring-line">
					<Ruler class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
					<p class="text-sm leading-relaxed text-muted"><strong class="text-navy">Size limits.</strong> {fleet.heightLimit}</p>
				</div>
				<div class="flex items-start gap-3 rounded-2xl bg-white p-5 shadow ring-1 ring-line">
					<Truck class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
					<p class="text-sm leading-relaxed text-muted"><strong class="text-navy">Vehicle identification.</strong> {fleet.identification}</p>
				</div>
			</div>
		</div>
		<div>
			<h2 class="font-display text-2xl font-black text-navy sm:text-3xl">Volume pricing</h2>
			<div class="mt-4 space-y-4">
				{#each fleet.tiers as tier}
					<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
						<p class="font-display text-xl font-black text-navy">{tier.vehicles}</p>
						<p class="mt-1 font-bold text-navy-light">{tier.discount}</p>
						<p class="mt-1 text-sm text-muted">{tier.note}</p>
					</article>
				{/each}
			</div>
			<div class="mt-6 rounded-3xl bg-navy p-6 text-white">
				<h3 class="font-display text-xl font-black">Talk to {fleet.contact.name}</h3>
				<p class="mt-1 text-sm text-white/80">{fleet.contact.role} — she sets up fleet accounts and answers pricing questions.</p>
				<p class="mt-4 space-y-2 text-sm">
					<a href="tel:+13055550198" class="flex min-h-11 items-center gap-2 font-bold hover:text-sun"><Phone class="h-4 w-4" aria-hidden="true" /> {fleet.contact.phone}</a>
					<a href="mailto:{fleet.contact.email}" class="flex min-h-11 items-center gap-2 break-all font-bold hover:text-sun"><Mail class="h-4 w-4 shrink-0" aria-hidden="true" /> {fleet.contact.email}</a>
				</p>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-2xl px-4 pb-16 sm:px-6" aria-labelledby="fleet-form-heading">
	<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		<h2 id="fleet-form-heading" class="font-display text-2xl font-black text-navy">Request a fleet quote</h2>
		<p class="mt-2 text-sm text-muted">Tell us about your fleet and {fleet.contact.name} will come back with pricing — usually within one business day.</p>
		{#if submitted}
			<div class="mt-6 rounded-2xl bg-sun/40 p-5" role="status">
				<p class="font-black text-navy">Thanks, {contactName} — your enquiry is noted.</p>
				<p class="mt-1 text-sm text-navy/80">We will contact {company} at {email} about {vehicleCount} vehicles, washing {frequency.toLowerCase()}, billed by {billing.toLowerCase()}. Your home location is {locations.find((l) => l.slug === homeLocation)?.name}, {locations.find((l) => l.slug === homeLocation)?.city}.</p>
				<p class="mt-3 text-sm text-navy/80">In a hurry? Call {fleet.contact.phone} and ask for {fleet.contact.name}.</p>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={submit} novalidate>
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="min-w-0"><label for="f-company" class="font-bold text-navy">Company name *</label><input id="f-company" type="text" bind:value={company} autocomplete="organization" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					<div class="min-w-0"><label for="f-contact" class="font-bold text-navy">Contact name *</label><input id="f-contact" type="text" bind:value={contactName} autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					<div class="min-w-0"><label for="f-email" class="font-bold text-navy">Work email *</label><input id="f-email" type="email" bind:value={email} autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					<div class="min-w-0"><label for="f-phone" class="font-bold text-navy">Phone *</label><input id="f-phone" type="tel" bind:value={phone} autocomplete="tel" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
					<div class="min-w-0"><label for="f-count" class="font-bold text-navy">Number of vehicles *</label><input id="f-count" type="text" inputmode="numeric" bind:value={vehicleCount} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" placeholder="e.g. 12" /></div>
					<div class="min-w-0"><label for="f-types" class="font-bold text-navy">Vehicle types</label><input id="f-types" type="text" bind:value={vehicleTypes} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" placeholder="e.g. Sedans, vans, pickups" /></div>
				</div>
				<div class="min-w-0"><label for="f-location" class="font-bold text-navy">Home location</label><select id="f-location" bind:value={homeLocation} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">{#each locations as l}<option value={l.slug}>{l.city} — {l.name}</option>{/each}</select></div>
				<fieldset class="min-w-0">
					<legend class="font-bold text-navy">How often will vehicles wash?</legend>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each ['Daily', 'Weekly', 'Fortnightly', 'Monthly'] as f}
							<button type="button" onclick={() => (frequency = f)} aria-pressed={frequency === f} class="min-h-12 rounded-full border-2 px-5 py-2 text-sm font-bold {frequency === f ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy'}">{f}</button>
						{/each}
					</div>
				</fieldset>
				<fieldset class="min-w-0">
					<legend class="font-bold text-navy">Billing preference</legend>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each ['Monthly invoice', 'Card on file'] as b}
							<button type="button" onclick={() => (billing = b)} aria-pressed={billing === b} class="min-h-12 rounded-full border-2 px-5 py-2 text-sm font-bold {billing === b ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy'}">{b}</button>
						{/each}
					</div>
				</fieldset>
				<div class="min-w-0"><label for="f-notes" class="font-bold text-navy">Anything else we should know</label><textarea id="f-notes" rows="4" bind:value={notes} class="mt-1 block w-full rounded-xl border-2 border-line px-3 py-3"></textarea></div>
				{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
				<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 font-black text-navy">REQUEST FLEET QUOTE</button>
				<p class="text-center text-xs text-muted">No payment is taken here — this is an enquiry form. Or call {site.phone}.</p>
			</form>
		{/if}
	</div>
</section>
