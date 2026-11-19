<script lang="ts">
	import { untrack } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	let {
		value,
		decimals = 0,
		suffix = '',
		prefix = '',
		label,
		grouping = true
	}: {
		value: number;
		decimals?: number;
		suffix?: string;
		prefix?: string;
		label: string;
		grouping?: boolean;
	} = $props();

	// Start at the FINAL value so the prerendered HTML (and no-JS) already shows
	// the real number. The count-up only ever runs in JS, in view.
	// untrack: the prop is static site data; the Tween deliberately captures
	// its initial value once (this is not a reactive subscription).
	const tween = new Tween(untrack(() => value), { duration: 1400, easing: cubicOut });
	let el: HTMLElement | undefined = $state();

	const format = (n: number) => {
		const body =
			decimals > 0
				? n.toFixed(decimals)
				: grouping
					? Math.round(n).toLocaleString('en-US')
					: String(Math.round(n));
		return `${prefix}${body}${suffix}`;
	};
	const display = $derived(format(tween.current));
	// Static label for assistive tech: the animated text is not a live region,
	// so screen readers hear the final value once.
	const accessibleLabel = $derived(`${label}: ${format(value)}`);

	$effect(() => {
		if (!el) return;
		// Reduced motion: leave the final value in place, no animation.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		tween.set(0, { duration: 0 });
		let started = false;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting && !started) {
						started = true;
						tween.set(value);
						io.disconnect();
					}
				}
			},
			{ threshold: 0.4 }
		);
		io.observe(el);
		return () => io.disconnect();
	});
</script>

<div bind:this={el} class="min-w-0 text-center">
	<p class="font-display text-4xl font-black text-navy sm:text-5xl" aria-label={accessibleLabel}>{display}</p>
	<p class="mt-1 text-xs font-black tracking-[0.2em] text-muted">{label}</p>
</div>
