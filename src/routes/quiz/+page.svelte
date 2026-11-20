<script lang="ts">
	import { ArrowRight, RotateCcw, Sparkles } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { packages } from '#lib/data/site.ts';
	import { quizQuestions } from '#lib/data/round3.ts';

	let step = $state(0);
	let answers = $state<Record<string, { basic: number; premium: number; deluxe: number }>>({});
	let done = $state(false);

	const question = $derived(quizQuestions[step]);
	const totals = $derived.by(() => {
		const t = { basic: 0, premium: 0, deluxe: 0 };
		for (const a of Object.values(answers)) {
			t.basic += a.basic;
			t.premium += a.premium;
			t.deluxe += a.deluxe;
		}
		return t;
	});
	const winner = $derived.by(() => {
		// Ties break toward Premium — the middle wash suits most Florida drivers.
		const order: ('premium' | 'deluxe' | 'basic')[] = ['premium', 'deluxe', 'basic'];
		let best: 'premium' | 'deluxe' | 'basic' = 'premium';
		for (const k of order) if (totals[k] > totals[best]) best = k;
		return best;
	});
	const recommended = $derived(
		winner === 'basic'
			? packages.find((p) => p.slug === 'basic-wash')!
			: winner === 'premium'
				? packages.find((p) => p.slug === 'premium-wash')!
				: packages.find((p) => p.slug === 'deluxe-detail')!
	);

	function answer(points: { basic: number; premium: number; deluxe: number }) {
		answers = { ...answers, [question.id]: points };
		if (step < quizQuestions.length - 1) step += 1;
		else done = true;
	}
	function restart() {
		step = 0;
		answers = {};
		done = false;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Which Wash Is Right for Me?', item: 'https://florida-shine-car-wash.pages.dev/quiz' }
		]
	};
</script>

<Seo
	title="Which Wash Is Right for Me? — Wash Recommender Quiz — Florida Shine Car Wash"
	description="First time at Florida Shine? Answer 4 quick questions — how often you wash, how dirty the car is, your budget, and whether the inside needs cleaning — and we will recommend the right wash."
	canonical="/quiz"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="WASH RECOMMENDER"
	title="Which Wash Is Right for Me?"
	subtitle="Four quick questions, one honest recommendation. No account, no email — just the wash that fits your car today."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	{#if !done}
		<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<p class="text-xs font-black tracking-widest text-navy-light">QUESTION {step + 1} OF {quizQuestions.length}</p>
			<div class="mt-2 h-2 overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={quizQuestions.length} aria-label="Quiz progress">
				<div class="h-full rounded-full bg-sun transition-all" style="width: {((step + 1) / quizQuestions.length) * 100}%"></div>
			</div>
			<h2 class="mt-5 font-display text-2xl font-black text-navy sm:text-3xl">{question.question}</h2>
			<div class="mt-5 grid gap-3">
				{#each question.options as option}
					<button
						type="button"
						onclick={() => answer(option.points)}
						class="min-h-14 w-full rounded-2xl border-2 border-line px-5 py-3 text-left font-bold text-navy transition-colors hover:border-sun hover:bg-sun/10 focus-visible:outline-3 focus-visible:outline-sun"
					>
						{option.label}
					</button>
				{/each}
			</div>
			{#if step > 0}
				<button type="button" onclick={() => (step -= 1)} class="mt-4 inline-flex min-h-12 items-center rounded-full border-2 border-navy px-6 py-3 text-sm font-black text-navy">← BACK</button>
			{/if}
		</div>
	{:else}
		<div class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8" role="status">
			<p class="flex items-center gap-2 text-xs font-black tracking-widest text-sun"><Sparkles class="h-4 w-4" aria-hidden="true" /> YOUR RECOMMENDATION</p>
			<h2 class="mt-3 font-display text-3xl font-black">{recommended.name} — ${recommended.price}</h2>
			<p class="mt-2 leading-relaxed text-white/85">{recommended.description}</p>
			<ul class="mt-4 space-y-1 text-sm text-white/85">
				{#each recommended.features as feature}
					<li>✓ {feature}</li>
				{/each}
			</ul>
			<p class="mt-3 text-sm text-white/70">Takes {recommended.duration.toLowerCase()}. {winner === 'basic' ? 'The everyday clean — and if you wash weekly, the Unlimited Club pays for itself in 2 washes.' : winner === 'premium' ? 'Our most popular wash: wax protection and an underbody rinse for Florida salt and sun.' : 'The full works, inside and out — book it as an appointment so we can give it the full 45 minutes.'}</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/book?package={recommended.slug}" class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">BOOK {recommended.name.toUpperCase()} <ArrowRight class="h-4 w-4" aria-hidden="true" /></a>
				<button type="button" onclick={restart} class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-black text-white"><RotateCcw class="h-4 w-4" aria-hidden="true" /> RETAKE THE QUIZ</button>
			</div>
			<p class="mt-4 text-xs text-white/60">Your answers stay on this page — nothing is sent or stored. Want to compare all three first? <a href="/packages" class="font-bold text-white underline underline-offset-2">See the full package comparison</a>.</p>
		</div>
	{/if}
	<p class="mt-6 text-center text-sm text-muted">New to Florida Shine? <a href="/first-visit" class="font-bold text-navy underline underline-offset-2">Read the first-visit guide</a> — what happens at the tunnel, step by step.</p>
</section>
