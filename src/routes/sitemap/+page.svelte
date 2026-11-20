<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { blogPosts, locations, packages, services } from '#lib/data/site.ts';
	import { round3BlogPosts } from '#lib/data/round3.ts';

	const groups: { heading: string; links: { label: string; href: string }[] }[] = [
		{ heading: 'Main', links: [
			{ label: 'Home', href: '/' },
			{ label: 'Wash Packages', href: '/packages' },
			{ label: 'Services', href: '/services' },
			{ label: 'Unlimited Wash Club', href: '/memberships' },
			{ label: 'Locations', href: '/locations' },
			{ label: 'About Us', href: '/about' },
			{ label: 'Reviews', href: '/reviews' },
			{ label: 'Gallery', href: '/gallery' }
		] },
		{ heading: 'Packages', links: packages.map((p) => ({ label: p.name, href: `/packages/${p.slug}` })) },
		{ heading: 'Services', links: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })) },
		{ heading: 'Locations', links: locations.map((l) => ({ label: `${l.city} — ${l.name}`, href: `/locations/${l.slug}` })) },
		{ heading: 'Your account & offers', links: [
			{ label: 'Your Account — Manage My Plan', href: '/account' },
			{ label: 'Offers', href: '/offers' },
			{ label: 'Fleet Accounts', href: '/fleet' },
			{ label: 'Shine Rewards Loyalty', href: '/loyalty' },
			{ label: 'Refer a Friend — Give $5, Get $5', href: '/referral' },
			{ label: 'SMS Club', href: '/sms-club' },
			{ label: 'Book an Appointment', href: '/book' },
			{ label: 'Track Booking', href: '/track-booking' },
			{ label: 'Gift Cards', href: '/gift-cards' },
			{ label: 'Blog — Car Care Tips', href: '/blog' },
			...blogPosts.map((b) => ({ label: b.title, href: `/blog/${b.slug}` })),
			...round3BlogPosts.map((b) => ({ label: b.title, href: `/blog/${b.slug}` }))
		] },
		{ heading: 'New in round 3', links: [
			{ label: 'Rain Guarantee — Free Rewash in 48 Hours', href: '/rain-guarantee' },
			{ label: 'EV & Oversized Vehicles — Will It Fit?', href: '/ev-and-oversized' },
			{ label: 'Which Wash Is Right for Me? — Quiz', href: '/quiz' },
			{ label: 'Service Area', href: '/service-area' },
			{ label: 'Lost and Found', href: '/lost-and-found' },
			{ label: 'En español — Inicio', href: '/es' },
			{ label: 'En español — Paquetes', href: '/es/packages' },
			{ label: 'En español — Membresías', href: '/es/memberships' },
			{ label: 'En español — Reservar', href: '/es/book' },
			{ label: 'En español — Ubicaciones', href: '/es/locations' }
		] },
		{ heading: 'Support', links: [
			{ label: 'First Visit', href: '/first-visit' },
			{ label: 'Accessibility', href: '/accessibility' },
			{ label: 'FAQs', href: '/faq' },
			{ label: 'Contact Us', href: '/contact' },
			{ label: 'Careers', href: '/careers' }
		] },
		{ heading: 'Legal', links: [
			{ label: 'Membership Terms', href: '/membership-terms' },
			{ label: 'Terms of Service', href: '/terms' },
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'Sitemap (this page)', href: '/sitemap' }
		] }
	];
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://florida-shine-car-wash.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Sitemap', item: 'https://florida-shine-car-wash.pages.dev/sitemap' }
		]
	};
</script>

<Seo
	title="Sitemap — Florida Shine Car Wash"
	description="Every page on Florida Shine Car Wash: packages, services, memberships, all 8 Florida locations, account, offers, fleet, blog, loyalty, support and legal pages."
	canonical="/sitemap"
	ogImage="hero-soapy-car"
	jsonLd={jsonLd}
/>
<PageHero eyebrow="SITEMAP" title="Every Page on This Site" subtitle="All of our pages in one place — packages, services, locations, your account, offers and more." />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each groups as g}
			<nav class="rounded-3xl bg-white p-6 shadow ring-1 ring-line" aria-label={g.heading}>
				<h2 class="font-display text-xl font-black text-navy">{g.heading}</h2>
				<ul class="mt-3 space-y-1">
					{#each g.links as l}
						<li><a href={l.href} class="inline-block min-h-11 py-2 text-sm font-semibold text-navy-light hover:text-navy hover:underline hover:underline-offset-2">{l.label}</a></li>
					{/each}
				</ul>
			</nav>
		{/each}
	</div>
</section>
