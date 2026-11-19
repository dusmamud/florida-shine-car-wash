<script lang="ts">
	import { Accessibility, Check, Mail, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { accessibility, site } from '#lib/data/site.ts';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Accessibility', item: 'https://florida-shine-car-wash.pages.dev/accessibility' }
		]
	};
</script>

<Seo
	title="Accessibility — Florida Shine Car Wash"
	description="Florida Shine accessibility: step-free access at all 8 locations, accessible parking, staff assistance through the tunnel, accessible restrooms, and our WCAG 2.2 AA commitment."
	canonical="/accessibility"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="ACCESSIBILITY"
	title="A Wash That Works for Everyone"
	subtitle="Step-free access, staff assistance and clear prices — in person at all 8 locations and on this website."
/>

<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
	<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		<p class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Accessibility class="h-7 w-7" aria-hidden="true" /> At our locations</p>
		<ul class="mt-5 space-y-3">
			{#each accessibility.features as f}
				<li class="flex items-start gap-3 leading-relaxed text-muted"><Check class="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" /> {f}</li>
			{/each}
		</ul>
	</div>

	<div class="mt-6 rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-black text-navy">On this website</h2>
		<p class="mt-3 leading-relaxed text-muted">{accessibility.statement}</p>
		<p class="mt-3 leading-relaxed text-muted">This site is built to WCAG 2.2 AA: text contrast of at least 4.5:1, keyboard navigation throughout, visible focus indicators, labels on every form field, and motion that respects your reduced-motion setting.</p>
	</div>

	<div class="mt-6 rounded-3xl bg-navy p-6 text-white sm:p-8">
		<h2 class="font-display text-2xl font-black">Hit a barrier? Tell us.</h2>
		<p class="mt-2 text-sm leading-relaxed text-white/80">If any part of a wash or this website is hard to use, we want to know so we can fix it. The fastest route is a phone call — a team member can also guide your car through the tunnel if you call ahead.</p>
		<p class="mt-4 space-y-2 text-sm">
			<a href={site.phoneHref} class="flex min-h-11 items-center gap-2 font-bold hover:text-sun"><Phone class="h-4 w-4" aria-hidden="true" /> {site.phone}</a>
			<a href="mailto:{site.email}" class="flex min-h-11 items-center gap-2 break-all font-bold hover:text-sun"><Mail class="h-4 w-4 shrink-0" aria-hidden="true" /> {site.email}</a>
		</p>
		<p class="mt-4 text-sm text-white/80">Or send a message from our <a href="/contact" class="font-bold text-sun underline underline-offset-2">contact page</a> — choose the "A wash issue" topic and describe the barrier.</p>
	</div>
</section>
