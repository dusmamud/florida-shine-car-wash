<script lang="ts">
	import { locations } from '#lib/data/site.ts';
	// `base` lets the Spanish pages reuse this map with /es/locations links.
	let { base = '/locations' }: { base?: string } = $props();
	// Florida silhouette: simplified outline derived from the state's real
	// geography — panhandle across the top, peninsula down the right side.
	// viewBox 0 0 100 100 with a 4-unit inset so pins never clip.
	function x(lng: number): number {
		return 4 + ((lng + 87.6) / 7.6) * 100 * 0.92;
	}
	function y(lat: number): number {
		return 4 + ((31.1 - lat) / 6.6) * 100 * 0.92;
	}
	const clamp = (v: number) => Math.min(96, Math.max(4, v));
	// Small leader offsets for the south-east cluster so the three pins
	// (Fort Lauderdale, Downtown Miami, Kendall) do not merge into one blob.
	// Spread a little wider than round-2: at 320px the two Miami pins still
	// sat a few pixels apart at the south-east tip.
	const offsets: Record<string, { dx: number; dy: number }> = {
		'fort-lauderdale': { dx: 0, dy: -5 },
		'miami-downtown': { dx: 3, dy: -4 },
		'miami-kendall': { dx: -4, dy: 4.5 }
	};
	const floridaPath =
		'M4.6 13.8 L8.8 9.6 L17.3 6.1 L27 6.1 L35.5 11 L42.7 13.1 L50 13.8 L59.7 16.5 L68.2 19.3 L75.4 13.8 L79.7 17.2 L80.9 27.7 L84.5 40.2 L88.7 50 L94.2 61.2 L95.4 73 L94.5 77.9 L93.6 86.2 L90.6 87.6 L83.9 85.5 L79.7 75.8 L74.2 71.7 L68.8 63.2 L65.1 56.3 L62.7 47.9 L66.3 48.6 L62.7 45.1 L61.5 37.5 L60.3 29.1 L57.9 22.8 L49.4 19.3 L43.3 20 L38.5 18.6 L34.9 20.7 L26.4 20.7 L20.9 14.5 L11.3 13.8 Z';
</script>

<div class="relative w-full overflow-hidden rounded-3xl bg-sky-light">
	<!-- viewBox inset (-2 -2 104 104): a 2-unit margin all round so the
	     lowest (Kendall) pin never sits on the container edge at 320px. -->
	<svg viewBox="-2 -2 104 104" class="block h-auto w-full" role="img" aria-label="Map of Florida with Florida Shine locations marked">
		<path d={floridaPath} fill="#0a2a5e" stroke="#7ec8f7" stroke-width="0.7" stroke-linejoin="round" />
		{#each locations as loc}
			{@const px = clamp(x(loc.lng))}
			{@const py = clamp(y(loc.lat))}
			{@const off = offsets[loc.slug] ?? { dx: 0, dy: 0 }}
			{@const qx = clamp(px + off.dx)}
			{@const qy = clamp(py + off.dy)}
			{#if off.dx !== 0 || off.dy !== 0}
				<line x1={px} y1={py} x2={qx} y2={qy} stroke="#ffc700" stroke-width="0.5" />
			{/if}
			<g transform="translate({qx.toFixed(1)},{qy.toFixed(1)})">
				<circle r="2.2" fill="#ffc700" stroke="#071f45" stroke-width="0.6" />
				<circle r="0.9" fill="#071f45" />
			</g>
		{/each}
	</svg>
	<ul class="flex flex-wrap gap-2 px-4 pb-4">
		{#each locations as loc}
			<li>
				<a href="{base}/{loc.slug}" class="inline-flex min-h-11 items-center rounded-full bg-white px-3 py-2 text-xs font-bold text-navy shadow-sm transition-colors hover:bg-sun">{loc.name}</a>
			</li>
		{/each}
	</ul>
</div>
