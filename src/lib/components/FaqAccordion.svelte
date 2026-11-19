<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	let { items }: { items: { q: string; a: string }[] } = $props();
	let openIdx = $state(0);
</script>

<div class="space-y-3">
	{#each items as item, i}
		<div class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
			<h2>
				<button
					type="button"
					aria-expanded={openIdx === i}
					aria-controls="faq-panel-{i}"
					onclick={() => (openIdx = openIdx === i ? -1 : i)}
					class="flex min-h-12 w-full items-center justify-between gap-3 px-5 py-4 text-left font-bold text-navy"
				>
					<span>{item.q}</span>
					<ChevronDown class="h-5 w-5 shrink-0 transition-transform duration-200 {openIdx === i ? 'rotate-180' : ''}" aria-hidden="true" />
				</button>
			</h2>
			{#if openIdx === i}
				<p id="faq-panel-{i}" class="px-5 pb-5 leading-relaxed text-muted">{item.a}</p>
			{/if}
		</div>
	{/each}
</div>
