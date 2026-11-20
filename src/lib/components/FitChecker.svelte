<script lang="ts">
	import { teslaGuidance, vehicleLimits } from '#lib/data/round3.ts';

	// Interactive fit-checker — used in /book (step 1) and the /memberships join form.
	// All limits are the site's published mock limits (see round3.ts), labelled as such.
	let fitType = $state('');
	const verdict = $derived.by(() => {
		switch (fitType) {
			case 'sedan':
			case 'suv':
				return {
					ok: true,
					title: 'Your vehicle fits the tunnel.',
					text: 'Standard cars and SUVs fit — the tunnel takes vehicles up to 7 ft (84 in) tall and 73 in wide.'
				};
			case 'pickup':
				return {
					ok: true,
					title: 'Standard pickups fit the tunnel.',
					text: 'Up to 7 ft tall and 73 in wide. Dual rear wheels (dually) do not fit — book a detail studio appointment instead.'
				};
			case 'tesla':
				return {
					ok: true,
					title: 'Teslas use the touchless lane only.',
					text: 'Tesla manuals say touchless washes only, or the warranty may not cover damage. Use Car Wash Mode (Controls > Service > Car Wash Mode) and Enable Free Roll on a conveyor.'
				};
			case 'cybertruck':
				return { ok: false, title: 'Cybertrucks do not go through any tunnel.', text: teslaGuidance.cybertruck };
			case 'dually':
				return {
					ok: false,
					title: 'Duallys do not fit the tunnel.',
					text: `${vehicleLimits.dually}. ${vehicleLimits.detailStudioNote}`
				};
			case 'oversized':
				return {
					ok: false,
					title: 'Oversized vehicles do not fit the tunnel.',
					text: vehicleLimits.detailStudioNote
				};
			case 'low':
				return {
					ok: false,
					title: 'Very low cars do not fit the tunnel.',
					text: `${vehicleLimits.clearanceLabel} — ${vehicleLimits.detailStudioNote}`
				};
			default:
				return null;
		}
	});
</script>

<div class="rounded-2xl bg-sky-light p-4">
	<label for="fit-type" class="font-bold text-navy">Will my vehicle fit?</label>
	<p class="mt-1 text-sm text-muted">
		Pick your vehicle type — the tunnel takes vehicles up to 7 ft (84 in) tall and 73 in wide. {vehicleLimits.label}
	</p>
	<select
		id="fit-type"
		bind:value={fitType}
		class="mt-2 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3 text-navy"
	>
		<option value="" disabled>Choose your vehicle type</option>
		<option value="sedan">Car / sedan / hatchback</option>
		<option value="suv">SUV / crossover</option>
		<option value="pickup">Pickup truck (standard, single rear wheels)</option>
		<option value="tesla">Tesla Model 3 / S / X / Y</option>
		<option value="cybertruck">Tesla Cybertruck</option>
		<option value="dually">Pickup with dual rear wheels (dually)</option>
		<option value="oversized">Oversized van / RV / limousine</option>
		<option value="low">Very low car (under 5 in ground clearance)</option>
	</select>
	{#if verdict}
		<p class="mt-3 rounded-xl bg-white p-3 text-sm leading-relaxed text-navy" role="status">
			<strong>{verdict.title}</strong>
			{verdict.text}
		</p>
	{/if}
	<p class="mt-3 text-sm">
		<a href="/ev-and-oversized" class="font-bold text-navy underline underline-offset-2">Full EV &amp; oversized-vehicle guide</a>
	</p>
</div>
