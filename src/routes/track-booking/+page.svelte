<script lang="ts">
	import { CalendarClock, Search, X } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { locations, packages, services, slotAvailable, timeSlots } from '#lib/data/site.ts';

	let refInput = $state('');
	let contact = $state('');
	let lookedUp = $state(false);
	let err = $state('');
	let rescheduling = $state(false);
	let newDate = $state('');
	let newSlot = $state('');
	let rescheduled = $state(false);
	let cancelStep = $state(false);
	let cancelled = $state(false);

	const todayISO = new Date().toISOString().slice(0, 10);
	function fmt(iso: string) {
		return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
	}
	function hashOf(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
		return h;
	}
	// Deterministic mock booking derived from the reference, so any FS-##### ref
	// always shows the same consistent booking.
	const booking = $derived.by(() => {
		if (!lookedUp) return null;
		const ref = refInput.trim().toUpperCase();
		const h = hashOf(ref);
		const all = [
			...packages.map((p) => ({ name: p.name, price: p.price, duration: p.duration })),
			...services.map((s) => ({ name: s.name, price: s.priceFrom, duration: s.duration }))
		];
		const item = all[h % all.length];
		const loc = locations[h % locations.length];
		const d = new Date();
		d.setDate(d.getDate() + (h % 10) + 1);
		const dateISO = d.toISOString().slice(0, 10);
		const slot = timeSlots[h % timeSlots.length];
		return { ref, item, loc, dateISO, slot, total: item.price };
	});
	const displayDate = $derived(rescheduled && newDate ? newDate : booking?.dateISO ?? '');
	const displaySlot = $derived(rescheduled && newSlot ? newSlot : booking?.slot ?? '');

	function lookup(e: SubmitEvent) {
		e.preventDefault();
		const ref = refInput.trim().toUpperCase();
		if (!/^FS-\d{5}$/.test(ref)) {
			err = 'Enter a booking reference like FS-49886 — it starts with FS- followed by 5 digits.';
			lookedUp = false;
			return;
		}
		if (!contact.trim()) {
			err = 'Enter the phone number or email used for the booking.';
			lookedUp = false;
			return;
		}
		err = '';
		lookedUp = true;
		rescheduling = false;
		rescheduled = false;
		cancelStep = false;
		cancelled = false;
	}
	function confirmReschedule() {
		if (!newDate || newDate < todayISO || !newSlot) {
			err = 'Pick a future date and an available slot.';
			return;
		}
		if (!booking || !slotAvailable(newDate, newSlot, booking.loc.slug)) {
			err = 'That slot is no longer free — pick another.';
			return;
		}
		err = '';
		rescheduled = true;
		rescheduling = false;
	}
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Track Booking', item: 'https://florida-shine-car-wash.pages.dev/track-booking' }
		]
	};
</script>

