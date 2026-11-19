<script lang="ts">
	import { locations } from '#lib/data/site.ts';
	// Stylised Florida silhouette (simplified) with location pins positioned by lat/lng.
	function x(lng: number): number {
		return ((lng + 87.6) / 7.6) * 100;
	}
	function y(lat: number): number {
		return ((31.1 - lat) / 6.2) * 100;
	}
</script>

<div class="relative w-full overflow-hidden rounded-3xl bg-sky-light">
	<svg viewBox="0 0 100 62" class="block h-auto w-full" role="img" aria-label="Map of Florida with Florida Shine locations marked">
		<path
			d="M4 22 L10 12 L22 8 L34 6 L48 8 L62 6 L76 10 L88 16 L96 22 L94 30 L86 34 L78 32 L72 38 L66 44 L60 52 L54 60 L48 56 L44 46 L38 40 L30 36 L20 34 L10 32 Z"
			fill="#0a2a5e"
		/>
		<path d="M4 22 L10 12 L22 8 L34 6 L48 8 L62 6 L76 10 L88 16 L96 22" fill="none" stroke="#7ec8f7" stroke-width="0.6" />
		{#each locations as loc}
			<g transform="translate({x(loc.lng)},{y(loc.lat)})">
				<circle r="2.6" fill="#ffc700" stroke="#071f45" stroke-width="0.5" />
				<circle r="1.1" fill="#071f45" />
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
