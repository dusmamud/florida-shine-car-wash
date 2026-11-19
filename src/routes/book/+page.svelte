<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft, ArrowRight, CalendarCheck, Check, MapPin } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { addons, bookingRef, locations, packages, services, sizeUpcharges, sizeUpchargeNote, slotAvailable, timeSlots } from '#lib/data/site.ts';

	let step = $state(1);
	let choice = $state('package:premium-wash');
	let locationSlug = $state('miami-downtown');

	// Query params (?package= / ?service= / ?location=) are read on the client only —
	// searchParams are unavailable during prerender.
	$effect(() => {
		const params = page.url.searchParams;
		const pkg = params.get('package');
		const svc = params.get('service');
		const loc = params.get('location');
		if (pkg && packages.some((p) => p.slug === pkg)) choice = `package:${pkg}`;
		else if (svc && services.some((s) => s.slug === svc)) choice = `service:${svc}`;
		if (loc && locations.some((l) => l.slug === loc)) locationSlug = loc;
	});
	let dateISO = $state('');
	let slot = $state('');
	let make = $state('');
	let model = $state('');
	let year = $state('');
	let size = $state('Sedan');
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let selectedAddons = $state<string[]>([]);
	let done = $state(false);
	let errorMsg = $state('');

	const todayISO = new Date().toISOString().slice(0, 10);

	// P0-1: a slot picked for one location/date must not survive a change of
	// location or date. Reset only when the value actually changes after mount.
	let prevLocation: string | undefined = undefined;
	let prevDate: string | undefined = undefined;
	$effect(() => {
		if (prevLocation === undefined || prevDate === undefined) {
			prevLocation = locationSlug;
			prevDate = dateISO;
			return;
		}
		if (locationSlug !== prevLocation || dateISO !== prevDate) {
			slot = '';
			prevLocation = locationSlug;
			prevDate = dateISO;
		}
	});

	const choiceLabel = $derived.by(() => {
		const [kind, slug] = choice.split(':');
		if (kind === 'package') return packages.find((p) => p.slug === slug)?.name ?? 'Premium Wash';
		return services.find((s) => s.slug === slug)?.name ?? 'Exterior Wash';
	});
	const choicePrice = $derived.by(() => {
		const [kind, slug] = choice.split(':');
		if (kind === 'package') return packages.find((p) => p.slug === slug)?.price ?? 28;
		return services.find((s) => s.slug === slug)?.priceFrom ?? 16;
	});
	// ETA from the chosen item's own duration — e.g. Ceramic Coating is 2 hours.
	const eta = $derived.by(() => {
		const [kind, slug] = choice.split(':');
		const duration =
			kind === 'package'
				? (packages.find((p) => p.slug === slug)?.duration ?? 'About 15 minutes')
				: (services.find((s) => s.slug === slug)?.duration ?? '15 min');
		const text = duration.replace(/^About /i, '');
		return `about ${text.toLowerCase() === text ? text : text.charAt(0).toLowerCase() + text.slice(1)}`;
	});
	const location = $derived(locations.find((l) => l.slug === locationSlug) ?? locations[0]);
	const addonTotal = $derived(selectedAddons.reduce((sum, n) => sum + (addons.find((a) => a.name === n)?.price ?? 0), 0));
	const sizeUpcharge = $derived(sizeUpcharges[size] ?? 0);
	const total = $derived(choicePrice + sizeUpcharge + addonTotal);
	const ref = $derived(bookingRef(name || 'guest', dateISO || todayISO));
	const formattedWhen = $derived.by(() => {
		if (!dateISO) return '';
		const d = new Date(`${dateISO}T12:00:00`);
		const datePart = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
		return slot ? `${datePart} at ${slot}` : datePart;
	});
	const vehicleLine = $derived(
		[year.trim(), make.trim(), model.trim()].filter(Boolean).join(' ') + ` (${size})`
	);

	function next() {
		errorMsg = '';
		if (step === 3) {
			if (!dateISO || !slot) {
				errorMsg = 'Please pick a date and a time slot.';
				return;
			}
			if (dateISO < todayISO) {
				errorMsg = 'That date is in the past. Please pick today or a future date.';
				return;
			}
			if (!slotAvailable(dateISO, slot, locationSlug)) {
				errorMsg = `Sorry — ${slot} on ${formattedWhen} at ${location.name} is no longer available. Please pick another time.`;
				slot = '';
				return;
			}
		}
		if (step === 4) {
			if (!make.trim() || !model.trim() || !name.trim() || !phone.trim()) {
				errorMsg = 'Please fill in your vehicle and contact details so we can confirm your booking.';
				return;
			}
			if (phone.replace(/\D/g, '').length < 10) {
				errorMsg = 'Please enter a valid phone number with at least 10 digits.';
				return;
			}
			if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
				errorMsg = 'That email address does not look right — please check it.';
				return;
			}
			done = true;
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}
		step += 1;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Seo
	title="Book an Appointment — Florida Shine Car Wash"
	description="Book a wash or detailing appointment at any of our 8 Florida locations in under two minutes. Pick a service, date and time — pay at the wash, no card needed."
	canonical="/book"
	ogImage="hero-soapy-car"
