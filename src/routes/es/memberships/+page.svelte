<script lang="ts">
	import { Check } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { memberships } from '#lib/data/site.ts';
	import {
		breadcrumb,
		hreflangUrls,
		membershipBreakEven,
		membershipFeatures,
		membershipNames,
		membershipTaglines,
		membershipsPageEs
	} from '#lib/data/es.ts';

	$effect(() => {
		document.documentElement.lang = 'es';
	});

	const alt = hreflangUrls('/es/memberships', '/memberships');
	const jsonLd = breadcrumb([
		{ name: 'Inicio', path: '/es' },
		{ name: 'Membresías', path: '/es/memberships' }
	]);

	let selected = $state('premium-club');
	let joined = $state(false);
	let name = $state('');
	let email = $state('');
	let consent = $state(false);
	let errorMsg = $state('');
	function join(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim() || !email.includes('@')) {
			errorMsg = membershipsPageEs.errorDetails;
			return;
		}
		if (!consent) {
			errorMsg = membershipsPageEs.errorConsent;
			return;
		}
		errorMsg = '';
		joined = true;
	}
	const plan = $derived(memberships.find((m) => m.slug === selected) ?? memberships[1]);
	const planNameEs = $derived(membershipNames[plan.slug] ?? plan.name);
</script>

<svelte:head>
	<link rel="alternate" hreflang="es" href={alt.es} />
	<link rel="alternate" hreflang="en" href={alt.en} />
	<link rel="alternate" hreflang="x-default" href={alt.xDefault} />
</svelte:head>

<Seo
	title={membershipsPageEs.title}
	description={membershipsPageEs.description}
	canonical="/es/memberships"
	ogImage="club-car"
	jsonLd={jsonLd}
