<script lang="ts">
	// Reveal-on-scroll. Content is VISIBLE by default (prerendered HTML, no-JS, and
	// no-scroll all show it). The hidden state is only applied from JS, in $effect,
	// before observing — and a 1.5s timeout reveals it even if the observer never fires.
	let { children }: { children: import('svelte').Snippet } = $props();
	let el: HTMLElement | undefined = $state();
	$effect(() => {
		if (!el) return;
		el.classList.add('reveal-js');
		const reveal = () => {
			el?.classList.add('is-visible');
		};
		const fallback = window.setTimeout(reveal, 1500);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						reveal();
						io.disconnect();
						window.clearTimeout(fallback);
					}
				}
			},
			{ threshold: 0.1 }
		);
		io.observe(el);
		return () => {
			io.disconnect();
			window.clearTimeout(fallback);
		};
	});
</script>

<div bind:this={el} class="reveal">
	{@render children()}
</div>
