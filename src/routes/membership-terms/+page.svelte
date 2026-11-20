<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { memberships } from '#lib/data/site.ts';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Memberships', item: 'https://florida-shine-car-wash.pages.dev/memberships' },
			{ '@type': 'ListItem', position: 3, name: 'Membership Terms', item: 'https://florida-shine-car-wash.pages.dev/membership-terms' }
		]
	};
</script>

<Seo
	title="Membership Terms — Florida Shine Car Wash"
	description="Unlimited Wash Club membership terms: monthly billing on your join date, RFID sticker recognition, 1 wash per day per vehicle, cancel online, in person or by phone, no partial-month refunds."
	canonical="/membership-terms"
	ogImage="club-car"
	jsonLd={jsonLd}
/>
<PageHero eyebrow="LEGAL" title="Unlimited Wash Club — Membership Terms" subtitle="Last updated: November 2026. Plain-language terms for every Unlimited Wash Club plan." />

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	<div class="space-y-8 leading-relaxed text-muted">
		<section>
			<h2 class="font-display text-2xl font-black text-navy">1. Plans and price</h2>
			<p class="mt-2">The Unlimited Wash Club has three plans: Basic Club ${memberships[0].price}/mo, Premium Club ${memberships[1].price}/mo and Deluxe Club ${memberships[2].price}/mo. Prices are in US dollars and include applicable taxes. The price shown when you join is the price that applies; if a price changes, we will tell you before your next billing date and you can cancel if you do not accept the change.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">2. Billing</h2>
			<p class="mt-2">Plans are month-to-month. {memberships[0].billing} — if you join on the 15th, you are billed on the 15th of each month. Your first month starts the day you join. Payment is taken automatically from the card on file in your account.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">3. What is included</h2>
			<p class="mt-2">Each plan covers one registered vehicle and includes unlimited washes at the plan level at all 8 Florida Shine locations, with a limit of {memberships[0].dailyLimit.toLowerCase()}. Extra vehicles can be added for ${memberships[0].extraVehiclePrice}/mo (Basic), ${memberships[1].extraVehiclePrice}/mo (Premium) or ${memberships[2].extraVehiclePrice}/mo (Deluxe). Washes are for the registered vehicle only and cannot be shared between vehicles.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">4. How we recognise your vehicle</h2>
			<p class="mt-2">Your vehicle is recognised by an {memberships[0].recognition.toLowerCase()} on your windshield — no card to show and no app to open. The sticker is issued when you join and works at every location. Keep it on the windshield; if it is damaged or stops scanning, ask any location for a free replacement.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">5. Cancelling — the same way you joined</h2>
			<p class="mt-2">You can cancel in the same manner you joined: online in <a href="/account" class="font-bold text-navy underline underline-offset-2">your account</a>, in person at any location, or by phone on (305) 555-0198. There is no cancellation fee and no phone call is required if you cancel online. When you cancel, your plan runs to the end of the paid month — you can keep washing until then — and does not renew.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">6. Refunds</h2>
			<p class="mt-2">A partial month is not refundable: if you cancel halfway through a paid month, you are not charged again, but the days remaining in that month are not refunded. If we charge you in error, tell us and we will put it right.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">7. Selling or transferring your vehicle</h2>
			<p class="mt-2">Your membership belongs to you, not to the car. If you sell or transfer your vehicle, remove the RFID sticker — it does not transfer to the new owner and a sticker left on a sold car will keep washing that car on your plan. Add your new vehicle in your account or at any location and we will issue a new sticker. You can swap your registered vehicle up to 2 times a year, free.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">8. Pausing and changes</h2>
			<p class="mt-2">You can pause your plan in your account for up to 60 days a year; billing stops while paused and resumes when you reactivate. You can change plans in your account — a change applies from your next billing date. We may update these terms; we will update this page and the signs at each wash when we do.</p>
		</section>
		<section>
			<h2 class="font-display text-2xl font-black text-navy">9. Contact</h2>
			<p class="mt-2">Florida Shine Car Wash, 1200 Biscayne Blvd, Miami, FL 33132. Email <a class="font-bold text-navy" href="mailto:hello@floridashinecarwash.com">hello@floridashinecarwash.com</a> · Phone <a class="font-bold text-navy" href="tel:+13055550198">(305) 555-0198</a>.</p>
		</section>
	</div>
</section>