/>
<PageHero eyebrow={membershipsPageEs.eyebrow} title={membershipsPageEs.heading} subtitle={membershipsPageEs.subtitle} />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-3">
		{#each memberships as m}
			<article class="relative flex flex-col rounded-3xl bg-white p-6 shadow-lg shadow-navy/10 ring-1 ring-line {m.popular ? 'ring-2 ring-sun md:-translate-y-2' : ''}">
				{#if m.popular}<span class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-4 py-1 text-xs font-black text-navy">EL MÁS POPULAR</span>{/if}
				<h2 class="text-center font-display text-2xl font-black text-navy">{(membershipNames[m.slug] ?? m.name).toUpperCase()}</h2>
				<p class="mt-1 text-center text-sm text-muted">{membershipTaglines[m.slug] ?? m.tagline}</p>
				<p class="mt-4 text-center font-display text-5xl font-black text-navy">${m.price}<span class="text-base font-bold text-muted">/mes</span></p>
				<p class="mt-2 text-center text-sm font-bold text-navy-light">{membershipBreakEven[m.slug] ?? m.breakEven}</p>
				<ul class="mt-5 flex-1 space-y-2.5">
					{#each m.features as f}<li class="flex items-start gap-2 text-sm font-semibold"><Check class="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" /> {membershipFeatures[f] ?? f}</li>{/each}
				</ul>
				<button
					type="button"
					onclick={() => {
						selected = m.slug;
						document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
					}}
					class="mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-black {m.popular ? 'bg-sun text-navy' : 'bg-navy text-white'}"
				>
					{membershipsPageEs.joinButton(membershipNames[m.slug] ?? m.name)}
				</button>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6" aria-labelledby="how-heading">
	<h2 id="how-heading" class="font-display text-3xl font-black text-navy">{membershipsPageEs.howHeading}</h2>
	<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">{membershipsPageEs.billingTitle}</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{membershipsPageEs.billingText}</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">{membershipsPageEs.recognitionTitle}</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{membershipsPageEs.recognitionText}</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">{membershipsPageEs.dailyTitle}</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{membershipsPageEs.dailyText}</p>
		</div>
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line">
			<h3 class="font-black text-navy">{membershipsPageEs.extraTitle}</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">{membershipsPageEs.extraText}</p>
		</div>
	</div>
	<div class="mt-6 overflow-x-auto rounded-3xl bg-white shadow ring-1 ring-line">
		<table class="w-full min-w-[560px] text-left text-sm">
			<thead><tr class="border-b border-line bg-sky-light"><th class="px-4 py-3 font-black text-navy">{membershipsPageEs.tablePlan}</th><th class="px-4 py-3 font-black text-navy">{membershipsPageEs.tablePrice}</th><th class="px-4 py-3 font-black text-navy">{membershipsPageEs.tableBreakEven}</th><th class="px-4 py-3 font-black text-navy">{membershipsPageEs.tableExtra}</th></tr></thead>
			<tbody>
				{#each memberships as m}
					<tr class="border-b border-line last:border-0">
						<td class="px-4 py-3 font-bold text-navy">{membershipNames[m.slug] ?? m.name}</td>
						<td class="px-4 py-3">${m.price}/mes</td>
						<td class="px-4 py-3">{membershipBreakEven[m.slug] ?? m.breakEven}</td>
						<td class="px-4 py-3">+${m.extraVehiclePrice}/mes</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="mt-3 text-sm text-muted">{membershipsPageEs.breakEvenNote}</p>
</section>

<section id="join-form" class="mx-auto max-w-2xl px-4 pb-16 sm:px-6" aria-labelledby="join-heading">
	<div class="rounded-3xl bg-navy p-6 text-white shadow-xl sm:p-8">
		<h2 id="join-heading" class="font-display text-2xl font-black">{membershipsPageEs.joinHeading(planNameEs, plan.price)}</h2>
		<p class="mt-2 text-sm text-white/80">{membershipsPageEs.joinMockNote}</p>
		{#if joined}
			<div class="mt-6 rounded-2xl bg-sun p-5 text-navy" role="status">
				<p class="font-black">{membershipsPageEs.successTitle(name)}</p>
				<p class="mt-1 text-sm">{membershipsPageEs.successBody(planNameEs, plan.price, email)}</p>
				<p class="mt-3 text-sm">{membershipsPageEs.successTerms(planNameEs, plan.price)}</p>
				<p class="mt-3 text-sm font-bold">{membershipsPageEs.successManage} <a href="/account" class="underline underline-offset-2">{membershipsPageEs.accountLink}</a>. {membershipsPageEs.successQuestions}</p>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={join} novalidate>
				<div>
					<label for="plan" class="text-sm font-bold">{membershipsPageEs.planLabel}</label>
					<select id="plan" bind:value={selected} class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy">
						{#each memberships as m}<option value={m.slug}>{membershipNames[m.slug] ?? m.name} — ${m.price}/mes</option>{/each}
					</select>
				</div>
				<div>
					<label for="mname" class="text-sm font-bold">{membershipsPageEs.nameLabel}</label>
					<input id="mname" type="text" bind:value={name} autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="Alex Rivera" />
				</div>
				<div>
					<label for="memail" class="text-sm font-bold">{membershipsPageEs.emailLabel}</label>
					<input id="memail" type="email" bind:value={email} autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" placeholder="alex@example.com" />
				</div>
				<div class="rounded-2xl bg-white/10 p-4 text-sm">
					<p class="font-bold">{membershipsPageEs.termsTitle(planNameEs, plan.price)}</p>
					<p class="mt-1 text-white/80">{membershipsPageEs.termsText(plan.price)}</p>
				</div>
				<label class="flex min-h-12 cursor-pointer items-start gap-3 text-sm">
					<input type="checkbox" bind:checked={consent} class="mt-1 h-5 w-5 shrink-0 accent-[#ffc700]" />
					<span>{membershipsPageEs.consentText(plan.price)} <a href="/membership-terms" class="font-bold text-sun underline underline-offset-2">{membershipsPageEs.termsLink}</a></span>
				</label>
				{#if errorMsg}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{errorMsg}</p>{/if}
				<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 font-black text-navy">{membershipsPageEs.submit(planNameEs, plan.price)}</button>
				<p class="text-center text-xs text-white/60">{membershipsPageEs.footnote}</p>
			</form>
		{/if}
	</div>
</section>
