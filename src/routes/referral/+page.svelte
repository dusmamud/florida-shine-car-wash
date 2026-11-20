<script lang="ts">
	import { Copy, Gift, Share2, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { referral } from '#lib/data/round3.ts';

	let name = $state('');
	let phone = $state('');
	let code = $state('');
	let copied = $state(false);
	let err = $state('');

	function hashOf(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
		return h;
	}
	function makeCode(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim()) {
			err = 'Enter your name so the code is tied to you.';
			return;
		}
		if (phone.replace(/\D/g, '').length < 10) {
			err = 'Enter the phone number on your Shine Rewards account — at least 10 digits.';
			return;
		}
		err = '';
		copied = false;
		code = `SHINE-${String(hashOf(name.trim().toLowerCase() + phone.replace(/\D/g, ''))).padStart(5, '0')}`;
	}
	const shareLink = $derived(code ? `https://florida-shine-car-wash.pages.dev/r/${code}` : '');
	const shareText = $derived(
		code ? `Get $5 off your first wash at Florida Shine Car Wash with my code ${code}: ${shareLink}` : ''
	);
	async function copyLink() {
		if (!shareLink) return;
		try {
			await navigator.clipboard.writeText(shareLink);
			copied = true;
		} catch {
			copied = false;
			err = 'Copy did not work in this browser — long-press the link to copy it instead.';
		}
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Refer a Friend', item: 'https://florida-shine-car-wash.pages.dev/referral' }
		]
	};
</script>

<Seo
	title="Refer a Friend — Give $5, Get $5 — Florida Shine Car Wash"
	description="Give $5, get $5: share your Florida Shine referral code and your friend gets $5 off their first wash — you get $5 off your next one. No limit on referrals."
	canonical="/referral"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero
	eyebrow="REFER A FRIEND"
	title="Give $5, Get $5"
	subtitle="Your friend gets $5 off their first wash. You get $5 off your next one. There is no limit — refer five friends, earn $25."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 lg:grid-cols-2">
		<article class="rounded-3xl bg-navy p-6 text-white shadow sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black"><Gift class="h-6 w-6 text-sun" aria-hidden="true" /> Get your referral code</h2>
			<p class="mt-2 text-sm leading-relaxed text-white/80">Your code is tied to the phone number on your Shine Rewards account. This is a mock demo — no real account is created and no real credit is issued.</p>
			<form class="mt-5 space-y-3" onsubmit={makeCode} novalidate>
				<div class="min-w-0">
					<label for="ref-name" class="text-sm font-bold">Your name *</label>
					<input id="ref-name" type="text" bind:value={name} placeholder="Alex Rivera" autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
				</div>
				<div class="min-w-0">
					<label for="ref-phone" class="text-sm font-bold">Phone on your Shine Rewards account *</label>
					<input id="ref-phone" type="tel" bind:value={phone} autocomplete="tel" placeholder="(305) 555-0100" class="mt-1 block min-h-12 w-full rounded-xl border border-white/30 bg-white px-3 py-3 text-navy" />
				</div>
				{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
				<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 text-sm font-black text-navy">GET MY REFERRAL CODE</button>
			</form>
			{#if code}
				<div class="mt-5 rounded-2xl bg-white/10 p-5" role="status">
					<p class="text-xs font-black tracking-widest text-sun">YOUR REFERRAL CODE</p>
					<p class="mt-1 font-display text-3xl font-black">{code}</p>
					<p class="mt-2 break-all text-sm text-white/80">{shareLink}</p>
					<div class="mt-4 flex flex-wrap gap-3">
						<button type="button" onclick={copyLink} class="inline-flex min-h-12 items-center gap-2 rounded-full bg-sun px-5 py-3 text-sm font-black text-navy"><Copy class="h-4 w-4" aria-hidden="true" /> {copied ? 'COPIED!' : 'COPY LINK'}</button>
						<a href="sms:?body={encodeURIComponent(shareText)}" class="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white px-5 py-3 text-sm font-black text-white"><Share2 class="h-4 w-4" aria-hidden="true" /> SHARE BY TEXT</a>
					</div>
					{#if copied}<p class="mt-3 text-sm font-bold text-sun" role="status">Link copied — paste it into a text, email or post.</p>{/if}
				</div>
			{/if}
		</article>

		<article class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-black text-navy"><Users class="h-6 w-6 text-navy-light" aria-hidden="true" /> How it works</h2>
			<ol class="mt-4 space-y-3 text-muted">
				{#each referral.howItWorks as step, i}
					<li class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun font-display font-black text-navy">{i + 1}</span><span class="leading-relaxed">{step}</span></li>
				{/each}
			</ol>
			<div class="mt-6 grid grid-cols-2 gap-3 text-center">
				<div class="rounded-2xl bg-sky-light p-4"><p class="font-display text-3xl font-black text-navy">${referral.giveAmount}</p><p class="text-sm text-muted">off for your friend</p></div>
				<div class="rounded-2xl bg-sky-light p-4"><p class="font-display text-3xl font-black text-navy">${referral.getAmount}</p><p class="text-sm text-muted">off for you</p></div>
			</div>
			<h3 class="mt-6 font-black text-navy">Terms</h3>
			<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
				{#each referral.terms as term}
					<li>{term}</li>
				{/each}
			</ul>
			<p class="mt-5 text-sm text-muted">Not a Shine Rewards member yet? <a href="/loyalty" class="font-bold text-navy underline underline-offset-2">See how Shine Rewards works</a> — stamps, birthday wash and referrals, all in one place.</p>
		</article>
	</div>
</section>