/>
<PageHero eyebrow="BOOK AN APPOINTMENT" title="Book Your Shine" subtitle="Pick a service, a location and a time — done in under two minutes. No payment now; pay at the wash." />

{#if done}
	<section class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
		<div class="rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-line sm:p-10" role="status">
			<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sun text-navy"><CalendarCheck class="h-8 w-8" aria-hidden="true" /></span>
			<h2 class="mt-4 font-display text-3xl font-black text-navy">You're booked, {name}!</h2>
			<p class="mt-2 text-muted">Your appointment is confirmed. This is a mock booking — no payment was taken.</p>
			<dl class="mt-6 space-y-2 rounded-2xl bg-sky-light p-5 text-left text-sm">
				<div class="flex justify-between gap-4"><dt class="font-bold text-navy">Reference</dt><dd class="font-black text-navy">{ref}</dd></div>
				<div class="flex justify-between gap-4"><dt class="font-bold text-navy">Service</dt><dd>{choiceLabel} — ${choicePrice}</dd></div>
				{#if sizeUpcharge > 0}<div class="flex justify-between gap-4"><dt class="font-bold text-navy">Vehicle size ({size})</dt><dd>+${sizeUpcharge}</dd></div>{/if}
				{#if selectedAddons.length > 0}<div class="flex justify-between gap-4"><dt class="font-bold text-navy">Add-ons</dt><dd>{selectedAddons.join(', ')} (+${addonTotal})</dd></div>{/if}
				<div class="flex justify-between gap-4"><dt class="font-bold text-navy">Location</dt><dd>{location.name} — {location.address}, {location.city}, FL {location.zip}</dd></div>
				<div class="flex justify-between gap-4"><dt class="font-bold text-navy">When</dt><dd>{formattedWhen}</dd></div>
				<div class="flex justify-between gap-4"><dt class="font-bold text-navy">Vehicle</dt><dd>{vehicleLine}</dd></div>
				<div class="flex justify-between gap-4"><dt class="font-bold text-navy">Estimated time</dt><dd>{eta}</dd></div>
				<div class="flex justify-between gap-4 border-t border-line pt-2"><dt class="font-black text-navy">Total (pay at wash)</dt><dd class="font-black text-navy">${total}</dd></div>
			</dl>
			<div class="mt-6 rounded-2xl bg-foam p-4 text-left text-sm">
				<p class="font-black text-navy">What to bring</p>
				<ul class="mt-2 list-disc space-y-1 pl-5 text-muted">
					<li>Your booking reference ({ref}) — show it on your phone or just give your name.</li>
					<li>Remove valuables and loose items from the car before you arrive.</li>
					<li>Arrive 5 minutes early; members use the member-only lane.</li>
				</ul>
			</div>
			<p class="mt-4 text-sm text-muted">
				Need to change it? <a href="/track-booking" class="inline-flex min-h-11 items-center font-bold text-navy-light underline-offset-2 hover:underline">Manage / reschedule this booking</a>
			</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<a href="/locations" class="inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 font-black text-navy">View Location</a>
				<a href="/" class="inline-flex min-h-12 items-center rounded-full bg-sun px-6 py-3 font-black text-navy">Back to Home</a>
			</div>
		</div>
	</section>
{:else}
	<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
		<!-- Stepper -->
		<ol class="flex items-center justify-between gap-1 text-center text-xs font-black sm:text-sm" aria-label="Booking progress">
			{#each ['Service', 'Location', 'Date & Time', 'Your Details'] as label, i}
				<li class="flex-1">
					<span class="mx-auto flex h-10 w-10 items-center justify-center rounded-full {step > i + 1 ? 'bg-sun text-navy' : step === i + 1 ? 'bg-navy text-white' : 'bg-white text-muted ring-1 ring-line'}">
						{#if step > i + 1}<Check class="h-5 w-5" aria-hidden="true" />{:else}{i + 1}{/if}
					</span>
					<span class="mt-1 block {step === i + 1 ? 'text-navy' : 'text-muted'}">{label}</span>
				</li>
			{/each}
		</ol>

		<div class="mt-8 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-line sm:p-8">
			{#if step === 1}
				<h2 class="font-display text-2xl font-black text-navy">Step 1 — Choose a service or package</h2>
				<fieldset class="mt-5 min-w-0">
					<legend class="font-bold text-navy">Wash packages</legend>
					<div class="mt-2 grid gap-3 sm:grid-cols-3">
						{#each packages as p}
							<label class="cursor-pointer rounded-2xl border-2 p-4 focus-within:ring-2 focus-within:ring-navy focus-within:ring-offset-2 {choice === `package:${p.slug}` ? 'border-sun bg-sun/10' : 'border-line'}">
								<input type="radio" name="choice" value="package:{p.slug}" bind:group={choice} class="sr-only" />
								<span class="block font-black text-navy">{p.name}</span>
								<span class="block text-sm text-muted">{p.tagline}</span>
								<span class="mt-2 block font-display text-2xl font-black text-navy">${p.price}</span>
							</label>
						{/each}
					</div>
				</fieldset>
				<fieldset class="mt-6 min-w-0">
					<legend class="font-bold text-navy">Detailing services</legend>
					<div class="mt-2 grid gap-3 sm:grid-cols-2">
						{#each services as s}
							<label class="cursor-pointer rounded-2xl border-2 p-4 focus-within:ring-2 focus-within:ring-navy focus-within:ring-offset-2 {choice === `service:${s.slug}` ? 'border-sun bg-sun/10' : 'border-line'}">
								<input type="radio" name="choice" value="service:{s.slug}" bind:group={choice} class="sr-only" />
								<span class="block font-black text-navy">{s.name}</span>
								<span class="block text-sm text-muted">{s.short}</span>
								<span class="mt-2 block font-display text-2xl font-black text-navy">from ${s.priceFrom}</span>
							</label>
						{/each}
					</div>
				</fieldset>
				<fieldset class="mt-6 min-w-0">
					<legend class="font-bold text-navy">Add-ons (optional)</legend>
					<div class="mt-2 grid gap-3 sm:grid-cols-2">
						{#each addons as a}
							<label class="cursor-pointer rounded-2xl border-2 p-4 focus-within:ring-2 focus-within:ring-navy focus-within:ring-offset-2 {selectedAddons.includes(a.name) ? 'border-sun bg-sun/10' : 'border-line'}">
								<input type="checkbox" value={a.name} bind:group={selectedAddons} class="sr-only" />
								<span class="block font-black text-navy">{a.name} +${a.price}</span>
								<span class="mt-1 block text-sm text-muted">{a.note}</span>
							</label>
						{/each}
					</div>
					<p class="mt-3 text-sm text-muted">{sizeUpchargeNote}</p>
				</fieldset>
			{:else if step === 2}
				<h2 class="font-display text-2xl font-black text-navy">Step 2 — Choose a location</h2>
				<div class="mt-5 space-y-3">
					{#each locations as loc}
						<label class="flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 focus-within:ring-2 focus-within:ring-navy focus-within:ring-offset-2 {locationSlug === loc.slug ? 'border-sun bg-sun/10' : 'border-line'}">
							<input type="radio" name="location" value={loc.slug} bind:group={locationSlug} class="mt-1 h-5 w-5 accent-[#0a2a5e]" />
							<span>
								<span class="flex items-center gap-1.5 font-black text-navy"><MapPin class="h-4 w-4" aria-hidden="true" /> {loc.name}</span>
								<span class="block text-sm text-muted">{loc.address}, {loc.city}, FL {loc.zip} · {loc.phone}</span>
								<span class="block text-sm text-muted">{loc.hours}</span>
							</span>
						</label>
					{/each}
				</div>
			{:else if step === 3}
				<h2 class="font-display text-2xl font-black text-navy">Step 3 — Pick a date &amp; time</h2>
				<div class="mt-5">
					<label for="bdate" class="font-bold text-navy">Date</label>
					<input id="bdate" type="date" bind:value={dateISO} min={todayISO} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3 text-navy" />
				</div>
				{#if dateISO}
					<fieldset class="mt-6 min-w-0">
						<legend class="font-bold text-navy">Available times at {location.name}</legend>
						<div class="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
							{#each timeSlots as t}
								{@const free = slotAvailable(dateISO, t, locationSlug)}
								<button type="button" disabled={!free} onclick={() => (slot = t)} aria-pressed={slot === t} class="min-h-12 rounded-xl px-2 py-2.5 text-sm font-bold {slot === t ? 'bg-sun text-navy' : free ? 'bg-sky-light text-navy hover:bg-sun/50' : 'cursor-not-allowed bg-foam text-muted/50 line-through'}">
									{t}{#if !free} — full{/if}
								</button>
							{/each}
						</div>
						<p class="mt-2 text-xs text-muted">Availability is a mock preview — the same date, time and location always show the same slots.</p>
					</fieldset>
				{:else}
					<p class="mt-4 text-sm text-muted">Pick a date to see available time slots.</p>
				{/if}
			{:else}
				<h2 class="font-display text-2xl font-black text-navy">Step 4 — Vehicle &amp; your details</h2>
				<div class="mt-5 grid gap-4 sm:grid-cols-3">
					<div>
						<label for="make" class="font-bold text-navy">Make *</label>
						<input id="make" type="text" bind:value={make} placeholder="Toyota" autocomplete="off" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" />
					</div>
					<div>
						<label for="model" class="font-bold text-navy">Model *</label>
						<input id="model" type="text" bind:value={model} placeholder="Camry" autocomplete="off" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" />
					</div>
					<div>
						<label for="year" class="font-bold text-navy">Year</label>
						<input id="year" type="number" bind:value={year} placeholder="2023" min="1950" max="2027" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" />
					</div>
				</div>
				<div class="mt-4">
					<label for="size" class="font-bold text-navy">Vehicle size</label>
					<select id="size" bind:value={size} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
						{#each ['Sedan', 'SUV', 'Truck', 'Van', 'Sports car'] as s}<option>{s}</option>{/each}
					</select>
					<p class="mt-1 text-sm text-muted">{sizeUpchargeNote}</p>
				</div>
				<div class="mt-4 grid gap-4 sm:grid-cols-2">
					<div>
						<label for="bname" class="font-bold text-navy">Your name *</label>
						<input id="bname" type="text" bind:value={name} autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" placeholder="Alex Rivera" />
					</div>
					<div>
						<label for="bphone" class="font-bold text-navy">Phone *</label>
						<input id="bphone" type="tel" bind:value={phone} autocomplete="tel" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" placeholder="(305) 555-0100" />
					</div>
				</div>
				<div class="mt-4">
					<label for="bemail" class="font-bold text-navy">Email (for your confirmation)</label>
					<input id="bemail" type="email" bind:value={email} autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3" placeholder="alex@example.com" />
				</div>
				<div class="mt-6 rounded-2xl bg-sky-light p-4 text-sm">
					<p class="font-black text-navy">Your booking summary</p>
					<p class="mt-1">{choiceLabel} — ${choicePrice}{#if sizeUpcharge > 0} + {size} size upcharge (${sizeUpcharge}){/if}{#if selectedAddons.length} + {selectedAddons.join(', ')} (+${addonTotal}){/if}</p>
					<p>{location.name} · {formattedWhen}</p>
					<p class="font-black text-navy">Total to pay at the wash: ${total}</p>
				</div>
			{/if}

			{#if errorMsg}<p class="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{errorMsg}</p>{/if}
			<div class="mt-6 flex justify-between gap-3">
				{#if step > 1}
					<button type="button" onclick={() => (step -= 1)} class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-navy px-6 py-3 font-black text-navy"><ArrowLeft class="h-5 w-5" aria-hidden="true" /> Back</button>
				{:else}
					<span></span>
				{/if}
				<button type="button" onclick={next} class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-8 py-3 font-black text-navy">
					{step === 4 ? 'CONFIRM BOOKING' : 'CONTINUE'} <ArrowRight class="h-5 w-5" aria-hidden="true" />
				</button>
			</div>
		</div>
	</section>
{/if}
