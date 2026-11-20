<script lang="ts">
	import { Bell, MessageSquareText, ShieldCheck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { smsClub } from '#lib/data/round3.ts';

	let phone = $state('');
	let marketingConsent = $state(false);
	let joined = $state(false);
	let err = $state('');

	function join(e: SubmitEvent) {
		e.preventDefault();
		if (phone.replace(/\D/g, '').length < 10) {
			err = 'Enter a mobile number with at least 10 digits.';
			return;
		}
		err = '';
		joined = true;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'SMS Text Club', item: 'https://florida-shine-car-wash.pages.dev/sms-club' }
		]
	};
</script>

<Seo
	title="SMS Text Club — Join by Text — Florida Shine Car Wash"
	description="Join the Florida Shine text club for offers, rain alerts and wash-ready reminders. Marketing texts are opt-in only, never a condition of purchase — reply STOP to opt out anytime."
	canonical="/sms-club"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="SMS TEXT CLUB"
	title="Offers and Rain Alerts, by Text"
	subtitle="Join the text club for monthly offers, rain alerts and wash-ready reminders. Marketing texts are opt-in only — and joining is never a condition of buying a wash."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 lg:grid-cols-2">
		<article class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black"><MessageSquareText class="h-6 w-6 text-sun" aria-hidden="true" /> Join the text club</h2>
			<p class="mt-2 text-sm leading-relaxed text-white/80">Text <strong class="text-white">{smsClub.keyword}</strong> to your location, or join here. This is a mock signup — no text is sent and no number is stored.</p>
			{#if joined}
				<div class="mt-5 rounded-2xl bg-sun p-5 text-navy" role="status">
					<p class="font-black">You are in, {phone}!</p>
					{#if marketingConsent}
						<p class="mt-1 text-sm">You will get booking confirmations and reminders, plus up to 4 marketing texts a month. Reply STOP anytime to stop the marketing texts.</p>
					{:else}
						<p class="mt-1 text-sm">You will only get transactional texts — booking confirmations, reminders and rewash codes. You did not opt in to marketing texts, so you will not get any.</p>
					{/if}
					<p class="mt-1 text-sm">(Mock signup — no text was sent.)</p>
				</div>
			{:else}
				<form class="mt-5 space-y-4" onsubmit={join} novalidate>
					<div class="min-w-0">
						<label for="sms-phone" class="text-sm font-bold">Mobile number *</label>
						<input id="sms-phone" type="tel" bind:value={phone} autocomplete="tel" placeholder="(305) 555-0100" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
					</div>
					<div class="rounded-2xl bg-white/10 p-4">
						<label for="sms-consent" class="flex cursor-pointer items-start gap-3">
							<input id="sms-consent" type="checkbox" bind:checked={marketingConsent} class="mt-0.5 h-6 w-6 shrink-0 accent-[#ffc700]" />
							<span class="text-sm leading-relaxed">
								<strong>Yes, send me marketing texts</strong> — monthly offers, rain alerts and Club deals, up to 4 a month. Optional, unchecked by default, and <strong>not a condition of buying a wash or joining the Club</strong>. You can untick this and still get booking texts.
							</span>
						</label>
					</div>
					{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
					<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">JOIN THE TEXT CLUB</button>
				</form>
			{/if}
			<p class="mt-4 text-xs leading-relaxed text-white/60">{smsClub.optOut}</p>
		</article>

		<div class="space-y-6">
			<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
				<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Bell class="h-6 w-6 text-navy-light" aria-hidden="true" /> Marketing texts — what you get</h2>
				<ul class="mt-3 list-disc space-y-1 pl-5 text-muted">
					{#each smsClub.marketing.whatYouGet as item}
						<li>{item}</li>
					{/each}
				</ul>
				<p class="mt-3 text-sm font-bold text-navy">{smsClub.marketing.frequency}</p>
			</article>
			<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
				<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><ShieldCheck class="h-6 w-6 text-navy-light" aria-hidden="true" /> Booking texts — separate, always on</h2>
				<ul class="mt-3 list-disc space-y-1 pl-5 text-muted">
					{#each smsClub.transactional.whatYouGet as item}
						<li>{item}</li>
					{/each}
				</ul>
				<p class="mt-3 text-sm leading-relaxed text-muted">{smsClub.transactional.frequency}</p>
				<p class="mt-3 text-sm leading-relaxed text-muted">{smsClub.consentNote}</p>
			</article>
		</div>
	</div>
	<p class="mt-6 text-center text-sm text-muted">Prefer email? <a href="/contact" class="font-bold text-navy underline underline-offset-2">Contact us</a> — or just call <a href="tel:+13055550198" class="font-bold text-navy underline underline-offset-2">(305) 555-0198</a>.</p>
</section>
