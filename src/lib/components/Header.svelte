<script lang="ts">
	import { CalendarCheck, MapPin, Menu, Phone, X } from '@lucide/svelte';
	import { page } from '$app/state';
	import { site } from '#lib/data/site.ts';

	let open = $state(false);
	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/packages', label: 'Packages' },
		{ href: '/memberships', label: 'Memberships' },
		{ href: '/about', label: 'About' },
		{ href: '/locations', label: 'Locations' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header class="sticky top-0 z-50 bg-navy text-white shadow-lg shadow-navy/20">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
		<a href="/" class="flex min-w-0 items-center gap-2.5" aria-label="Florida Shine Car Wash — home">
			<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun text-navy" aria-hidden="true">
				<!-- palm tree mark -->
				<svg viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 22v-8" />
					<path d="M12 14c-4 0-7-2-8-5 2 1 5 1 8 0-1-3-4-4-6-4 3-2 7-1 8 2 1-3 5-4 8-2-2 0-5 1-6 4 3-1 6-1 8 0-1 3-4 5-8 5" />
					<circle cx="12" cy="11" r="1" fill="currentColor" />
				</svg>
			</span>
			<span class="leading-none">
				<span class="block font-display text-[1.05rem] font-black tracking-wide">FLORIDA</span>
				<span class="block font-display text-[1.05rem] font-black tracking-wide text-sun">SHINE</span>
				<span class="block text-[0.6rem] font-bold tracking-[0.3em] text-sky">CAR WASH</span>
			</span>
		</a>

		<nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
			{#each links as l}
				<a
					href={l.href}
					aria-current={page.url.pathname === l.href || (l.href !== '/' && page.url.pathname.startsWith(l.href)) ? 'page' : undefined}
					class="rounded-md px-3 py-2.5 text-sm font-bold tracking-wide transition-colors hover:bg-white/10 hover:text-sun {page.url.pathname === l.href || (l.href !== '/' && page.url.pathname.startsWith(l.href)) ? 'bg-white/10 text-sun' : 'text-white/90'}">{l.label}</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a href="/account" class="hidden min-h-12 items-center rounded-full px-3 py-2 text-sm font-bold hover:bg-white/10 xl:flex">Manage My Plan</a>
			<a href="tel:+13055550198" class="hidden min-h-12 items-center gap-2 rounded-full px-3 py-2 text-sm font-bold hover:bg-white/10 md:flex" aria-label="Call Florida Shine">
				<Phone class="h-4 w-4" aria-hidden="true" /> (305) 555-0198
			</a>
			<a href="/book" class="hidden min-h-12 items-center gap-1.5 rounded-full border-2 border-sun px-4 py-2.5 text-sm font-black text-sun transition-colors hover:bg-sun hover:text-navy md:flex" aria-label="Book an appointment">
				<CalendarCheck class="h-4 w-4" aria-hidden="true" /> BOOK
			</a>
			<a href="/locations" class="hidden min-h-12 items-center gap-1.5 rounded-full bg-sun px-4 py-2.5 text-sm font-black text-navy shadow transition-transform hover:-translate-y-0.5 sm:flex">
				<MapPin class="h-4 w-4" aria-hidden="true" /> FIND A LOCATION
			</a>
			<button
				type="button"
				class="flex min-h-12 min-w-12 items-center justify-center rounded-lg p-2 hover:bg-white/10 lg:hidden"
				aria-expanded={open}
				aria-controls="mobile-nav"
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				{#if open}<X class="h-6 w-6" aria-hidden="true" />{:else}<Menu class="h-6 w-6" aria-hidden="true" />{/if}
			</button>
		</div>
	</div>

	{#if open}
		<nav id="mobile-nav" class="border-t border-white/15 px-4 pb-4 pt-2 lg:hidden" aria-label="Mobile navigation">
			{#each links as l}
				<a
					href={l.href}
					onclick={() => (open = false)}
					aria-current={page.url.pathname === l.href ? 'page' : undefined}
					class="block min-h-12 rounded-lg px-3 py-3 text-base font-bold text-white hover:bg-white/10">{l.label}</a>
			{/each}
			<a href="/account" onclick={() => (open = false)} class="block min-h-12 rounded-lg px-3 py-3 text-base font-bold text-white hover:bg-white/10">Manage My Plan</a>
			<a href="/locations" onclick={() => (open = false)} class="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun px-4 py-3 text-base font-black text-navy">
				<MapPin class="h-5 w-5" aria-hidden="true" /> FIND A LOCATION
			</a>
			<a href="/book" onclick={() => (open = false)} class="mt-2 flex min-h-12 items-center justify-center rounded-full border-2 border-white px-4 py-3 text-base font-black text-white">BOOK AN APPOINTMENT</a>
		</nav>
	{/if}
</header>
