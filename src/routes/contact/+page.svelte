<script lang="ts">
	import { Clock, Mail, MapPin, MessageCircle, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '#lib/data/site.ts';
	let name = $state(''); let email = $state(''); let topic = $state('General question'); let message = $state('');
	let sent = $state(false); let err = $state('');
	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim() || !email.includes('@') || !message.trim()) { err = 'Please fill in your name, a valid email and your message.'; return; }
		err = ''; sent = true;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://florida-shine-car-wash.pages.dev/contact' }
		]
	};
</script>
<Seo
	title="Contact — Florida Shine Car Wash"
	description="Contact Florida Shine Car Wash: call (305) 555-0198, email hello@floridashinecarwash.com, or visit our Miami head office at 1200 Biscayne Blvd. We answer within one business day."
	canonical="/contact"
	ogImage="wash-building"
	jsonLd={jsonLd}
/>
<PageHero eyebrow="TALK TO US" title="Contact Florida Shine" subtitle="Questions, feedback or a lost item at the wash? We answer every message within one business day." />
<section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<div>
		<ul class="space-y-3">
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-line"><Phone class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /><span><strong class="text-navy">Phone</strong><br /><a class="font-bold text-navy-light" href={site.phoneHref}>{site.phone}</a></span></li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-line"><MessageCircle class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /><span><strong class="text-navy">WhatsApp</strong><br /><a class="font-bold text-navy-light" href={site.whatsappHref} target="_blank" rel="noopener">Chat with us on WhatsApp</a><br /><span class="text-sm text-muted">We reply within one business day.</span></span></li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-line"><Mail class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /><span><strong class="text-navy">Email</strong><br /><a class="break-all font-bold text-navy-light" href="mailto:{site.email}">{site.email}</a></span></li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-line"><MapPin class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /><span><strong class="text-navy">Head office</strong><br />{site.address}</span></li>
			<li class="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-line"><Clock class="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" /><span><strong class="text-navy">Hours</strong><br />Mon – Sat: 7:00 AM – 7:00 PM<br />Sunday: 8:00 AM – 6:00 PM</span></li>
		</ul>
		<div class="mt-6 overflow-hidden rounded-3xl ring-1 ring-line">
			<iframe title="Map — Florida Shine Car Wash, Miami" src="https://maps.google.com/maps?q=1200%20Biscayne%20Blvd%2C%20Miami%2C%20FL&output=embed" class="h-72 w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</div>
	<div class="rounded-3xl bg-white p-6 shadow ring-1 ring-line sm:p-8">
		{#if sent}
			<div role="status">
				<h2 class="font-display text-2xl font-black text-navy">Message sent!</h2>
				<p class="mt-2 text-muted">Thanks, {name} — this is a mock form, so nothing was actually sent. For a real reply, call {site.phone} or email {site.email}.</p>
			</div>
		{:else}
			<h2 class="font-display text-2xl font-black text-navy">Send us a message</h2>
			<form class="mt-5 space-y-4" onsubmit={submit} novalidate>
				<div><label for="cname" class="font-bold text-navy">Name *</label><input id="cname" type="text" bind:value={name} autocomplete="name" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
				<div><label for="cemail" class="font-bold text-navy">Email *</label><input id="cemail" type="email" bind:value={email} autocomplete="email" class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line px-3 py-3" /></div>
				<div><label for="ctopic" class="font-bold text-navy">Topic</label>
					<select id="ctopic" bind:value={topic} class="mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-3">
						{#each ['General question', 'Membership', 'A wash issue', 'Gift cards', 'Careers', 'Lost item'] as t}<option>{t}</option>{/each}
					</select></div>
				<div><label for="cmsg" class="font-bold text-navy">Message *</label><textarea id="cmsg" rows="5" bind:value={message} class="mt-1 block w-full rounded-xl border-2 border-line px-3 py-3"></textarea></div>
				{#if err}<p class="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-800" role="alert">{err}</p>{/if}
				<button type="submit" class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sun px-6 py-3 font-black text-navy">SEND MESSAGE</button>
			</form>
		{/if}
	</div>
</section>
