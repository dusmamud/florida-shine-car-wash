<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { ArrowUp, CalendarCheck, MapPin, MessageCircle, Phone } from '@lucide/svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import { site } from '#lib/data/site.ts';
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
	// Back-to-top button appears after scrolling past 600px.
	let showTop = $state(false);
	$effect(() => {
		if (typeof window === 'undefined' || !window.visualViewport) return;
		const vp = window.visualViewport;
		const onResize = () => {
			keyboardOpen = vp.height < window.innerHeight - 120;
		};
		vp.addEventListener('resize', onResize);
		return () => vp.removeEventListener('resize', onResize);
	});
	const onBookPage = $derived(page.url.pathname === '/book' || page.url.pathname === '/es/book');
	// Spanish pages get Spanish sticky-bar destinations + labels.
	const isEs = $derived(page.url.pathname === '/es' || page.url.pathname.startsWith('/es/'));

	// Motion shell: Lenis smooth scroll + scroll progress bar + header shrink.
	// All gated behind prefers-reduced-motion (live change listener included).
	// Lenis is dynamically imported so no smooth-scroll JS ships at all for
	// reduced-motion users. GSAP is deliberately NOT loaded here — it is only
	// needed for the home hero (see +page.svelte); the progress bar and header
	// shrink run on a plain rAF-throttled scroll listener instead.
	let progressEl: HTMLDivElement | undefined = $state();
	$effect(() => {
		if (typeof window === 'undefined') return;
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		let lenis: { destroy: () => void; raf: (time: number) => void } | undefined;
		let rafId = 0;
		const header = document.querySelector('header');
		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				ticking = false;
				const max = document.documentElement.scrollHeight - window.innerHeight;
				const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
				// transform scaleX only — never width animation.
				if (progressEl) progressEl.style.transform = `scaleX(${p})`;
				header?.classList.toggle('header-compact', window.scrollY > 80);
				showTop = window.scrollY > 600;
			});
		};
		const initLenis = async () => {
			if (mq.matches) return;
			try {
				const { default: Lenis } = await import('lenis');
				const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
				lenis = instance;
				const raf = (time: number) => {
					if (!lenis) return;
					lenis.raf(time);
					rafId = requestAnimationFrame(raf);
				};
				rafId = requestAnimationFrame(raf);
			} catch {
				// Smooth scroll is progressive enhancement; native scroll remains.
			}
		};
		const onMotionChange = () => {
			if (mq.matches) {
				lenis?.destroy();
				lenis = undefined;
				cancelAnimationFrame(rafId);
			} else {
				void initLenis();
			}
		};
		void initLenis();
		mq.addEventListener('change', onMotionChange);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => {
			mq.removeEventListener('change', onMotionChange);
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(rafId);
			lenis?.destroy();
		};
	});

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

<!-- Scroll progress bar (transform scaleX only; hidden under reduced motion) -->
<div bind:this={progressEl} class="scroll-progress" aria-hidden="true"></div>

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
			<a href={isEs ? '/es/locations' : '/locations'} class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun font-black text-navy">
				<MapPin class="h-5 w-5" aria-hidden="true" /> {isEs ? 'Buscar ubicación' : 'Find a Location'}
			</a>
		{:else}
			<a href={isEs ? '/es/book' : '/book'} class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun font-black text-navy">
				<CalendarCheck class="h-5 w-5" aria-hidden="true" /> {isEs ? 'Reservar' : 'Book Now'}
			</a>
		{/if}
	</div>
{/if}

<!-- Floating WhatsApp button (mobile only) + back-to-top (all sizes).
     Stacked bottom-right above the sticky mobile bar; both 48px.
     Back-to-top scrolls instantly under reduced motion. No live-chat widget:
     the WhatsApp link opens a real chat with the business, it never pretends
     a human is online right now. -->
<a
	href={site.whatsappHref}
	target="_blank"
	rel="noopener"
	aria-label="Chat with Florida Shine on WhatsApp"
	class="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg sm:hidden"
>
	<MessageCircle class="h-6 w-6" aria-hidden="true" />
</a>
{#if showTop}
	<button
		type="button"
		onclick={() =>
			window.scrollTo({
				top: 0,
				behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
			})}
		aria-label="Back to top"
		class="fixed bottom-[8.5rem] right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-lg sm:bottom-6 sm:right-6"
	>
		<ArrowUp class="h-6 w-6" aria-hidden="true" />
	</button>
{/if}
