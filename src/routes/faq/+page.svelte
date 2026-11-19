<script lang="ts">
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { faqs } from '#lib/data/site.ts';
</script>
<svelte:head><title>FAQs — Florida Shine Car Wash</title></svelte:head>
<PageHero eyebrow="GOOD QUESTIONS" title="Frequently Asked Questions" subtitle="Everything Florida drivers ask us — wash times, appointments, memberships and rainy days." />
<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	<FaqAccordion items={faqs} />
	<p class="mt-8 text-center text-muted">Still curious? Call <a class="font-bold text-navy" href="tel:+13055550198">(305) 555-0198</a> or <a class="font-bold text-navy" href="/contact">send us a message</a>.</p>
</section>
