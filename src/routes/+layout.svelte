<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { CalendarCheck, MapPin, Phone } from '@lucide/svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import '#lib/../app.css';
	import '@fontsource/archivo/800.css';
	import '@fontsource/archivo/900.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';

	let { children } = $props();
	// Hide the sticky mobile bar while the on-screen keyboard is open
	// (visualViewport shrinks when the keyboard appears).
	let keyboardOpen = $state(false);
	$effect(() => {
		if (typeof window === 'undefined' || !window.visualViewport) return;
		const vp = window.visualViewport;
		const onResize = () => {
			keyboardOpen = vp.height < window.innerHeight - 120;
		};
		vp.addEventListener('resize', onResize);
		return () => vp.removeEventListener('resize', onResize);
	});
	const onBookPage = $derived(page.url.pathname === '/book');

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

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:font-black focus:text-navy">
	Skip to content
</a>

<Header />
<main id="main">{@render children()}</main>
<div class="pb-20 sm:pb-0"><Footer /></div>

<!-- Sticky mobile Call / Book bar (hidden while the on-screen keyboard is open) -->
{#if !keyboardOpen}
	<div class="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-navy/10 bg-white/95 p-2 backdrop-blur sm:hidden">
		<a href="tel:+13055550198" class="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-navy font-black text-navy">
			<Phone class="h-5 w-5" aria-hidden="true" /> Call
		</a>
		{#if onBookPage}
			<a href="/locations" class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun font-black text-navy">
				<MapPin class="h-5 w-5" aria-hidden="true" /> Find a Location
			</a>
		{:else}
			<a href="/book" class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun font-black text-navy">
				<CalendarCheck class="h-5 w-5" aria-hidden="true" /> Book Now
			</a>
		{/if}
	</div>
{/if}