<Seo
	title="Track & Manage Your Booking — Florida Shine Car Wash"
	description="Look up your Florida Shine booking by reference, then reschedule or cancel it yourself online — no phone call needed. Try the demo reference FS-49886."
	canonical="/track-booking"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="TRACK BOOKING"
	title="Find, Reschedule or Cancel Your Booking"
	subtitle="Enter your booking reference and the phone number or email you booked with. Reschedule or cancel online in a few clicks — no phone call needed."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Search class="h-6 w-6" aria-hidden="true" /> Look up your booking</h2>
		<form class="mt-5 space-y-4" onsubmit={lookup} novalidate>
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="min-w-0"><label for="t-ref" class="font-bold text-navy">Booking reference *</label><input id="t-ref" type="text" bind:value={refInput} placeholder="FS-49886" autocomplete="off" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3 uppercase" /></div>
				<div class="min-w-0"><label for="t-contact" class="font-bold text-navy">Phone or email used to book *</label><input id="t-contact" type="text" bind:value={contact} autocomplete="email" placeholder="(305) 555-0100 or you@example.com" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
			</div>
			{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
			<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 font-black text-navy">FIND MY BOOKING</button>
			<p class="text-center text-sm text-muted">No booking yet? <a href="/book" class="font-bold text-navy underline underline-offset-2">Book an appointment</a>. Demo reference: <strong class="text-navy">FS-49886</strong>. Rained on your wash? <a href="/rain-guarantee" class="font-bold text-navy underline underline-offset-2">Claim your free 48-hour rewash</a>.</p>
		</form>
	</div>

	{#if booking && !cancelled}
		<div class="mt-6 rounded-3xl bg-navy p-6 text-white shadow sm:p-8" role="status">
			<p class="text-xs font-black tracking-widest text-sun">DEMO BOOKING — {booking.ref}</p>
			<h2 class="mt-2 font-display text-2xl font-black">{booking.item.name}</h2>
			<dl class="mt-4 space-y-2 text-sm text-white/85">
				<div class="flex justify-between gap-4"><dt>Location</dt><dd class="font-bold text-white">{booking.loc.city} — {booking.loc.name}</dd></div>
				<div class="flex justify-between gap-4"><dt>Date</dt><dd class="font-bold text-white">{fmt(displayDate)}</dd></div>
				<div class="flex justify-between gap-4"><dt>Time</dt><dd class="font-bold text-white">{displaySlot}</dd></div>
				<div class="flex justify-between gap-4"><dt>Duration</dt><dd class="font-bold text-white">{booking.item.duration}</dd></div>
				<div class="flex justify-between gap-4"><dt>Total</dt><dd class="font-bold text-white">${booking.total}</dd></div>
			</dl>
			{#if rescheduled}<p class="mt-4 rounded-xl bg-sun px-4 py-3 text-sm font-bold text-navy" role="status">Rescheduled to {fmt(displayDate)} at {displaySlot}.</p>{/if}
			<p class="mt-3 text-xs text-white/60">This is a demo booking derived from your reference — it shows the same details every time for the same reference.</p>
			<div class="mt-5 flex flex-wrap gap-3">
				{#if !rescheduling}
					<button type="button" onclick={() => { rescheduling = true; newDate = booking.dateISO; newSlot = ''; }} class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-black text-navy"><CalendarClock class="h-4 w-4" aria-hidden="true" /> RESCHEDULE</button>
					<button type="button" onclick={() => (cancelStep = true)} class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-5 py-3 text-sm font-black text-white"><X class="h-4 w-4" aria-hidden="true" /> CANCEL BOOKING</button>
				{/if}
			</div>
			{#if rescheduling}
				<div class="mt-5 rounded-2xl bg-white/10 p-5">
					<h3 class="font-black">Pick a new date and time</h3>
					<div class="mt-3 min-w-0"><label for="t-date" class="text-sm font-bold">New date</label><input id="t-date" type="date" min={todayISO} bind:value={newDate} class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" /></div>
					{#if newDate}
						<fieldset class="mt-4 min-w-0">
							<legend class="text-sm font-bold">Available slots — {fmt(newDate)}</legend>
							<div class="mt-2 flex flex-wrap gap-2">
								{#each timeSlots as t}
									{@const free = slotAvailable(newDate, t, booking.loc.slug)}
									<button type="button" disabled={!free} onclick={() => (newSlot = t)} aria-pressed={newSlot === t} class="min-h-12 rounded-full border-2 px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40 disabled:line-through {newSlot === t ? 'border-sun bg-sun text-navy' : 'border-white/40 bg-white/10 text-white'}">{t}{free ? '' : ' — full'}</button>
								{/each}
							</div>
						</fieldset>
					{/if}
					{#if err}<p class="mt-3 rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
					<div class="mt-4 flex flex-wrap gap-3">
						<button type="button" onclick={confirmReschedule} class="inline-flex min-h-12 items-center rounded-full bg-sun px-5 py-3 text-sm font-black text-navy">CONFIRM NEW TIME</button>
						<button type="button" onclick={() => (rescheduling = false)} class="inline-flex min-h-12 items-center rounded-full border-2 border-white px-5 py-3 text-sm font-black text-white">KEEP ORIGINAL</button>
					</div>
				</div>
			{/if}
			{#if cancelStep}
				<div class="mt-5 rounded-2xl bg-white/10 p-5" role="alert">
					<p class="font-black">Cancel this booking?</p>
					<p class="mt-1 text-sm text-white/80">Cancelling is free and instant — no phone call needed. If you paid in advance, the refund goes back to your original payment method.</p>
					<div class="mt-4 flex flex-wrap gap-3">
						<button type="button" onclick={() => (cancelled = true)} class="inline-flex min-h-12 items-center rounded-full bg-sun px-5 py-3 text-sm font-black text-navy">YES, CANCEL IT</button>
						<button type="button" onclick={() => (cancelStep = false)} class="inline-flex min-h-12 items-center rounded-full border-2 border-white px-5 py-3 text-sm font-black text-white">KEEP MY BOOKING</button>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	{#if cancelled}
		<div class="mt-6 rounded-3xl bg-white p-6 text-center shadow ring-1 ring-line sm:p-8" role="status">
			<h2 class="font-display text-2xl font-black text-navy">Booking {booking?.ref} is cancelled.</h2>
			<p class="mx-auto mt-2 max-w-md text-muted">Your {booking?.item.name} at {booking?.loc.city} — {booking?.loc.name} on {booking ? fmt(displayDate) : ''} has been cancelled. A confirmation has been sent to {contact}.</p>
			<a href="/book" class="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">BOOK AGAIN</a>
		</div>
	{/if}
</section>
