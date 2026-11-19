<script lang="ts">
	import Picture from '#lib/components/Picture.svelte';
	import { ChevronsLeftRight } from '@lucide/svelte';

	let { image, alt, title, beforeImage, caption }: { image: string; alt: string; title: string; beforeImage?: string; caption?: string } = $props();
	let pos = $state(50);
	let slider: HTMLInputElement | undefined = $state();

	function onInput(e: Event) {
		pos = Number((e.target as HTMLInputElement).value);
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') pos = Math.max(0, pos - 5);
		if (e.key === 'ArrowRight') pos = Math.min(100, pos + 5);
	}
</script>

<figure class="overflow-hidden rounded-3xl shadow-xl shadow-navy/10">
	<div class="relative aspect-[4/3] w-full select-none sm:aspect-[16/10]" role="group" aria-label={`Before and after comparison: ${title}`}>
		<!-- After (clean) -->
		<div class="absolute inset-0">
			<Picture src={image} {alt} width={1200} height={800} sizes="(max-width: 640px) 100vw, 800px" class="h-full w-full" />
			<span class="absolute right-3 top-3 rounded-full bg-sun px-3 py-1 text-xs font-black text-navy">AFTER</span>
		</div>
		<!-- Before: a genuinely dirty car photo when beforeImage is given; otherwise the same photo, dull-filtered -->
		<div class="absolute inset-0 overflow-hidden" style="width: {pos}%">
			<div class="absolute inset-0" style="width: {100 / (pos / 100 || 1)}%">
				{#if beforeImage}
					<Picture src={beforeImage} alt={`Before: ${alt}`} width={1200} height={800} sizes="(max-width: 640px) 100vw, 800px" class="h-full w-full" />
				{:else}
					<Picture src={image} alt={`Before: ${alt}`} width={1200} height={800} sizes="(max-width: 640px) 100vw, 800px" class="h-full w-full grayscale brightness-[0.72] contrast-[0.85] sepia-[0.25]" />
				{/if}
			</div>
			<span class="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-black text-white">BEFORE</span>
		</div>
		<!-- Divider + handle -->
		<div class="absolute inset-y-0" style="left: calc({pos}% - 2px)">
			<div class="h-full w-1 bg-white shadow"></div>
			<div class="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg" aria-hidden="true">
				<ChevronsLeftRight class="h-6 w-6" />
			</div>
		</div>
		<input
			bind:this={slider}
			type="range"
			min="0"
			max="100"
			value={pos}
			oninput={onInput}
			onkeydown={onKey}
			aria-label={`Drag to compare before and after: ${title}`}
			class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
		/>
	</div>
	<figcaption class="bg-white px-4 py-3 text-sm text-muted">
		<strong class="text-navy">{title}</strong> — drag the slider (or use arrow keys) to compare. {caption ??
			'The "before" view is the same photo with a dull filter applied — a mock preview.'}
	</figcaption>
</figure>
