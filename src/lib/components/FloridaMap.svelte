<script lang="ts">
	import { locations } from '#lib/data/site.ts';
	// Stylised Florida silhouette (viewBox 100x100) with pins positioned by lat/lng.
	// x: lng -87.6..-80.0 -> 0..100 ; y: lat 31.1..24.5 -> 0..100
	function x(lng: number): number {
		return ((lng + 87.6) / 7.6) * 100;
	}
	function y(lat: number): number {
		return ((31.1 - lat) / 6.6) * 100;
	}
	const floridaPath =
		'M3 9 L10 9 L20 11 L34 12 L48 13 L60 13 L72 12 L78 12 L83 18 L87 28 L91 40 L96 55 L98 68 L99 75 L98 82 L92 89 L85 93 L78 92 L74 82 L71 68 L68 58 L65 48 L67 42 L62 36 L57 29 L50 24 L42 20 L34 17 L24 14 L12 11 Z';
</script>

<div class="relative w-full overflow-hidden rounded-3xl bg-sky-light">
	<svg viewBox="0 0 100 100" class="block h-auto w-full" role="img" aria-label="Map of Florida with Florida Shine locations marked">
		<path d={floridaPath} fill="#0a2a5e" stroke="#7ec8f7" stroke-width="0.7" stroke-linejoin="round" />
		{#each locations as loc}
			<g transform="translate({x(loc.lng).toFixed(1)},{y(loc.lat).toFixed(1)})">
				<circle r="2.8" fill="#ffc700" stroke="#071f45" stroke-width="0.6" />
				<circle r="1.2" fill="#071f45" />
			</g>
		{/each}
	</svg>
	<ul class="flex flex-wrap gap-2 px-4 pb-4">
		{#each locations as loc}
			<li>
				<a href="/locations/{loc.slug}" class="inline-flex min-h-11 items-center rounded-full bg-white px-3 py-2 text-xs font-bold text-navy shadow-sm transition-colors hover:bg-sun">{loc.city} — {loc.name}</a>
			</li>
		{/each}
	</ul>
</div>
