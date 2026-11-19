<script lang="ts">
	import { ChevronLeft, ChevronRight, Pause, Play, Star } from '@lucide/svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import type { EmblaCarouselType } from 'embla-carousel';

	type Review = { name: string; city: string; rating: number; service: string; date: string; text: string };
	let { reviews }: { reviews: Review[] } = $props();

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

<div class="min-w-0" role="region" aria-roledescription="carousel" aria-label="Customer reviews">
	<div
		class="min-w-0 overflow-hidden rounded-3xl bg-white ring-1 ring-line"
		use:emblaCarouselSvelte={{ options: { loop: true }, plugins }}
		onemblaInit={onEmblaInit}
	>
		<div class="flex min-w-0">
			{#each reviews as r, i}
				<div class="min-w-0 flex-[0_0_100%]" aria-roledescription="slide" aria-label="{i + 1} of {reviews.length}">
					<blockquote class="min-w-0 p-6 sm:p-8">
						<p class="flex gap-0.5 text-sun" aria-label="{r.rating} out of 5 stars">
							{#each Array(r.rating) as _}<Star class="h-4 w-4 fill-current" aria-hidden="true" />{/each}
						</p>
						<p class="mt-3 min-w-0 leading-relaxed text-ink">"{r.text}"</p>
						<footer class="mt-4 text-sm">
							<strong class="text-navy">{r.name}</strong>
							<span class="text-muted"> · {r.city} · {r.service} · {r.date}</span>
						</footer>
					</blockquote>
				</div>
			{/each}
		</div>
	</div>
	<div class="mt-4 flex min-w-0 items-center justify-between gap-3">
		<div class="flex min-w-0 flex-wrap gap-2" aria-label="Choose testimonial">
			{#each snaps as _, i}
				<button
					type="button"
					onclick={() => goTo(i)}
					aria-label="Testimonial {i + 1} of {snaps.length}"
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
					aria-label={paused ? 'Play testimonial autoplay' : 'Pause testimonial autoplay'}
					class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-sky-light"
				>
					{#if paused}<Play class="h-5 w-5" aria-hidden="true" />{:else}<Pause class="h-5 w-5" aria-hidden="true" />{/if}
				</button>
			{/if}
			<button
				type="button"
				onclick={prev}
				aria-label="Previous testimonial"
				class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-sky-light"
			>
				<ChevronLeft class="h-5 w-5" aria-hidden="true" />
			</button>
			<button
				type="button"
				onclick={next}
				aria-label="Next testimonial"
				class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-sky-light"
			>
				<ChevronRight class="h-5 w-5" aria-hidden="true" />
			</button>
		</div>
	</div>
</div>
