<script lang="ts">
	import { BatteryCharging, Car, Ruler, TriangleAlert, Wrench } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { teslaGuidance, vehicleLimits } from '#lib/data/round3.ts';

	let evType = $state('petrol');
	let height = $state('under84');
	let width = $state('under73');
	let clearance = $state('over5');
	let tyre = $state('under135');
	let dually = $state('no');
	let checked = $state(false);

	const verdict = $derived.by(() => {
		if (!checked) return null;
		if (evType === 'cybertruck')
			return {
				tone: 'no',
				title: 'No automatic wash for a Cybertruck',
				text: 'The Cybertruck owner manual advises against automatic car washes altogether. We do not send Cybertrucks through any tunnel — book a hand wash at one of our detail studios instead.'
			};
		if (dually === 'yes')
			return {
				tone: 'studio',
				title: 'Detail studio by appointment',
				text: 'Dual rear wheels (dually) do not fit our tunnel tracks. Your truck is welcome at a detail studio by appointment — a hand wash and detail, not the tunnel.'
			};
		if (height === 'over84' || width === 'over73' || clearance === 'under5' || tyre === 'over135') {
			const reasons = [];
			if (height === 'over84') reasons.push('over 7 ft tall');
			if (width === 'over73') reasons.push('wider than 73 in');
			if (clearance === 'under5') reasons.push('under 5 in ground clearance');
			if (tyre === 'over135') reasons.push('tyres wider than 13.5 in');
			return {
				tone: 'studio',
				title: 'Detail studio by appointment',
				text: `Your vehicle is ${reasons.join(', ')} — outside our tunnel limits. Book a hand wash at a detail studio instead; the team will confirm the price on inspection.`
			};
		}
		if (evType === 'tesla')
			return {
				tone: 'touchless',
				title: 'It fits — touchless lane only',
				text: 'Your Tesla fits the tunnel, but it must go through the touchless lane only — Tesla manuals say touchless washes only, and other wash types can cause damage the warranty does not cover. Follow the Car Wash Mode steps below.'
			};
		if (evType === 'other-ev')
			return {
				tone: 'touchless',
				title: 'It fits — touchless lane recommended',
				text: 'Your EV fits the tunnel. We recommend the touchless lane: disable automatic wipers and parking sensors first, and never wash while charging.'
			};
		return {
			tone: 'fits',
			title: 'It fits the tunnel',
			text: 'Your vehicle is inside our tunnel limits. Drive in — the soft-touch tunnel wash takes about 5 minutes.'
		};
	});

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'EV & Oversized Vehicles', item: 'https://florida-shine-car-wash.pages.dev/ev-and-oversized' }
		]
	};
</script>

