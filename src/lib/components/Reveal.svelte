<script lang="ts">
	let { children }: { children: import('svelte').Snippet } = $props();
	let el: HTMLElement | undefined = $state();
	$effect(() => {
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						el?.classList.add('is-visible');
						io.disconnect();
					}
				}
			},
			{ threshold: 0.1 }
		);
		io.observe(el);
		return () => io.disconnect();
	});
</script>

<div bind:this={el} class="reveal">
	{@render children()}
</div>
