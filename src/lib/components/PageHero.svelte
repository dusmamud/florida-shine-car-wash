<script lang="ts">
	let { eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string } = $props();
</script>

<section class="bg-navy text-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
		<p class="text-xs font-black tracking-[0.25em] text-sun">{eyebrow}</p>
		<h1 class="mt-3 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">{title}</h1>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{subtitle}</p>
	</div>
</section>
