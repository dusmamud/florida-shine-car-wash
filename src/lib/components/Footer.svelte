<script lang="ts">
	import { Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';
</script>

<footer class="bg-navy-deep text-white">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
		<div>
			<p class="font-display text-xl font-black leading-tight">FLORIDA <span class="text-sun">SHINE</span><span class="block text-xs font-bold tracking-[0.3em] text-sky">CAR WASH</span></p>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
				Proudly serving Florida with top-quality car wash &amp; detailing services. Clean car. Brighter days.
			</p>
			<div class="mt-5 flex gap-2">
				<a href={site.socials[0].href} aria-label="Florida Shine on Facebook" class="flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 font-black transition-colors hover:bg-sun hover:text-navy">f</a>
				<a href={site.socials[1].href} aria-label="Florida Shine on Instagram" class="flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 font-black transition-colors hover:bg-sun hover:text-navy">ig</a>
				<a href={site.socials[2].href} aria-label="Florida Shine on X" class="flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 font-black transition-colors hover:bg-sun hover:text-navy">X</a>
			</div>
		</div>
		<nav aria-label="Quick links">
			<p class="text-sm font-black tracking-widest text-sun">QUICK LINKS</p>
			<ul class="mt-4 space-y-1 text-sm">
				{#each [['Services', '/services'], ['Packages', '/packages'], ['Memberships', '/memberships'], ['About Us', '/about'], ['Locations', '/locations'], ['Contact', '/contact']] as [label, href]}
					<li><a href={href} class="inline-block min-h-11 py-2 text-white/80 hover:text-sun">{label}</a></li>
				{/each}
			</ul>
		</nav>
		<nav aria-label="Support links">
			<p class="text-sm font-black tracking-widest text-sun">SUPPORT</p>
			<ul class="mt-4 space-y-1 text-sm">
				{#each [['FAQs', '/faq'], ['Gift Cards', '/gift-cards'], ['Careers', '/careers'], ['Reviews', '/reviews'], ['Contact Us', '/contact'], ['Fleet Accounts', '/fleet'], ['Offers', '/offers'], ['First Visit', '/first-visit'], ['Accessibility', '/accessibility'], ['Track Booking', '/track-booking'], ['Membership Terms', '/membership-terms'], ['Sitemap', '/sitemap'], ['Blog', '/blog'], ['Loyalty', '/loyalty'], ['Your Account', '/account']] as [label, href]}
					<li><a href={href} class="inline-block min-h-11 py-2 text-white/80 hover:text-sun">{label}</a></li>
				{/each}
			</ul>
		</nav>
		<div>
			<p class="text-sm font-black tracking-widest text-sun">HOURS</p>
			<ul class="mt-4 space-y-2 text-sm text-white/80">
				<li class="flex gap-2"><Clock class="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" /> Mon – Sat: 7:00 AM – 7:00 PM</li>
				<li class="flex gap-2"><Clock class="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" /> Sunday: 8:00 AM – 6:00 PM</li>
			</ul>
			<p class="mt-6 text-sm font-black tracking-widest text-sun">HAVE QUESTIONS?</p>
			<p class="mt-3 space-y-1 text-sm">
				<a href={site.phoneHref} class="flex min-h-11 items-center gap-2 font-bold text-white hover:text-sun"><Phone class="h-4 w-4" aria-hidden="true" /> {site.phone}</a>
				<a href="mailto:{site.email}" class="flex min-h-11 items-center gap-2 break-all text-white/80 hover:text-sun"><Mail class="h-4 w-4 shrink-0" aria-hidden="true" /> {site.email}</a>
				<span class="flex items-start gap-2 pt-1 text-white/80"><MapPin class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {site.address}</span>
			</p>
		</div>
	</div>
	<div class="border-t border-white/15">
		<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-white/60 sm:flex-row sm:px-6 sm:text-left">
			<p>© 2024 Florida Shine Car Wash. All rights reserved.</p>
			<p><a href="/privacy" class="inline-flex min-h-11 items-center hover:text-sun">Privacy Policy</a> <span aria-hidden="true">|</span> <a href="/terms" class="inline-flex min-h-11 items-center hover:text-sun">Terms of Service</a></p>
		</div>
	</div>
</footer>
