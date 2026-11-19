<script lang="ts">
	import { Briefcase, MapPin } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { careers } from '#lib/data/site.ts';
	let applied = $state('');
</script>
<Seo
	title="Careers — Florida Shine Car Wash"
	description="Careers at Florida Shine Car Wash: wash attendant, detail technician, shift supervisor and customer service roles across Florida, from $16/hr. We train you and promote from within."
	canonical="/careers"
	ogImage="about-team"
/>
<PageHero eyebrow="JOIN THE TEAM" title="Careers at Florida Shine" subtitle="Sunny days, friendly drivers and cars that leave happier than they arrived. We train you, pay fairly and promote from within." />
<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
	<div class="grid gap-4">
		{#each careers as job}
			<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
				<h2 class="font-display text-xl font-black text-navy">{job.title}</h2>
				<p class="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted"><span class="flex items-center gap-1"><MapPin class="h-4 w-4" aria-hidden="true" /> {job.location}</span><span class="flex items-center gap-1"><Briefcase class="h-4 w-4" aria-hidden="true" /> {job.type}</span><span class="font-bold text-navy">{job.pay}</span></p>
				<p class="mt-3 leading-relaxed text-muted">{job.description}</p>
				{#if applied === job.title}
					<p class="mt-4 rounded-xl bg-sun/40 px-4 py-3 text-sm font-bold text-navy" role="status">Application noted! This is a mock listing — to apply for real, email your resume to careers@floridashinecarwash.com with "{job.title}" in the subject.</p>
				{:else}
					<button type="button" onclick={() => (applied = job.title)} class="mt-4 inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-3 text-sm font-black text-white">APPLY FOR THIS ROLE</button>
				{/if}
			</article>
		{/each}
	</div>
	<p class="mt-8 text-center text-muted">Don't see your role? Email <a class="font-bold text-navy" href="mailto:careers@floridashinecarwash.com">careers@floridashinecarwash.com</a> — we're always hiring great people.</p>
</section>