<Seo
	title="EV & Oversized Vehicles — Will My Car Fit? — Florida Shine Car Wash"
	description="Tesla touchless-only guidance, Car Wash Mode steps, Cybertruck rules, and a fit checker for tall, wide and dually vehicles. Check before you drive in."
	canonical="/ev-and-oversized"
	ogImage="ev-touchless-wash"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="EV & OVERSIZED"
	title="Will My Vehicle Fit?"
	subtitle="Teslas go touchless-only, Cybertrucks do not go through any automatic wash, and tall or dually vehicles need the detail studio. Check yours in 30 seconds — before you drive in."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 lg:grid-cols-2">
		<article class="overflow-hidden rounded-3xl bg-white shadow ring-1 ring-line">
			<Picture src="ev-touchless-wash" alt="A silver electric sedan in a touchless car wash tunnel, foam arches overhead and palm trees at the exit" width={1200} height={800} eager={true} class="block aspect-[3/2]" />
			<div class="p-6 sm:p-8">
				<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><BatteryCharging class="h-6 w-6 text-navy-light" aria-hidden="true" /> Electric vehicles</h2>
				<p class="mt-2 leading-relaxed text-muted">{teslaGuidance.touchlessOnly}</p>
				<h3 class="mt-5 font-black text-navy">Tesla Car Wash Mode — before you enter</h3>
				<ol class="mt-2 list-decimal space-y-1 pl-5 text-muted">
					{#each teslaGuidance.carWashModeSteps as step}
						<li>{step}</li>
					{/each}
				</ol>
				<p class="mt-4 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted"><strong class="text-navy">Cybertruck:</strong> {teslaGuidance.cybertruck}</p>
				<h3 class="mt-5 font-black text-navy">Every other EV</h3>
				<ul class="mt-2 list-disc space-y-1 pl-5 text-muted">
					{#each teslaGuidance.otherEvs as tip}
						<li>{tip}</li>
					{/each}
				</ul>
			</div>
		</article>

		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Ruler class="h-6 w-6 text-navy-light" aria-hidden="true" /> Will my vehicle fit? — fit checker</h2>
			<p class="mt-2 text-sm text-muted">{vehicleLimits.label}</p>
			<div class="mt-5 space-y-4">
				<div class="min-w-0">
					<label for="f-type" class="font-bold text-navy">What are you driving?</label>
					<select id="f-type" bind:value={evType} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
						<option value="petrol">Petrol / diesel car, SUV or truck</option>
						<option value="tesla">Tesla Model 3, S, X or Y</option>
						<option value="cybertruck">Tesla Cybertruck</option>
						<option value="other-ev">Other electric vehicle</option>
					</select>
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="min-w-0">
						<label for="f-height" class="font-bold text-navy">Height</label>
						<select id="f-height" bind:value={height} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
							<option value="under84">Under 7 ft (84 in)</option>
							<option value="over84">Over 7 ft (84 in)</option>
						</select>
					</div>
					<div class="min-w-0">
						<label for="f-width" class="font-bold text-navy">Width</label>
						<select id="f-width" bind:value={width} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
							<option value="under73">Under 73 in wide</option>
							<option value="over73">Over 73 in wide</option>
						</select>
					</div>
					<div class="min-w-0">
						<label for="f-clearance" class="font-bold text-navy">Ground clearance</label>
						<select id="f-clearance" bind:value={clearance} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
							<option value="over5">5 in or more</option>
							<option value="under5">Under 5 in</option>
						</select>
					</div>
					<div class="min-w-0">
						<label for="f-tyre" class="font-bold text-navy">Tyre width</label>
						<select id="f-tyre" bind:value={tyre} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
							<option value="under135">13.5 in or narrower</option>
							<option value="over135">Wider than 13.5 in</option>
						</select>
					</div>
				</div>
				<fieldset class="min-w-0">
					<legend class="font-bold text-navy">Dual rear wheels (dually)?</legend>
					<div class="mt-2 flex gap-3">
						<label class="flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border-2 px-4 font-bold {dually === 'no' ? 'border-sun bg-sun/10 text-navy' : 'border-line text-muted'}">
							<input type="radio" name="dually" value="no" bind:group={dually} class="sr-only" /> No
						</label>
						<label class="flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border-2 px-4 font-bold {dually === 'yes' ? 'border-sun bg-sun/10 text-navy' : 'border-line text-muted'}">
							<input type="radio" name="dually" value="yes" bind:group={dually} class="sr-only" /> Yes, dually
						</label>
					</div>
				</fieldset>
				<button type="button" onclick={() => (checked = true)} class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">CHECK MY VEHICLE</button>
			</div>
			{#if verdict}
				<div class="mt-5 rounded-2xl p-5 {verdict.tone === 'no' ? 'bg-red-100' : verdict.tone === 'fits' ? 'bg-sky-light' : 'bg-sun/20'}" role="status">
					<p class="flex items-center gap-2 font-black text-navy">
						{#if verdict.tone === 'no'}<TriangleAlert class="h-5 w-5" aria-hidden="true" />
						{:else if verdict.tone === 'fits'}<Car class="h-5 w-5" aria-hidden="true" />
						{:else}<Wrench class="h-5 w-5" aria-hidden="true" />{/if}
						{verdict.title}
					</p>
					<p class="mt-2 text-sm leading-relaxed text-muted">{verdict.text}</p>
					{#if verdict.tone === 'studio' || verdict.tone === 'no'}
						<a href="/book?service=interior-detailing" class="mt-4 inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white">BOOK A DETAIL STUDIO APPOINTMENT</a>
					{:else}
						<a href="/book" class="mt-4 inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white">BOOK YOUR WASH</a>
					{/if}
				</div>
			{/if}
		</article>
	</div>

	<article class="mt-6 rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-black text-navy">Tunnel limits — at a glance</h2>
		<p class="mt-1 text-sm text-muted">{vehicleLimits.label}</p>
		<dl class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-2xl bg-mist p-4"><dt class="font-black text-navy">Height</dt><dd class="mt-1 text-sm text-muted">{vehicleLimits.heightLabel}</dd></div>
			<div class="rounded-2xl bg-mist p-4"><dt class="font-black text-navy">Width</dt><dd class="mt-1 text-sm text-muted">{vehicleLimits.widthLabel}</dd></div>
			<div class="rounded-2xl bg-mist p-4"><dt class="font-black text-navy">Ground clearance</dt><dd class="mt-1 text-sm text-muted">{vehicleLimits.clearanceLabel}</dd></div>
			<div class="rounded-2xl bg-mist p-4"><dt class="font-black text-navy">Tyres</dt><dd class="mt-1 text-sm text-muted">{vehicleLimits.tyreLabel}</dd></div>
			<div class="rounded-2xl bg-mist p-4"><dt class="font-black text-navy">Dually</dt><dd class="mt-1 text-sm text-muted">{vehicleLimits.dually}</dd></div>
			<div class="rounded-2xl bg-mist p-4"><dt class="font-black text-navy">Not sure?</dt><dd class="mt-1 text-sm text-muted">{vehicleLimits.detailStudioNote}</dd></div>
		</dl>
		<h3 class="mt-6 font-black text-navy">Also excluded from the tunnel</h3>
		<ul class="mt-2 list-disc space-y-1 pl-5 text-muted">
			{#each vehicleLimits.excluded as item}
				<li>{item}</li>
			{/each}
		</ul>
		<p class="mt-4 text-sm text-muted">Limits can differ by tunnel — if you are unsure, call your location on <a href="tel:+13055550198" class="font-bold text-navy underline underline-offset-2">(305) 555-0198</a> before you drive in. A wasted trip is a one-star review we would rather avoid.</p>
	</article>
</section>
