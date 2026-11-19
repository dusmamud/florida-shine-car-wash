<script lang="ts">
	import { ChevronLeft, ChevronRight, Pause, Play } from '@lucide/svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import type { EmblaCarouselType } from 'embla-carousel';
	import Picture from '#lib/components/Picture.svelte';
	import type { GalleryItem } from '#lib/data/site.ts';

	let { items }: { items: GalleryItem[] } = $props();

	let index = $state(0);
	let snaps = $state<number[]>([]);
	let paused = $state(false);
	let emblaApi: EmblaCarouselType | undefined = $state(undefined);
	// Autoplay is only ever added when motion is wanted. Evaluated once at
	// component init on the client; the Embla action only runs in the browser
	// anyway, so this never runs during prerender.
	let reduced = $state(
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
	const plugins =
		typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
			? [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true })]
			: [];

	const onEmblaInit = (e: CustomEvent<EmblaCarouselType>) => {
		emblaApi = e.detail;
		snaps = emblaApi.scrollSnapList();
		emblaApi.on('select', () => {
			index = emblaApi?.selectedScrollSnap() ?? 0;
		});
		emblaApi.on('reInit', () => {
			snaps = emblaApi?.scrollSnapList() ?? [];
		});
		// A drag means the user took control — stop autoplay and say so.
		emblaApi.on('pointerDown', () => {
			paused = true;
		});
	};

	// Live reduced-motion change: stop the autoplay plugin if it exists.
	$effect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const onChange = () => {
			reduced = mq.matches;
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});
	$effect(() => {
		const autoplay = emblaApi?.plugins()?.autoplay as { play: () => void; stop: () => void } | undefined;
		if (!autoplay) return;
		if (reduced || paused) autoplay.stop();
		else autoplay.play();
	});

	const goTo = (i: number) => {
		paused = true;
		emblaApi?.scrollTo(i);
	};
	const prev = () => {
		paused = true;
		emblaApi?.scrollPrev();
	};
	const next = () => {
		paused = true;
		emblaApi?.scrollNext();
	};
</script>

<div class="min-w-0" role="region" aria-roledescription="carousel" aria-label="Gallery highlights">
	<!-- min-w-0 on viewport, track and every slide ancestor: an Embla track's
	     min-content width caused 841px overflow at 390px on a sibling project. -->
	<div
		class="min-w-0 overflow-hidden"
		use:emblaCarouselSvelte={{ options: { loop: true, align: 'start' }, plugins }}
		onemblaInit={onEmblaInit}
	>
		<div class="flex min-w-0 -mx-3">
			{#each items as item, i}
				<figure
					class="min-w-0 shrink-0 grow-0 basis-full px-3 sm:basis-1/2 lg:basis-1/3"
					aria-roledescription="slide"
					aria-label="{i + 1} of {items.length}"
				>
					<div class="overflow-hidden rounded-3xl bg-white shadow ring-1 ring-line">
						<Picture
							src={item.image}
							alt={item.alt}
							width={800}
							height={600}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							class="aspect-[4/3] w-full"
						/>
						<div class="flex min-w-0 items-center justify-between gap-2 px-4 py-3">
							<span class="min-w-0 font-bold text-navy">{item.title}</span>
							<span class="shrink-0 rounded-full bg-sky-light px-2.5 py-1 text-xs font-bold text-navy">{item.category}</span>
						</div>
					</div>
				</figure>
			{/each}
		</div>
	</div>
	<div class="mt-4 flex min-w-0 items-center justify-between gap-3">
		<div class="flex min-w-0 flex-wrap gap-2" aria-label="Choose gallery slide">
			{#each snaps as _, i}
				<button
					type="button"
					onclick={() => goTo(i)}
					aria-label="Gallery slide {i + 1} of {snaps.length}"
					aria-current={index === i}
					class="h-3 min-h-3 rounded-full transition-all duration-200 {index === i ? 'w-8 bg-navy' : 'w-3 bg-line hover:bg-sky'}"
				></button>
			{/each}
		</div>
		<div class="flex shrink-0 items-center gap-2">
			{#if !reduced}
				<button
					type="button"
					onclick={() => (paused = !paused)}
					aria-label={paused ? 'Play gallery autoplay' : 'Pause gallery autoplay'}
					class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-sky-light"
				>
					{#if paused}<Play class="h-5 w-5" aria-hidden="true" />{:else}<Pause class="h-5 w-5" aria-hidden="true" />{/if}
				</button>
			{/if}
			<button
				type="button"
				onclick={prev}
				aria-label="Previous gallery slide"
				class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-sky-light"
			>
				<ChevronLeft class="h-5 w-5" aria-hidden="true" />
			</button>
			<button
				type="button"
				onclick={next}
				aria-label="Next gallery slide"
				class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-sky-light"
			>
				<ChevronRight class="h-5 w-5" aria-hidden="true" />
			</button>
		</div>
	</div>
</div>
