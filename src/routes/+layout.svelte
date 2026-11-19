<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { CalendarCheck, Phone } from '@lucide/svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import '#lib/../app.css';
	import '@fontsource/archivo/800.css';
	import '@fontsource/archivo/900.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta name="description" content="Florida Shine Car Wash — premium car wash & detailing across Florida. Wash packages from $16, Unlimited Wash Club from $19/mo, and appointments at 8 Florida locations." />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Florida Shine Car Wash" />
	<meta property="og:title" content="Florida Shine Car Wash — Clean Car. Brighter Days." />
	<meta property="og:description" content="Premium car wash & detailing services in Florida. Packages from $16, Unlimited Wash Club from $19/mo." />
	<meta name="twitter:card" content="summary_large_image" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "AutoRepair",
			"name": "Florida Shine Car Wash",
			"description": "Premium car wash & detailing services in Florida.",
			"telephone": "+1-305-555-0198",
			"email": "hello@floridashinecarwash.com",
			"priceRange": "$16 - $199",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "1200 Biscayne Blvd",
				"addressLocality": "Miami",
				"addressRegion": "FL",
				"postalCode": "33132",
				"addressCountry": "US"
			},
			"openingHours": ["Mo-Sa 07:00-19:00", "Su 08:00-18:00"]
		}
	</script>
</svelte:head>

<Header />
<main id="main">{@render children()}</main>
<Footer />

<!-- Sticky mobile Book / Call bar -->
<div class="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-navy/10 bg-white/95 p-2 backdrop-blur sm:hidden">
	<a href="tel:+13055550198" class="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-navy font-black text-navy">
		<Phone class="h-5 w-5" aria-hidden="true" /> Call
	</a>
	<a href="/book" class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun font-black text-navy">
		<CalendarCheck class="h-5 w-5" aria-hidden="true" /> Book Now
	</a>
</div>
